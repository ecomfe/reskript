import path from 'node:path';
import webpack from 'webpack';
import {reject, isNil} from 'ramda';
import {dirFromImportMeta, resolve} from '@reskript/core';
import {createWebpackConfig as createBaseWebpackConfig, BuildContext} from '@reskript/config-webpack';
import {resolveDevHost} from '@reskript/build-utils';
import * as loaders from '@reskript/config-webpack/loaders';
import {createWebpackDevServerPartial} from '@reskript/config-webpack-dev-server';
import {PlayCommandLineArgs} from '@reskript/settings';
import {resolveComponentName} from '../utils/path.js';
import {resolveEntryPath} from '../utils/entry.js';

const currentDirectory = dirFromImportMeta(import.meta.url);

export const createWebpackConfig = async (target: string, cmd: PlayCommandLineArgs, buildContext: BuildContext) => {
    const hostType = await resolveDevHost(cmd.host);
    const extra = await createWebpackDevServerPartial(buildContext, hostType);
    const baseConfig = await createBaseWebpackConfig(buildContext, {extras: [extra]});
    const enableConcurrentMode = cmd.concurrentMode ?? buildContext.projectSettings.play.defaultEnableConcurrentMode;
    const playEntryPath = resolveEntryPath(enableConcurrentMode);
    const componentTypeName = resolveComponentName(target);
    const entryLoaders = [
        await loaders.babel(buildContext),
        {
            loader: await resolve('loader-of-loader'),
            options: {
                resolveLoader: async () => {
                    return {
                        loader: path.join(currentDirectory, 'loader.js'),
                        type: 'module',
                        options: {
                            componentTypeName,
                            cwd: buildContext.cwd,
                            componentModulePath: path.resolve(buildContext.cwd, target),
                            globalSetupModulePath: cmd.setup
                                ? path.resolve(cmd.cwd, cmd.setup)
                                : buildContext.projectSettings.play.defaultGlobalSetup,
                        },
                    };
                },
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
        resolve: {
            ...baseConfig.resolve,
            modules: [
                ...(baseConfig.resolve.modules ?? ['node_modules']),
                path.join(cmd.cwd, 'node_modules'),
            ],
            fallback: {
                ...baseConfig.resolve?.fallback,
                // React要从`17.0.3`开始才会有`exports`配置，这之前的版本在ESM下是必须加`.js`后续的。
                // 利用这个`resolve.fallback`，可以在找不到`react/jsx-runtime`时跳到`react/jsx-runtime.js`上去，兼容旧版本。
                'react/jsx-runtime': 'react/jsx-runtime.js',
            },
        },
    };
    return config;
};
