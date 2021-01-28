import * as path from 'path';
import webpack from 'webpack';
import {compact} from 'lodash';
import {sync as resolve} from 'resolve';
import MonacoEditorWebpackPlugin from 'monaco-editor-webpack-plugin';
import {createWebpackConfig as createBaseWebpackConfig, BuildContext, loaders} from '@reskript/config-webpack';
import {createWebpackDevServerPartial} from '@reskript/config-webpack-dev-server';

const guessComponentTypeName = (target: string): string => {
    const filename = path.basename(target, path.extname(target));
    if (/[A-Z]/.test(filename)) {
        return filename;
    }
    return path.basename(path.dirname(target));
};

export const createWebpackConfig = (target: string, buildContext: BuildContext): webpack.Configuration => {
    const extra = createWebpackDevServerPartial(buildContext);
    const baseConfig = createBaseWebpackConfig(buildContext, [extra]);
    const playEntryPath = resolve('./assets/playground-entry.js.tpl');
    const componentTypeName = guessComponentTypeName(target);
    const entryLoaders = [
        loaders.babel(buildContext),
        {
            loader: resolve('./loader'),
            options: {
                componentTypeName,
                componentModulePath: path.resolve(buildContext.cwd, target),
                injectResources: buildContext.projectSettings.play.injectResources,
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
        plugins: [
            ...(baseConfig.plugins ?? []),
            new MonacoEditorWebpackPlugin({languages: ['javascript', 'typescript']}),
        ],
    };
    return config;
};
