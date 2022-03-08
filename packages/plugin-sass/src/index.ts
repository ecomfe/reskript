import sass from 'sass';
import {normalizeRuleMatch, resolve} from '@reskript/core';
import {SettingsPlugin, LoaderType} from '@reskript/settings';
import {chainBuildFinalize} from '@reskript/plugin-utils';
import {SassLoaderOptions} from './interface.js';

export default (options: SassLoaderOptions = {}): SettingsPlugin => settings => chainBuildFinalize(
    settings,
    {
        webpack: async (config, entry, internals) => {
            const {cwd, usage, projectSettings: {build: {style: {modules, extract}}}} = entry;
            const final: LoaderType = (usage === 'build' && extract) ? 'cssExtract' : 'style';
            const sassUse = {
                loader: await resolve('sass-loader'),
                options: {
                    implementation: options.implementation ?? sass,
                    sassOptions: options.sassOptions,
                    sourceMap: extract,
                    additionalData: options.additionalData,
                },
            };
            const uses = [
                internals.loaders([final, 'css', 'postcss'], entry),
                internals.loaders(['classNames', final, 'cssModules', 'postcss'], entry),
            ] as const;
            const [global, modulesEnabled] = await Promise.all(uses);
            const sassRule = {
                test: /\.s[ac]ss$/,
                oneOf: [
                    {
                        test: /\.global\.s[ac]ss$/,
                        use: [
                            ...global,
                            sassUse,
                        ],
                    },
                    {
                        resource: normalizeRuleMatch(cwd, modules),
                        use: [
                            ...modulesEnabled,
                            sassUse,
                        ],
                    },
                    {
                        use: [
                            ...global,
                            sassUse,
                        ],
                    },
                ],
            };

            if (!config.module?.rules) {
                throw new Error('Webpack configuration provided to @reskript/plugin-sass is invalid');
            }

            config.module.rules.push(sassRule);
            return config;
        },
    }
);
