import path from 'path';
import {fileURLToPath} from 'url';
import {SettingsPluginItem} from '@reskript/settings';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export default (): SettingsPluginItem => {
    return settings => {
        if (settings.driver !== 'webpack') {
            throw new Error('VITE IS BAD');
        }

        return {
            ...settings,
            build: {
                ...settings.build,
                finalize: async (configIn, buildEntry, internals) => {
                    const loadingRules = [
                        internals.rules.less(buildEntry),
                        internals.rules.css(buildEntry),
                        internals.rules.svg(buildEntry),
                        internals.rules.file(buildEntry),
                        internals.rules.image(buildEntry),
                        internals.rules.script(buildEntry),
                    ] as const;
                    const builtinRules = await Promise.all(loadingRules);
                    const config = await settings.build.finalize(configIn, buildEntry, internals);
                    config.module.rules = [
                        {
                            test: /\.[jt]sx?$/,
                            include: path.join(currentDirectory, '..', 'src'),
                            use: [
                                {
                                    loader: path.join(currentDirectory, 'loader'),
                                    options: {
                                        jsc: {
                                            externalHelpers: true,
                                            parser: {
                                                syntax: 'typescript',
                                                dynamicImport: true,
                                                decorators: false,
                                                jsx: true,
                                                importAssertions: true,
                                            },
                                            experimental: {
                                                keepImportAssertions: true,
                                                plugins: [],
                                            },
                                            transform: {
                                                legacyDecorator: false,
                                                decoratorMetadata: false,
                                                useDefineForClassFields: false,
                                                react: {
                                                    importSource: '@emotion/react',
                                                    runtime: 'automatic',
                                                    throwIfNamespace: true,
                                                    development: false,
                                                    useBuiltins: true,
                                                    refresh: false,
                                                },
                                                optimizer: {
                                                    simplify: false,
                                                    globals: {
                                                        envs: {
                                                            NODE_ENV: '"production"',
                                                            'skr.features.batch': 'true',
                                                        },
                                                    },
                                                },
                                            },
                                        }
                                    },
                                },
                            ],
                        },
                        ...builtinRules,
                    ];
                    return config;
                },
            },
        };
    };
};
