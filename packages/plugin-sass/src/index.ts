import resolve from 'resolve';
import sass from 'sass';
import {normalizeRuleMatch} from '@reskript/core';
import {SettingsPlugin, BuildSettings, LoaderType} from '@reskript/settings';
import {SassLoaderOptions} from './interface.js';

export default (options: SassLoaderOptions = {}): SettingsPlugin => {
    const finalizeBuild: BuildSettings['finalize'] = (config, entry, internals) => {
        const {cwd, usage, projectSettings: {build: {style: {modules, extract}}}} = entry;
        const final: LoaderType = (usage === 'build' && extract) ? 'cssExtract' : 'style';
        const sassUse = {
            loader: resolve.sync('sass-loader'),
            options: {
                implementation: options.implementation ?? sass,
                sassOptions: options.sassOptions,
                sourceMap: extract,
                additionalData: options.additionalData,
            },
        };
        const sassRule = {
            test: /\.s[ac]ss$/,
            oneOf: [
                {
                    test: /\.global\.s[ac]ss$/,
                    use: [
                        ...internals.loaders([final, 'css', 'postCSS'], entry),
                        sassUse,
                    ],
                },
                {
                    resource: normalizeRuleMatch(cwd, modules),
                    use: [
                        ...internals.loaders(['classNames', final, 'cssModules', 'postCSSModules'], entry),
                        sassUse,
                    ],
                },
                {
                    use: [
                        ...internals.loaders([final, 'css', 'postCSS'], entry),
                        sassUse,
                    ],
                },
            ],
        };

        if (!config.module?.rules) {
            throw new Error('Webpack configuration provided to @reskript/plugin-sass is invalid (no existing rules)');
        }

        config.module.rules.push(sassRule);
        return config;
    };

    return settings => {
        return {
            ...settings,
            build: {
                ...settings.build,
                finalize: (config, env, internals) => {
                    const previous = settings.build.finalize(config, env, internals);
                    return finalizeBuild(previous, env, internals);
                },
            },
        };
    };
};
