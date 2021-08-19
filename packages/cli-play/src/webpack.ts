import path from 'path';
import webpack from 'webpack';
import {compact} from 'lodash';
import {sync as resolve} from 'resolve';
import {createWebpackConfig as createBaseWebpackConfig, BuildContext, loaders} from '@reskript/config-webpack';
import {createWebpackDevServerPartial} from '@reskript/config-webpack-dev-server';
import {resolveComponentName} from './utils/path';
import {PlayCommandLineArgs} from './interface';
import {resolveHost} from './utils/host';

export const createWebpackConfig = async (target: string, cmd: PlayCommandLineArgs, buildContext: BuildContext) => {
    const hostType = await resolveHost(cmd.host);
    const extra = createWebpackDevServerPartial(buildContext, hostType);
    const baseConfig = createBaseWebpackConfig(buildContext, [extra]);
    const enableConcurrentMode = cmd.concurrentMode ?? buildContext.projectSettings.play.defaultEnableConcurrentMode;
    const playEntryPath = enableConcurrentMode
        ? resolve('./assets/playground-entry-cm.js.tpl')
        : resolve('./assets/playground-entry.js.tpl');
    const componentTypeName = resolveComponentName(target);
    const entryLoaders = [
        loaders.babel(buildContext),
        {
            loader: resolve('./loader'),
            options: {
                ...buildContext.projectSettings.play,
                componentTypeName,
                cwd: buildContext.cwd,
                componentModulePath: path.resolve(buildContext.cwd, target),
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
                    use: compact(entryLoaders),
                },
                ...(baseConfig.module?.rules ?? []),
            ],
        },
    };
    return config;
};
