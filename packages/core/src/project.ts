import * as fs from 'fs';
import * as path from 'path';
import pkgDir from 'pkg-dir';
import {sync as findUp} from 'find-up';
import {PackageJSON} from './interface';

export const resolveCacheLocation = (name: string): string => {
    const root = pkgDir.sync();

    if (!root) {
        throw new Error('Not a package, need package.json in current or ancestor directory to locate your project');
    }

    return path.join(root, 'node_modules', '.cache', name);
};

export const readHostPackageConfig = (cwd: string): PackageJSON => {
    const packageConfig = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));
    return packageConfig;
};

export const findGitRoot = (cwd?: string): string | undefined => {
    const gitDirectory = findUp('.git', {cwd, type: 'directory'});
    return gitDirectory && path.dirname(gitDirectory);
};

export const isMonorepo = (cwd: string): boolean => {
    const root = findGitRoot() || cwd;
    return fs.existsSync(path.join(root, 'packages')) && fs.existsSync(path.join(root, 'package.json'));
};

export const findMonorepoRoot = (cwd: string): string => {
    const dir = findUp('packages', {cwd, type: 'directory'});

    if (!dir) {
        throw new Error('Not in a monorepo project');
    }

    return path.dirname(dir);
};
