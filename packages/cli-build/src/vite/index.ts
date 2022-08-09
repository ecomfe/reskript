import path from 'node:path';
import fs from 'node:fs/promises';
import {build as viteBuild} from 'vite';
import {RollupOutput} from 'rollup';
import {AppEntry} from '@reskript/build-utils';
import {logger} from '@reskript/core';
import {BuildCommandLineArgs, ViteProjectSettings} from '@reskript/settings';
import {createViteConfig, BuildContext} from '@reskript/config-vite';
import {BuildRunOptions, WatchRunOptions} from '../interface.js';
import {drawBuildReport} from './report.js';

const isBuildOutput = (value: any): value is RollupOutput => 'output' in value;

const copyToDefaultHtmlWith = (directory: string, buildTarget: string) => (entry: AppEntry<unknown>) => fs.copyFile(
    path.join(directory, `${entry.name}-${buildTarget}.html`),
    path.join(directory, `${entry.name}.html`)
);

const createConfig = async (cmd: BuildCommandLineArgs, buildContext: BuildContext) => createViteConfig(
    buildContext,
    {
        // 外部自己会负责清理，不然每一个特性的构建都会删其它特性的结果，会死
        clean: false,
        sourceMaps: cmd.sourceMaps,
        cacheDirectory: cmd.cacheDirectory,
        publicPath: buildContext.projectSettings.build.publicPath ?? '/',
    }
);

const runBuild = async (cmd: BuildCommandLineArgs, buildContext: BuildContext) => {
    const config = await createConfig(cmd, buildContext);
    const output = await viteBuild({...config, logLevel: 'warn'});

    if (buildContext.isDefaultTarget) {
        const distDirectory = path.join(buildContext.cwd, 'dist');
        await Promise.all(buildContext.entries.map(copyToDefaultHtmlWith(distDirectory, buildContext.buildTarget)));
    }

    return output;
};

export const build = async (options: BuildRunOptions<unknown, ViteProjectSettings>): Promise<void> => {
    const {cmd, buildContextList} = options;
    const bundles = await Promise.all(buildContextList.map(v => runBuild(cmd, v)));
    const outputs = bundles.flatMap(v => v).filter(isBuildOutput);
    drawBuildReport(outputs);
};

export const watch = async (options: WatchRunOptions<unknown, ViteProjectSettings>): Promise<void> => {
    const {cmd, buildContext} = options;
    const config = await createConfig(cmd, buildContext);

    if (!config.build) {
        logger.error('Unknown error: vite config does not include build property');
        process.exit(22);
    }

    config.build.watch = {
        buildDelay: 300,
        clearScreen: true,
    };
    await viteBuild(config);
};
