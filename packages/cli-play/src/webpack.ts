import path from 'path';
import webpack from 'webpack';
import {reject, isNil} from 'ramda';
import {dirFromImportMeta} from '@reskript/core';
import {createWebpackConfig as createBaseWebpackConfig, BuildContext} from '@reskript/config-webpack';
import * as loaders from '@reskript/config-webpack/loaders';
import {createWebpackDevServerPartial} from '@reskript/config-webpack-dev-server';
import {resolveComponentName} from './utils/path.js';
import {PlayCommandLineArgs} from './interface.js';
import {resolveHost} from './utils/host.js';

const currentDirectory = dirFromImportMeta(import.meta.url);

export const createWebpackConfig = async (target: string, cmd: PlayCommandLineArgs, buildContext: BuildContext) => {
    const hostType = await resolveHost(cmd.host);
    const extra = await createWebpackDevServerPartial(buildContext, hostType);
    const baseConfig = await createBaseWebpackConfig(buildContext, {extras: [extra]});
    const enableConcurrentMode = cmd.concurrentMode ?? buildContext.projectSettings.play.defaultEnableConcurrentMode;
    const playEntryPath = enableConcurrentMode
        ? path.join(currentDirectory, 'assets', 'playground-entry-cm.js.tpl')
        : path.join(currentDirectory, 'assets', 'playground-entry.js.tpl');
    const componentTypeName = resolveComponentName(target);
    const entryLoaders = [
        await loaders.babel(buildContext),
        {
            loader: path.join(currentDirectory, 'loader'),
            options: {
                ...buildContext.projectSettings.play,
                componentTypeName,
                cwd: buildContext.cwd,
                componentModulePath: path.resolve(buildContext.cwd, target),
                globalSetupModulePath: cmd.setup
                    ? path.resolve(cmd.cwd, cmd.setup)
                    : buildContext.projectSettings.play.defaultGlobalSetup,
            },
        },
    ];
    const config: webpack.Configuration = {
        ...baseConfig,
        entry: {
            index: playEntryPath,
        },
        module: {
            rules: [
                {
                    test: playEntryPath,
                    use: reject(isNil, entryLoaders),
                },
                ...(baseConfig.module?.rules ?? []),
            ],
        },
    };
    return config;
};
