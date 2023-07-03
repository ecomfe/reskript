import path from 'node:path';
import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {bundleRequire} from 'bundle-require';
import resolveCore from 'resolve';
import caller from 'caller';

export function resolveFrom(base: string) {
    return (id: string) => {
        const execute = (resolve: (resolved: string) => void, reject: (error: Error) => void) => resolveCore(
            id,
            {basedir: base},
            (err, resolved) => {
                if (err) {
                    return reject(err);
                }
                if (!resolved) {
                    return reject(new Error(`ENOENT, unable to resolve ${id}`));
                }

                resolve(resolved);
            }
        );
        return new Promise(execute);
    };
}

export function resolve(id: string) {
    const callerUrl = caller();
    const callerPath = callerUrl.startsWith('file://') ? fileURLToPath(callerUrl) : callerUrl;
    const execute = (resolve: (resolved: string) => void, reject: (error: Error) => void) => resolveCore(
        id,
        {basedir: callerPath},
        (err, resolved) => {
            if (err) {
                return reject(err);
            }
            if (!resolved) {
                return reject(new Error(`ENOENT, unable to resolve ${id}`));
            }

            resolve(resolved);
        }
    );
    return new Promise(execute);
}

export interface UserModuleResult<T> {
    resolved?: string;
    value: T;
}

export async function importUserModule<T>(tries: string[], defaultValue?: T): Promise<UserModuleResult<T>> {
    const target = tries.find(existsSync);

    if (target) {
        // TODO: https://github.com/egoist/bundle-require/issues/35
        const {mod} = await bundleRequire({filepath: target});
        return {resolved: target, value: mod};
    }

    if (defaultValue) {
        return {value: defaultValue};
    }

    throw new Error(`Unable to find module ${tries.join(', ')}`);
}

export const dirFromImportMeta = (importMetaUrl: string) => path.dirname(fileURLToPath(importMetaUrl));

export async function resolveDependencyVersion(name: string, cwd: string): Promise<string> {
    const resolve = resolveFrom(cwd);
    const location = await resolve(`${name}/package.json`);
    const content = await fs.readFile(location, 'utf-8');
    const {version} = JSON.parse(content);
    return version;
}

export async function resolveCoreJsVersion(cwd: string) {
    try {
        const version = await resolveDependencyVersion('core-js', cwd);
        return version;
    }
    catch {
        return 3;
    }
}
