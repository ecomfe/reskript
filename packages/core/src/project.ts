import path from 'path';
import {existsSync} from 'fs';
import fs from 'fs/promises';
import {packageDirectory} from 'pkg-dir';
import {findUp} from 'find-up';
import {globby} from 'globby';
import {PackageInfo} from './interface.js';

export const resolveCacheLocation = async (name: string): Promise<string> => {
    const root = await packageDirectory();

    if (!root) {
        throw new Error('Not a package, need package.json in current or ancestor directory to locate your project');
    }

    return path.join(root, 'node_modules', '.cache', name);
};

export const readPackageConfig = async (cwd: string): Promise<PackageInfo> => {
    const content = await fs.readFile(path.join(cwd, 'package.json'), 'utf-8');
    const packageConfig = JSON.parse(content);
    return packageConfig;
};

export const findGitRoot = async (cwd?: string): Promise<string | undefined> => {
    const gitDirectory = await findUp('.git', {cwd, type: 'directory'});
    return gitDirectory && path.dirname(gitDirectory);
};

export const isMonorepoRoot = (cwd: string): boolean => {
    return existsSync(path.join(cwd, 'packages')) && existsSync(path.join(cwd, 'package.json'));
};

export const isMonorepo = async (cwd: string): Promise<boolean> => {
    const root = await findGitRoot() || cwd;
    return isMonorepoRoot(root);
};

export const resolveMonorepoPackageDirectories = async (cwd: string): Promise<string[]> => {
    const packageInfo = await readPackageConfig(cwd);
    const packages = packageInfo.workspaces
        ? (Array.isArray(packageInfo.workspaces) ? packageInfo.workspaces : packageInfo.workspaces.packages)
        : ['packages/*'];
    const directories = await globby(packages.map(v => `${v}/package.json`), {cwd, absolute: true});
    return directories.map(path.dirname);
};

export const findMonorepoRoot = async (cwd: string): Promise<string> => {
    const dir = await findUp('packages', {cwd, type: 'directory'});

    if (!dir) {
        throw new Error('Not in a monorepo project');
    }

    return path.dirname(dir);
};

export const isProjectSourceIn = (cwd: string) => {
    const projectDirectory = cwd.endsWith(path.sep) ? cwd : cwd + path.sep;

    return (resource: string) => (
        resource.includes(projectDirectory)
            && !resource.includes(projectDirectory + 'externals')
            && !resource.includes(`${path.sep}node_modules${path.sep}`)
    );
};

export const normalizeRuleMatch = (cwd: string, configured: boolean | ((resource: string) => boolean)) => {
    switch (configured) {
        case true:
            return isProjectSourceIn(cwd);
        case false:
            return () => false;
        default:
            return configured;
    }
};
