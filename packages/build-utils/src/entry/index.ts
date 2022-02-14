import path from 'node:path';
import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {logger, pMap, compact} from '@reskript/core';
import {resolveEntry} from './resolve.js';
import {AppEntry, EntryLocation, EntryOptions} from './interface.js';

export {AppEntry, EntryLocation, EntryOptions};

export const collectAppEntries = async <C>(options: EntryOptions<C>): Promise<Array<AppEntry<C>>> => {
    const {cwd, srcDirectory, entryDirectory, only, templateExtension, defaultTemplate, transformConfig} = options;
    const directory = path.join(cwd, srcDirectory, entryDirectory);

    if (!existsSync(directory)) {
        logger.error(`No ${srcDirectory}/${entryDirectory} directory found`);
        process.exit(24);
    }

    const files = await fs.readdir(directory);
    const resolveOptions = {
        templateExtension,
        defaultTemplate,
        transformConfig,
        shouldInclude: (name: string) => (only ? only.includes(name) : true),
    };
    const mayBeEntries = await pMap(files, f => resolveEntry<C>(path.resolve(directory, f), resolveOptions));
    return compact(mayBeEntries);
};
