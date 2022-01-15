import path from 'path';
import {existsSync} from 'fs';
import fs from 'fs/promises';
import {pMap, logger, compact} from '@reskript/core';
import {Configuration} from 'webpack';
import {
    BuildEnv,
    RuntimeBuildEnv,
    ProjectSettings,
    warnAndExitOnInvalidFinalizeReturn,
    BuildInternals,
} from '@reskript/settings';
import * as rules from './rules/index.js';
import {revision, hasServiceWorker} from './utils/info.js';
import {mergeBuiltin} from './utils/merge.js';
import {checkFeatureMatrixSchema, checkPreCommitHookWhenLintDisabled} from './utils/validate.js';
import {createHTMLPluginInstances} from './utils/html.js';
import {resolveEntry} from './utils/entry.js';
import {introduceLoader, introduceLoaders} from './utils/loader.js';
import {AppEntry, BuildContext, EntryLocation, StrictOptions} from './interface.js';
import {partials, strict as strictPartial} from './partials/index.js';

export {createHTMLPluginInstances};
export * from './interface.js';

export const collectEntries = async (location: EntryLocation): Promise<AppEntry[]> => {
    const {cwd, srcDirectory, entryDirectory, only} = location;
    const directory = path.join(cwd, srcDirectory, entryDirectory);

    if (!existsSync(directory)) {
        logger.error(`No ${srcDirectory}/${entryDirectory} directory found`);
        process.exit(24);
    }

    const files = await fs.readdir(directory);
    const shouldInclude = (name: string) => (only ? only.includes(name) : true);
    const mayBeEntries = await pMap(files, f => resolveEntry(path.resolve(directory, f), shouldInclude));
    return compact(mayBeEntries);
};

export const createRuntimeBuildEnv = async (env: BuildEnv): Promise<RuntimeBuildEnv> => {
    const now = new Date();
    const buildVersion = await revision();

    return {
        ...env,
        buildVersion,
        buildTime: now.toISOString(),
    };
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
    const internalCreated = mergeBuiltin([...configurations, strictPartial(strict, context.cwd), ...extras]);
    const internals: BuildInternals = {
        rules,
        loader: introduceLoader,
        loaders: introduceLoaders,
    };
    const finalized = await context.projectSettings.build.finalize(internalCreated, context, internals);
    warnAndExitOnInvalidFinalizeReturn(finalized, 'build');
    return finalized;
};

export const checkProjectSettings = (settings: ProjectSettings): void => {
    checkFeatureMatrixSchema(settings.featureMatrix);

    if (settings.build.reportLintErrors === false) {
        checkPreCommitHookWhenLintDisabled(settings.cwd);
    }
};
