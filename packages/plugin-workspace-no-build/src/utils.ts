import path from 'path';
import fs from 'fs';
import {findMonorepoRoot, resolveMonorepoPackageDirectories} from '@reskript/core';
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
}

const buildPackageInfo = (directory: string): PackageInfo => {
    const packageInfo = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf-8'));
    return {
        directory,
        name: packageInfo.name,
    };
};

export const findSiblingPackages = (cwd: string) => {
    const root = findMonorepoRoot(cwd);
    const self = buildPackageInfo(cwd);
    const packageDirectories = resolveMonorepoPackageDirectories(root);
    const packages = packageDirectories.map(buildPackageInfo);
    const siblings = packages.filter(v => v.name !== self.name);
    return siblings;
};
