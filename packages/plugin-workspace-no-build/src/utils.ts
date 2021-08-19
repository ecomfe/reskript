import path from 'path';
import fs from 'fs';
import {findMonorepoRoot, resolveMonorepoPackageDirectories, logger} from '@reskript/core';
import {minVersion, satisfies} from 'semver';
import {Options} from './interface';

export const resolveParticipant = (defaults: string[], {includes, excludes}: Options) => {
    // 如果2个都没有，就用默认的
    if (!includes && !excludes) {
        return defaults;
    }

    const excludeSet = new Set(excludes ?? []);
    // 如果有`includes`，那么就直接以此为准，`defaults`这个没用了
    const base = includes ?? defaults;

    return base.filter(v => !excludeSet.has(v));
};

interface PackageInfo {
    name: string;
    directory: string;
    dependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
    devDependencies: Record<string, string>;
}

export const buildPackageInfo = (directory: string): PackageInfo => {
    const packageInfo = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf-8'));
    return {
        directory,
        name: packageInfo.name,
        dependencies: packageInfo.dependencies ?? {},
        peerDependencies: packageInfo.peerDependencies ?? {},
        devDependencies: packageInfo.devDependencies ?? {},
    };
};

export const findSiblingPackages = (cwd: string, self: PackageInfo) => {
    const root = findMonorepoRoot(cwd);
    const packageDirectories = resolveMonorepoPackageDirectories(root);
    const packages = packageDirectories.map(buildPackageInfo);
    const siblings = packages.filter(v => v.name !== self.name);
    return siblings;
};

export const buildPeerAlias = (cwd: string, siblings: PackageInfo[]): Record<string, string> => {
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

export const isVersionCompatible = (current: string, required: string) => {
    const minInstalledVersion = minVersion(current);
    return minInstalledVersion && satisfies(minInstalledVersion, required);
};

export const checkDependencyGraph = (siblings: PackageInfo[], self: PackageInfo): boolean => {
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
