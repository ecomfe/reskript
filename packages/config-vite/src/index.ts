import path from 'node:path';
import {UserConfig, mergeConfig} from 'vite';
import {dirFromImportMeta, logger} from '@reskript/core';
import {FinalizableViteConfiguration, warnAndExitOnInvalidFinalizeReturn} from '@reskript/settings';
import {EntryLocation, AppEntry, EntryOptions, collectAppEntries} from '@reskript/build-utils';
import {BuildContext, ViteOptions} from './interface.js';
import buildConfig from './config/build.js';
import cssConfig from './config/css.js';
import baseConfig from './config/base.js';
import resolveConfig from './config/resolve.js';
import serverConfig from './config/server.js';
import defineConfig from './config/define.js';
import pluginsConfig from './config/plugins.js';
import optimizeDepsConfig from './config/optimizeDeps.js';

export type {ViteOptions, BuildContext} from './interface.js';

const factories = [
    baseConfig,
    buildConfig,
    cssConfig,
    resolveConfig,
    serverConfig,
    defineConfig,
    pluginsConfig,
    optimizeDepsConfig,
];

export const collectEntries = async (location: EntryLocation): Promise<Array<AppEntry<unknown>>> => {
    const options: EntryOptions<unknown> = {
        ...location,
        templateExtension: '.ejs',
        defaultTemplate: path.join(dirFromImportMeta(import.meta.url), 'assets', 'default-html.ejs'),
        transformConfig: imported => imported ?? {},
    };

    return collectAppEntries(options);
};

// TODO: 要支持`reportLintErrors`

export const createViteConfig = async (context: BuildContext, input: ViteOptions): Promise<UserConfig> => {
    if (context.entries.length !== 1) {
        logger.error('Currently vite driver only supports one application entry.');
        process.exit(24);
    }

    // 兼容一下`publicPath`有没有最后的`/`的情况
    const options = {...input, publicPath: input.publicPath + (input.publicPath.endsWith('/') ? '' : '/')};
    const parts = await Promise.all(factories.map(v => v(context, options)));
    const config = parts.reduce((output, current) => mergeConfig(output, current)) as FinalizableViteConfiguration;
    const serverFinalized = {
        ...config,
        server: await context.projectSettings.devServer.finalize(config.server, context),
    };
    warnAndExitOnInvalidFinalizeReturn(serverFinalized, 'devServer');

    const finalized = await context.projectSettings.build.finalize(serverFinalized, context);
    warnAndExitOnInvalidFinalizeReturn(finalized, 'build');

    return finalized;
};
