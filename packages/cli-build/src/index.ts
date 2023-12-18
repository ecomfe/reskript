import path from 'node:path';
import fs from 'node:fs/promises';
import {difference} from 'ramda';
import {logger, prepareEnvironment} from '@reskript/core';
import {EntryLocation, validateProjectSettings} from '@reskript/build-utils';
import {
    readProjectSettings,
    BuildCommandLineArgs,
    strictCheckRequiredDependency,
    ProjectSettings,
} from '@reskript/settings';
import {drawFeatureMatrix, createBuildContextWith, validateFeatureNames} from './utils.js';

const watch = async (cmd: BuildCommandLineArgs, projectSettings: ProjectSettings): Promise<void> => {
    const buildTarget = cmd.buildTarget ?? 'dev';
    const entryLocation: EntryLocation = {
        cwd: cmd.cwd,
        srcDirectory: cmd.srcDirectory,
        entryDirectory: cmd.entriesDirectory,
        only: cmd.entriesOnly,
    };

    if (projectSettings.driver === 'webpack') {
        const importing = [import('@reskript/config-webpack'), import('./webpack/index.js')] as const;
        const [{collectEntries}, {watch}] = await Promise.all(importing);
        const entries = await collectEntries(entryLocation);
        const createBuildContext = await createBuildContextWith({cmd, projectSettings, entries});
        await watch({cmd, projectSettings, buildContext: createBuildContext(buildTarget)});
    }
    else {
        const importing = [import('@reskript/config-vite'), import('./vite/index.js')] as const;
        const [{collectEntries}, {watch}] = await Promise.all(importing);
        const entries = await collectEntries(entryLocation);
        const createBuildContext = await createBuildContextWith({cmd, projectSettings, entries});
        await watch({cmd, projectSettings, buildContext: createBuildContext(buildTarget)});
    }
};

const build = async (cmd: BuildCommandLineArgs, projectSettings: ProjectSettings): Promise<void> => {
    const {cwd, clean} = cmd;

    const featureNames = difference(Object.keys(projectSettings.featureMatrix), projectSettings.build.excludeFeatures);

    validateFeatureNames(featureNames, cmd.featureOnly);
    drawFeatureMatrix(projectSettings, cmd.featureOnly);

    if (clean) {
        await fs.rm(path.join(cwd, 'dist'), {recursive: true, force: true});
    }

    const featureNamesToUse = cmd.featureOnly ? [cmd.featureOnly] : featureNames;
    const entryLocation: EntryLocation = {
        cwd: cmd.cwd,
        srcDirectory: cmd.srcDirectory,
        entryDirectory: cmd.entriesDirectory,
        only: cmd.entriesOnly,
    };

    if (projectSettings.driver === 'webpack') {
        const importing = [import('@reskript/config-webpack'), import('./webpack/index.js')] as const;
        const [{collectEntries}, {build}] = await Promise.all(importing);
        const entries = await collectEntries(entryLocation);
        const createBuildContext = await createBuildContextWith({cmd, projectSettings, entries});
        await build({cmd, projectSettings, buildContextList: featureNamesToUse.map(createBuildContext)});
    }
    else {
        const importing = [import('@reskript/config-vite'), import('./vite/index.js')] as const;
        const [{collectEntries}, {build}] = await Promise.all(importing);
        const entries = await collectEntries(entryLocation);
        const createBuildContext = await createBuildContextWith({cmd, projectSettings, entries});
        await build({cmd, projectSettings, buildContextList: featureNamesToUse.map(createBuildContext)});
    }
};

export const run = async (cmd: BuildCommandLineArgs): Promise<void> => {
    const {cwd, mode, configFile} = cmd;
    process.env.NODE_ENV = mode;
    await prepareEnvironment(cwd, mode, cmd.envFiles);

    if (cmd.analyze && !cmd.buildTarget) {
        logger.error('--analyze must be used with --build-target to specify only one target');
        process.exit(21);
    }

    const projectSettings = await readProjectSettings({commandName: 'build', specifiedFile: configFile, ...cmd});

    validateProjectSettings(projectSettings);
    await strictCheckRequiredDependency(projectSettings, cwd);

    if (cmd.watch) {
        watch(cmd, projectSettings);
    }
    else {
        build(cmd, projectSettings);
    }
};
