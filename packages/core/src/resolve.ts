import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';
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

export const resolveSync = (id: string) => {
    const callerUrl = caller();
    const callerPath = callerUrl.startsWith('file://') ? fileURLToPath(callerUrl) : callerUrl;
    return resolveCore.sync(id, {basedir: callerPath});
};

const USER_MODULES_EXTENSIONS = ['.js', '.cjs'];

export const importUserModule = async <T>(moduleName: string, defaultValue?: T): Promise<T> => {
    const target = USER_MODULES_EXTENSIONS.map(v => moduleName + v).find(fs.existsSync);

    if (target) {
        // NOTE: 如果要改成原生ESM的话，这里得想个别的办法
        delete require.cache[target];
        const value = await import(target);
        return value;
    }

    if (defaultValue) {
        return defaultValue;
    }

    throw new Error(`Unable to find module ${moduleName}`);
};

export const dirFromImportMeta = (importMetaUrl: string) => path.dirname(fileURLToPath(importMetaUrl));
