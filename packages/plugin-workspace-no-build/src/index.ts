import path from 'node:path';
import {logger, isMonorepo, normalizeRuleMatch} from '@reskript/core';
import {SettingsPlugin} from '@reskript/settings';
import {Options, LocalPackageInfo} from './interface.js';
import {
    resolveParticipant,
    findSiblingPackages,
    buildPackageInfo,
    buildPeerAlias,
    checkDependencyGraph,
} from './utils.js';

export default (options: Options = {}): SettingsPlugin => async (settings, {cwd}) => {
    if (settings.driver === 'vite') {
        throw new Error('Vite driver not supported by plugin-workspace-no-build');
    }

    const isWorkspace = await isMonorepo(cwd);

    if (!isWorkspace) {
        logger.error('Current project is not a monorepo workspace');
        process.exit(24);
    }

    const self = await buildPackageInfo(cwd);
    const siblings = await findSiblingPackages(cwd, self);
    const isDependencyOfSelf = ({name}: LocalPackageInfo) => !!(self.dependencies[name] ?? self.devDependencies[name]);
    const includedSiblings = resolveParticipant(siblings.filter(isDependencyOfSelf), options);

    const dependencyGraphChecked = checkDependencyGraph(includedSiblings, self);

    if (!dependencyGraphChecked) {
        process.exit(24);
    }

    const incomingBabelFilter = normalizeRuleMatch(cwd, settings.build.script.babel);
    const incomingModulesFilter = normalizeRuleMatch(cwd, settings.build.style.modules);
    const isSiblingSource = (resource: string) => {
        if (resource.includes('node_modules')) {
            return false;
        }

        return includedSiblings.some(v => !path.relative(v.directory, resource).startsWith('..'));
    };
    return {
        ...settings,
        build: {
            ...settings.build,
            style: options.styles
                ? {
                    ...settings.build.style,
                    modules: (resource: string) => incomingModulesFilter(resource) || isSiblingSource(resource),
                }
                : settings.build.style,
            script: {
                ...settings.build.script,
                babel: (resource: string) => incomingBabelFilter(resource) || isSiblingSource(resource),
            },
            finalize: async (config, env, internals) => {
                const previous = await settings.build.finalize(config, env, internals);
                // 因为`peerDependencies`里也会包含本地的包，所以要先处理这些东西，再用下面的`for`循环把本地包的规则覆盖上去就对了
                Object.assign(
                    previous.resolve?.alias ?? {},
                    buildPeerAlias(cwd, includedSiblings)
                );
                for (const {name, directory} of includedSiblings) {
                    Object.assign(
                        previous.resolve?.alias ?? {},
                        {[`${name}`]: path.join(directory, 'src')}
                    );
                }
                return previous;
            },
        },
    };
};
