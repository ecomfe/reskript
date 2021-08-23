import {EntryObject} from 'webpack';
import resolveCore from 'resolve';

const resolveFrom = (base: string) => (id: string) => {
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

type EntryType = EntryObject[string];

const HOT_MODULES = [
    'webpack/hot/dev-server.js',
    'webpack-dev-server/client/index.js',
] as const;

export const addHotModuleToEntry = async (entry: string | EntryType, resolveBase: string): Promise<EntryType> => {
    const [serverHotEntry, clientHotEntry] = await Promise.all(HOT_MODULES.map(resolveFrom(resolveBase)));
    const hotImports = [
        serverHotEntry,
        `${clientHotEntry}?hot=true&live-reload=true`,
    ];

    if (typeof entry === 'string' || Array.isArray(entry)) {
        return hotImports.concat(entry);
    }

    return {
        ...entry,
        import: entry.import ? hotImports.concat(entry.import) : hotImports,
    };
};
