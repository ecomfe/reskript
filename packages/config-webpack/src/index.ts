import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
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
import {
    revision,
    mergeBuiltin,
    checkFeatureMatrixSchema,
    checkPreCommitHookWhenLintDisabled,
    createHTMLPluginInstances,
    hasServiceWorker,
} from './utils';
import {AppEntry, BuildContext} from './interface';

export {loaders, rules, createHTMLPluginInstances};
export * from './interface';

const readEntryConfig = (name: string, dir: string): Record<string, any> => {
    try {
        // eslint-disable-next-line global-require
        const config = require(path.join(dir, name + '.config')) as Record<string, any>;
        return config;
    }
    catch (ex) {
        return {};
    }
};

const DEFAULT_HTML_TEMPLATE = path.resolve(__dirname, 'assets', 'default-html.ejs');

const resolveEntryTemplate = (name: string, dir: string): string => {
    const filename = path.join(dir, name + '.ejs');

    return fs.existsSync(filename) ? filename : DEFAULT_HTML_TEMPLATE;
};

export const collectEntries = (cwd: string, srcDirectory: string, only?: string[]): AppEntry[] => {
    const entriesFolder = path.join(cwd, srcDirectory, 'entries');

    if (!fs.existsSync(entriesFolder)) {
        console.error(chalk.red(`No ${srcDirectory}/entries dir found`));
        process.exit(24);
    }

    // 要`*.js`但不要`*.config.js`
    const entryScriptFiles = fs.readdirSync(entriesFolder)
        .filter(f => /\.[jt]sx?$/.test(f) && !f.includes('.config.'))
        .map(f => path.resolve(entriesFolder, f));
    const toEntry = (file: string): AppEntry | null => {
        const name = path.basename(file, path.extname(file));

        if (only && !only.includes(name)) {
            return null;
        }

        const template = resolveEntryTemplate(name, entriesFolder);
        const config = readEntryConfig(name, entriesFolder);
        return {name, file, config, template};
    };
    return compact(entryScriptFiles.map(toEntry));
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
        console.error(chalk.red(`Unable to load configuration partial ${name}`));
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
