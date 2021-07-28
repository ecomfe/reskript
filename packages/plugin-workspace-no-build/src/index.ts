import path from 'path';
import {logger, isMonorepo, normalizeRuleMatch} from '@reskript/core';
import {SettingsPlugin} from '@reskript/settings';
import {Options} from './interface';
import {resolveParticipant, findSiblingPackages} from './utils';

const hasValue = <T>(value: T | undefined): value is T => !!value;

export default (options: Options = {}): SettingsPlugin => (settings, {cwd}) => {
    if (!isMonorepo(cwd)) {
        logger.error('Current project is not a monorepo workspace');
        process.exit(24);
    }

    const incomingBabelFilter = normalizeRuleMatch(cwd, settings.build.script.babel);
    const incomingModulesFilter = normalizeRuleMatch(cwd, settings.build.style.modules);
    const siblings = findSiblingPackages(cwd);
    const includedNames = resolveParticipant(siblings.map(v => v.name), options);
    const includedSiblings = includedNames.map(v => siblings.find(s => s.name === v)).filter(hasValue);
    const includedSiblingDirectories = includedSiblings.map(v => v.directory);

    return {
        ...settings,
        build: {
            ...settings.build,
            style: options.styles
                ? {
                    ...settings.build.style,
                    modules: (resource: string) => {
                        const shouldProcess = incomingModulesFilter(resource);
                        return shouldProcess || includedSiblingDirectories.some(v => resource.startsWith(v));
                    },
                }
                : settings.build.style,
            script: {
                ...settings.build.script,
                babel: (resource: string) => {
                    const shouldProcess = incomingBabelFilter(resource);
                    return shouldProcess || includedSiblingDirectories.some(v => resource.startsWith(v));
                },
            },
            finalize: (config, env, internals) => {
                const before = settings.build.finalize(config, env, internals);
                for (const {name, directory} of includedSiblings) {
                    Object.assign(
                        before.resolve?.alias,
                        {[`${name}`]: path.join(directory, 'src')}
                    );
                }
                return before;
            },
        },
    };
};
