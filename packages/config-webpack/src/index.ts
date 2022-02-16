import path from 'node:path';
import {pMap, logger, dirFromImportMeta} from '@reskript/core';
import {Configuration} from 'webpack';
import {warnAndExitOnInvalidFinalizeReturn, BuildInternals, FinalizableWebpackConfiguration} from '@reskript/settings';
import {
    EntryOptions,
    AppEntry,
    EntryLocation,
    collectAppEntries,
    hasServiceWorker,
} from '@reskript/build-utils';
import * as rules from './rules/index.js';
import {mergeBuiltin} from './utils/merge.js';
import {createHTMLPluginInstances} from './utils/html.js';
import {introduceLoader, introduceLoaders} from './utils/loader.js';
import {BuildContext, EntryConfig, StrictOptions} from './interface.js';
import {partials, strict as strictPartial} from './partials/index.js';

export {createHTMLPluginInstances};
export * from './interface.js';

const ALLOWED_ENTRY_KEYS = new Set(['entry', 'html']);

const DEFAULT_HTML_TEMPLATE = path.resolve(dirFromImportMeta(import.meta.url), 'assets', 'default-html.ejs');

const validateEntryConfig = (config: EntryConfig, file: string) => {
    const keys = Object.keys(config);

    if (keys.some(v => !ALLOWED_ENTRY_KEYS.has(v))) {
        logger.error(`Entry configuration ${file} has invalid keys, only "entry" and "html" are allowed.`);
        process.exit(21);
    }
};

export const collectEntries = async (location: EntryLocation): Promise<Array<AppEntry<EntryConfig>>> => {
    const options: EntryOptions<EntryConfig> = {
        ...location,
        templateExtension: '.ejs',
        defaultTemplate: DEFAULT_HTML_TEMPLATE,
        transformConfig: (imported, resolved) => {
            const value = imported ?? {};
            validateEntryConfig(value, resolved ?? '[unknown-file]');
            return value;
        },
    };

    return collectAppEntries(options);
};

const createPartialWith = (context: BuildContext) => async (name: keyof typeof partials) => {
    try {
        const factory = partials[name];
        const partial = await factory(context);
        return partial;
    }
    catch (ex) {
        logger.error(`Unable to load configuration partial ${name}`);
        throw ex;
    }
};

const excludeFalse = <T>(value: T): value is Exclude<T, false> => !!value;

interface Options {
    strict?: StrictOptions;
    extras?: Configuration[];
}

export const createWebpackConfig = async (context: BuildContext, options: Options = {}) => {
    const {strict, extras = []} = options;
    const partialNames: Array<keyof typeof partials | false> = [
        'base',
        context.mode,
        context.usage === 'build' && hasServiceWorker(context) && 'serviceWorker',
        context.projectSettings.build.thirdParty && 'external',
    ];
    const configurations = await pMap(partialNames.filter(excludeFalse), createPartialWith(context));
    const internalPartials: Configuration[] = [
        ...configurations,
        strictPartial(strict, context.cwd),
        ...extras,
    ];
    const internalCreated = mergeBuiltin(internalPartials) as FinalizableWebpackConfiguration;
    const internals: BuildInternals = {
        rules,
        loader: introduceLoader,
        loaders: introduceLoaders,
    };
    const finalized = await context.projectSettings.build.finalize(internalCreated, context, internals);
    warnAndExitOnInvalidFinalizeReturn(finalized, 'build');
    return finalized;
};
