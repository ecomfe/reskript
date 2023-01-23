import path from 'path';
import {fileURLToPath} from 'url';
import TerserPlugin from 'terser-webpack-plugin';
import {resolve, normalizeRuleMatch, WorkMode} from '@reskript/core';
import {onlyOnBuildLike, chainWebpackFinalize} from '@reskript/plugin-utils';
import {ProjectSettings, SettingsPlugin} from '@reskript/settings';
import {prepareAntdReplacement} from './antd.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const swcLoader = async (mode: WorkMode, settings: ProjectSettings) => {

    const modularizeImports: Record<string, {transform: string}> = {};
    if (settings.build.uses.includes('antd@4')) {
        modularizeImports.antd = {transform: `${currentDirectory}/exports/{{member}}`};
    }
    if (settings.build.uses.includes('lodash')) {
        modularizeImports.lodash = {transform: 'lodash/{{member}}'};
    }

    return {
        loader: await resolve('loader-of-loader'),
        options: {
            resolveLoader: async () => {
                return {
                    loader: path.join(currentDirectory, 'loader.js'),
                    type: 'module',
                    options: {
                        modularizeImports,
                        sourceMaps: true,
                        emotion: {
                            enabled: settings.build.uses.includes('emotion'),
                            sourceMap: true,
                            // 此处必须是`true`对应`"always"`
                            // TODO: https://github.com/emotion-js/emotion/issues/2305
                            autoLabel: true,
                        },
                        jsc: {
                            externalHelpers: true,
                            // TODO: 支持非TS代码（https://swc.rs/docs/configuration/compilation#ecmascript）
                            parser: {
                                syntax: 'typescript',
                                dynamicImport: true,
                                decorators: true,
                                jsx: true,
                                importAssertions: true,
                            },
                            experimental: {
                                keepImportAssertions: true,
                                plugins: [],
                            },
                            transform: {
                                legacyDecorator: true,
                                decoratorMetadata: true,
                                useDefineForClassFields: false,
                                react: {
                                    importSource: settings.build.uses.includes('emotion') ? '@emotion/react' : 'react',
                                    runtime: 'automatic',
                                    throwIfNamespace: true,
                                    development: mode === 'development',
                                    useBuiltins: true,
                                    refresh: mode === 'development' && settings.devServer.hot,
                                },
                            },
                        },
                    },
                };
            },
        },
    };
};

const factory = (mode: WorkMode): SettingsPlugin => async settings => {
    if (settings.driver !== 'webpack') {
        throw new Error('Vite driver not supported by plugin-experimental#buildFast');
    }

    if (settings.build.uses.includes('antd@4')) {
        await prepareAntdReplacement(settings.cwd);
    }

    return chainWebpackFinalize(
        settings,
        async (config, buildEntry, internals) => {
            const {cwd, projectSettings: {build: {script: {babel}}}} = buildEntry;
            const loadingRules = [
                internals.rules.less(buildEntry),
                internals.rules.css(buildEntry),
                internals.rules.svg(buildEntry),
                internals.rules.file(buildEntry),
                internals.rules.image(buildEntry),
            ] as const;
            const builtinRules = await Promise.all(loadingRules);
            config.module.rules = [
                {
                    test: /\.[jt]sx?$/,
                    resource: normalizeRuleMatch(cwd, babel),
                    oneOf: [
                        {
                            resourceQuery: /worker/,
                            use: [
                                (await internals.loader('worker', buildEntry))!,
                                await swcLoader(mode, settings),
                            ],
                        },
                        {
                            use: [
                                await swcLoader(mode, settings),
                            ],
                        },
                    ],
                },
                ...builtinRules,
            ];
            config.resolve.alias['@swc/helpers'] = path.resolve(await resolve('@swc/helpers'), '..', '..');
            config.optimization.minimizer = [
                new TerserPlugin({minify: TerserPlugin.swcMinify}),
            ];
            return config;
        }
    );
};

export default () => onlyOnBuildLike(factory);
