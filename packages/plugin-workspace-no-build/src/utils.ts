import path from 'path';
import {findMonorepoRoot, resolveMonorepoPackageDirectories, logger, readPackageConfig, pMap} from '@reskript/core';
import {minVersion, satisfies} from 'semver';
import {Options, LocalPackageInfo} from './interface.js';

export const resolveParticipant = (defaults: LocalPackageInfo[], {includes, excludes}: Options) => {
    // 如果2个都没有，就用默认的
    if (!includes && !excludes) {
        return defaults;
    }

    const excludeSet = new Set(excludes ?? []);
    // 如果有`includes`，那么就直接以此为准，`defaults`这个没用了
    const base = includes ? defaults.filter(v => includes.includes(v.name)) : defaults;

    return base.filter(v => !excludeSet.has(v.name));
};

export const buildPackageInfo = async (directory: string): Promise<LocalPackageInfo> => {
    const packageInfo = await readPackageConfig(directory);
    return {
        directory,
        name: packageInfo.name,
        version: packageInfo.version,
        dependencies: packageInfo.dependencies ?? {},
        peerDependencies: packageInfo.peerDependencies ?? {},
        devDependencies: packageInfo.devDependencies ?? {},
    };
};

export const findSiblingPackages = async (cwd: string, self: LocalPackageInfo) => {
    const root = await findMonorepoRoot(cwd);
    const packageDirectories = await resolveMonorepoPackageDirectories(root);
    const packages = await pMap(packageDirectories, buildPackageInfo);
    const siblings = packages.filter(v => v.name !== self.name);
    return siblings;
};

export const buildPeerAlias = (cwd: string, siblings: LocalPackageInfo[]): Record<string, string> => {
    const alias = siblings.reduce(
        (alias, {peerDependencies}) => {
            for (const dependency of Object.keys(peerDependencies)) {
                alias[dependency] = path.join(cwd, 'node_modules', dependency);
            }
            return alias;
        },
        {} as Record<string, string>
    );
    return alias;
};

export const isVersionCompatible = (current: string, required: string): boolean => {
    const minInstalledVersion = minVersion(current);
    return !!minInstalledVersion && satisfies(minInstalledVersion, required, {includePrerelease: true});
};

export const checkDependencyGraph = (siblings: LocalPackageInfo[], self: LocalPackageInfo): boolean => {
    const selfDependencies = {...self.devDependencies, ...self.dependencies};
    const errors: string[] = [];
    for (const {name, peerDependencies} of siblings) {
        for (const [dependency, versionRange] of Object.entries(peerDependencies)) {
            if (!selfDependencies[dependency]) {
                errors.push(`Dependency ${dependency} is required in ${name} but not installed.`);
            }
            else if (!isVersionCompatible(selfDependencies[dependency], versionRange)) {
                const message = [
                    `${name} requires version ${versionRange} of ${dependency}`,
                    `but ${selfDependencies[dependency]} is installed.`,
                ];
                errors.push(message.join(' '));
            }
        }
    }
    if (errors.length) {
        logger.error('We have detected several errors in your workspace dependency graph:');
        logger.error(errors.map(v => '    - ' + v).join('\n'), {dedent: false});
    }

    return !errors.length;
};
