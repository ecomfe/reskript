import path from 'path';
import fs from 'fs';
import {compact} from 'lodash';
import {Configuration} from 'webpack';
import {
    BuildEnv,
    RuntimeBuildEnv,
    ProjectSettings,
    warnAndExitOnInvalidFinalizeReturn,
    BuildInternals,
} from '@reskript/settings';
import {logger} from '@reskript/core';
import * as loaders from './loaders';
import * as rules from './rules';
import {revision, hasServiceWorker} from './utils/info';
import {mergeBuiltin} from './utils/merge';
import {checkFeatureMatrixSchema, checkPreCommitHookWhenLintDisabled} from './utils/validate';
import {createHTMLPluginInstances} from './utils/html';
import {resolveEntry} from './utils/entry';
import {introduceLoader, introduceLoaders} from './utils/loader';
import {AppEntry, BuildContext, EntryLocation} from './interface';

export {loaders, rules, createHTMLPluginInstances};
export * from './interface';

export const collectEntries = (location: EntryLocation): AppEntry[] => {
    const {cwd, srcDirectory, entryDirectory, only} = location;
    const directory = path.join(cwd, srcDirectory, entryDirectory);

    if (!fs.existsSync(directory)) {
        logger.error(`No ${srcDirectory}/${entryDirectory} directory found`);
        process.exit(24);
    }

    const files = fs.readdirSync(directory);
    const shouldInclude = (name: string) => (only ? only.includes(name) : true);
    return compact(files.map(f => resolveEntry(path.resolve(directory, f), shouldInclude)));
};

export const createRuntimeBuildEnv = (env: BuildEnv): RuntimeBuildEnv => {
    const now = new Date();

    return {
        ...env,
        buildVersion: revision(),
        buildTime: now.toISOString(),
    };
};

const importPartialWith = (context: BuildContext) => (name: string) => {
    try {
        // eslint-disable-next-line global-require
        return require(`./partials/${name}`).default(context);
    }
    catch (ex) {
        logger.error(`Unable to load configuration partial ${name}`);
        throw ex;
    }
};

export const createWebpackConfig = (context: BuildContext, extras: Configuration[] = []): Configuration => {
    const partials = [
        'base',
        context.mode,
        context.usage === 'build' && hasServiceWorker(context) && 'serviceWorker',
        context.projectSettings.build.thirdParty && 'external',
    ];
    const configurations = compact(partials).map(importPartialWith(context));
    const internalCreated = mergeBuiltin([...configurations, ...extras]);
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
