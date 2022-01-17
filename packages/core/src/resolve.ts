import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';
import {bundleRequire} from 'bundle-require';
import resolveCore from 'resolve';
// @ts-expect-error
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

export const resolveSync = (id: string) => {
    const callerUrl = caller();
    const callerPath = callerUrl.startsWith('file://') ? fileURLToPath(callerUrl) : callerUrl;
    return resolveCore.sync(id, {basedir: callerPath});
};

const USER_MODULES_EXTENSIONS = ['.ts', '.mjs'];

export const importUserModule = async <T>(moduleName: string, defaultValue?: T): Promise<T> => {
    const target = USER_MODULES_EXTENSIONS.map(v => moduleName + v).find(fs.existsSync);

    if (target) {
        const {mod} = await bundleRequire({filepath: target});
        return mod;
    }

    if (defaultValue) {
        return defaultValue;
    }

    throw new Error(`Unable to find module ${moduleName}`);
};

export const dirFromImportMeta = (importMetaUrl: string) => path.dirname(fileURLToPath(importMetaUrl));
