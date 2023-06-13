import path from 'node:path';
import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {readPackageConfig} from '@reskript/core';
import semver from 'semver';
import {warn} from './logger.js';

export async function readAllDependencies(cwd: string) {
    const {dependencies, devDependencies} = await readPackageConfig(cwd);
    return {...dependencies, ...devDependencies};
}

export function nodeVersionSatisfies(versionRange: string) {
    return semver.satisfies(process.versions.node, versionRange);
}

export function isInstalledVersionSatisfies(dependencies: Record<string, string>, target: string, range: string) {
    const installedVersionRange = dependencies[target];
    const minInstalledVersion = semver.minVersion(installedVersionRange);
    return minInstalledVersion && semver.satisfies(minInstalledVersion, range, {includePrerelease: true});
}

export function checkInstalledReskriptVersion(dependencies: Record<string, string>, requiredMajor: number) {
    const target = `${requiredMajor}.x`;
    const names = Object.keys(dependencies).filter(name => name.startsWith('@reskript/'));
    const requireUpgrade = names.filter(v => !isInstalledVersionSatisfies(dependencies, v, target));
    for (const name of requireUpgrade) {
        const current = dependencies[name];
        warn(`${name}@${current} still installed, upgrade it to a fixed version of latest ${target} release`);
    }
}

// 只在V3及以前版本是有用的
export async function importClientSettings(cwd: string) {
    const settingsLocation = path.join(cwd, 'reskript.config.js');

    if (!existsSync(settingsLocation)) {
        return;
    }

    const {default: settings} = await import(pathToFileURL(settingsLocation).toString());
    return settings;
}

export async function requireClientConfigIfExists(cwd: string, name: string): Promise<[string | null, any]> {
    const extensions = ['.cjs', '.js', '.json'];
    const exists = extensions.map(v => path.join(cwd, name + v)).find(existsSync);

    if (!exists) {
        return [null, null];
    }

    const relativeName = path.relative(cwd, exists);
    try {
        if (path.extname(exists) === '.json') {
            const content = await fs.readFile(exists, 'utf-8');
            return [relativeName, JSON.parse(content)];
        }

        const config = await import(exists);
        return [relativeName, config];
    }
    catch {
        return [relativeName, null];
    }
}
