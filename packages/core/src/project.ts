import fs from 'fs';
import path from 'path';
import globby from 'globby';
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

export const isMonorepoRoot = (cwd: string): boolean => {
    return fs.existsSync(path.join(cwd, 'packages')) && fs.existsSync(path.join(cwd, 'package.json'));
};

export const isMonorepo = (cwd: string): boolean => {
    const root = findGitRoot() || cwd;
    return isMonorepoRoot(root);
};

export const resolveMonorepoPackageDirectories = async (cwd: string): Promise<string[]> => {
    const packageInfo = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8')) as PackageJSON;
    const packages = packageInfo.workspaces
        ? (Array.isArray(packageInfo.workspaces) ? packageInfo.workspaces : packageInfo.workspaces.packages)
        : ['packages/*'];
    const directories = await globby(packages.map(v => `${v}/package.json`));
    return directories.map(path.dirname);
};

export const findMonorepoRoot = (cwd: string): string => {
    const dir = findUp('packages', {cwd, type: 'directory'});

    if (!dir) {
        throw new Error('Not in a monorepo project');
    }

    return path.dirname(dir);
};
