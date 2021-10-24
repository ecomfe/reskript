import path from 'path';
import {existsSync} from 'fs';
import fs from 'fs/promises';
import {pMap, logger} from '@reskript/core';
import {compact} from 'lodash';
import {Configuration} from 'webpack';
import {
    BuildEnv,
    RuntimeBuildEnv,
    ProjectSettings,
    warnAndExitOnInvalidFinalizeReturn,
    BuildInternals,
} from '@reskript/settings';
import * as loaders from './loaders';
import * as rules from './rules';
import {revision, hasServiceWorker} from './utils/info';
import {mergeBuiltin} from './utils/merge';
import {checkFeatureMatrixSchema, checkPreCommitHookWhenLintDisabled} from './utils/validate';
import {createHTMLPluginInstances} from './utils/html';
import {resolveEntry} from './utils/entry';
import {introduceLoader, introduceLoaders} from './utils/loader';
import {AppEntry, BuildContext, ConfigurationFactory, EntryLocation, StrictOptions} from './interface';
import strictPartial from './partials/strict';

export {loaders, rules, createHTMLPluginInstances};
export * from './interface';

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

const importPartialWith = (context: BuildContext) => async (name: string) => {
    try {
        const {default: factory} = await import(`./partials/${name}`) as {default: ConfigurationFactory};
        const partial = await factory(context);
        return partial;
    }
    catch (ex) {
        logger.error(`Unable to load configuration partial ${name}`);
        throw ex;
    }
};

interface Options {
    strict?: StrictOptions;
    extras?: Configuration[];
}

export const createWebpackConfig = async (context: BuildContext, options: Options = {}) => {
    const {strict, extras = []} = options;
    const partials = [
        'base',
        context.mode,
        context.usage === 'build' && hasServiceWorker(context) && 'serviceWorker',
        context.projectSettings.build.thirdParty && 'external',
    ];
    const configurations = await pMap(compact(partials), importPartialWith(context));
    const internalCreated = mergeBuiltin([...configurations, strictPartial(strict, context.cwd), ...extras]);
    const internals: BuildInternals = {
        rules,
        loader: introduceLoader,
        loaders: introduceLoaders,
    };
    const finalized = context.projectSettings.build.finalize(internalCreated, context, internals);
    warnAndExitOnInvalidFinalizeReturn(finalized, 'build');
    return finalized;
};

export const checkProjectSettings = (settings: ProjectSettings): void => {
    checkFeatureMatrixSchema(settings.featureMatrix);

    if (settings.build.reportLintErrors === false) {
        checkPreCommitHookWhenLintDisabled(settings.cwd);
    }
};
