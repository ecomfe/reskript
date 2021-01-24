import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import {compact} from 'lodash';
import {Configuration} from 'webpack';
import {BuildEnv, RuntimeBuildEnv, ProjectSettings} from '@reskript/settings';
import * as loaders from './loaders';
import * as rules from './rules';
import {
    revision,
    mergeBuiltin,
    checkFeatureMatrixSchema,
    checkPreCommitHookWhenLintDisabled,
    createHTMLPluginInstances,
} from './utils';
import {AppEntry, BuildContext} from './interface';

export {loaders, rules, createHTMLPluginInstances};
export * from './interface';

const readEntryConfig = (name: string, dir: string): {[key: string]: any} => {
    try {
        // eslint-disable-next-line global-require
        const config = require(path.join(dir, name + '.config')) as {[key: string]: any};
        return config;
    }
    catch (ex) {
        return {};
    }
};

const resolveEntryTemplate = (name: string, dir: string): string | null => {
    const filename = path.join(dir, name + '.ejs');

    return fs.existsSync(filename) ? filename : null;
};

export const collectEntries = (cwd: string, srcDirectory: string): AppEntry[] => {
    const entriesFolder = path.join(cwd, srcDirectory, 'entries');

    if (!fs.existsSync(entriesFolder)) {
        console.error(chalk.red(`No ${srcDirectory}/entries dir found`));
        process.exit(1);
    }

    // 要`*.js`但不要`*.config.js`
    const entryScriptFiles = fs.readdirSync(entriesFolder)
        .filter(f => /\.[jt]sx?$/.test(f) && !f.includes('.config.'))
        .map(f => path.resolve(entriesFolder, f));
    const toEntry = (file: string): AppEntry => {
        const name = path.basename(file, path.extname(file));
        const template = resolveEntryTemplate(name, entriesFolder);
        const config = readEntryConfig(name, entriesFolder);
        return {name, file, config, template};
    };
    return entryScriptFiles.map(toEntry);
};

export const createRuntimeBuildEnv = (env: BuildEnv): RuntimeBuildEnv => {
    const now = new Date();

    return {
        ...env,
        buildVersion: revision(),
        buildTime: now.toISOString(),
    };
};

export const createWebpackConfig = (context: BuildContext, extras: Configuration[] = []): Configuration => {
    const partials = compact(['base', context.mode, context.projectSettings.build.thirdParty && 'external']);
    // eslint-disable-next-line global-require
    const configurations = partials.map(n => require(`./partials/${n}`).default(context) as Partial<Configuration>);
    const internalCreated = mergeBuiltin([...configurations, ...extras]);
    const finalized = context.projectSettings.build.finalize(internalCreated, context);
    return finalized;
};

export const checkProjectSettings = (settings: ProjectSettings): void => {
    checkFeatureMatrixSchema(settings.featureMatrix);

    if (settings.build.reportLintErrors === false) {
        checkPreCommitHookWhenLintDisabled(settings.cwd);
    }
};
