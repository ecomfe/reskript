import {existsSync} from 'node:fs';
import path from 'node:path';
import {readPackageConfig} from '@reskript/core';
import semver from 'semver';
import {warn} from './logger.js';

export const readAllDependencies = async (cwd: string) => {
    const {dependencies, devDependencies} = await readPackageConfig(cwd);
    return {...dependencies, ...devDependencies};
};

export const nodeVersionSatisfies = (versionRange: string) => semver.satisfies(process.versions.node, versionRange);

export const isInstalledVersionSatisfies = (dependencies: Record<string, string>, target: string, range: string) => {
    const installedVersionRange = dependencies[target];
    const minInstalledVersion = semver.minVersion(installedVersionRange);
    return minInstalledVersion && semver.satisfies(minInstalledVersion, range, {includePrerelease: true});
};

export const checkInstalledReskriptVersion = (dependencies: Record<string, string>, requiredMajor: number) => {
    const target = `${requiredMajor}.x`;
    const names = Object.keys(dependencies).filter(name => name.startsWith('@reskript/'));
    const requireUpgrade = names.filter(v => !isInstalledVersionSatisfies(dependencies, v, target));
    for (const name of requireUpgrade) {
        const current = dependencies[name];
        warn(`${name}@${current} still installed, upgrade it to a fixed version of latest ${target} release`);
    }
};

// 只在V3及以前版本是有用的
export const importClientSettings = async (cwd: string) => {
    const settingsLocation = path.join(cwd, 'reskript.config.js');

    if (!existsSync(settingsLocation)) {
        return;
    }

    const {default: settings} = await import(settingsLocation);
    return settings;
};
