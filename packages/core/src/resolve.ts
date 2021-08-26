
import resolveCore from 'resolve';

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
