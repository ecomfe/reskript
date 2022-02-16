import path from 'node:path';
import {UserConfig, mergeConfig} from 'vite';
import {dirFromImportMeta, logger} from '@reskript/core';
import {EntryLocation, AppEntry, EntryOptions, collectAppEntries} from '@reskript/build-utils';
import {BuildContext, ViteOptions} from './interface.js';
import buildConfig from './config/build.js';
import cssConfig from './config/css.js';
import resolveConfig from './config/resolve.js';
import serverConfig from './config/server.js';
import defineConfig from './config/define.js';
import pluginsConfig from './config/plugins.js';

export type {ViteOptions} from './interface.js';

const factories = [buildConfig, cssConfig, resolveConfig, serverConfig, defineConfig, pluginsConfig];

export const collectEntries = async (location: EntryLocation): Promise<Array<AppEntry<unknown>>> => {
    const options: EntryOptions<unknown> = {
        ...location,
        templateExtension: '.ejs',
        defaultTemplate: path.join(dirFromImportMeta(import.meta.url), 'assets', 'default-html.ejs'),
        transformConfig: imported => imported,
    };

    return collectAppEntries(options);
};

export const createViteConfig = async (context: BuildContext, options: ViteOptions): Promise<UserConfig> => {
    if (context.entries.length !== 1) {
        logger.error('Currently vite driver only supports one application entry.');
        process.exit(24);
    }

    const parts = await Promise.all(factories.map(v => v(context, options)));
    const config = parts.reduce((output, current) => mergeConfig(output, current));
    return config;
};
