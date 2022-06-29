import path from 'node:path';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {bundleRequire} from 'bundle-require';
import resolveCore from 'resolve';
import caller from 'caller';

export const resolveFrom = (base: string) => (id: string) => {
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

export const resolve = (id: string) => {
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
};

export interface UserModuleResult<T> {
    resolved?: string;
    value: T;
}

export const importUserModule = async <T>(tries: string[], defaultValue?: T): Promise<UserModuleResult<T>> => {
    const target = tries.find(fs.existsSync);

    if (target) {
        const {mod} = await bundleRequire({filepath: target});
        return {resolved: target, value: mod};
    }

    if (defaultValue) {
        return {value: defaultValue};
    }

    throw new Error(`Unable to find module ${tries.join(', ')}`);
};

export const dirFromImportMeta = (importMetaUrl: string) => path.dirname(fileURLToPath(importMetaUrl));
