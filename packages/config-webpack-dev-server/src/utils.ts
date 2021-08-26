import {EntryObject} from 'webpack';
import {resolveFrom} from '@reskript/core';

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
