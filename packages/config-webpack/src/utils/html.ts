import HtmlWebpackPlugin, {Options as HtmlOptions} from 'html-webpack-plugin';
import {BuildEntry} from '@reskript/settings';
import {constructEntryTemplateData, AppEntry} from '@reskript/build-utils';
import {WebpackPluginInstance} from 'webpack';
import {EntryConfig, BuildContext} from '../interface.js';
import {TransformHtmlWebpackPlugin} from './plugin.js';

const getHTMLConfig = (filename: string, entry: AppEntry<EntryConfig>, env: BuildEntry): HtmlOptions => {
    const {
        projectSettings: {
            build: {
                appTitle,
                favicon,
            },
        },
        buildVersion,
        buildTime,
        buildTarget,
    } = env;
    const {name, template} = entry;
    const buildIdentifier = `${buildVersion}/${buildTarget}@${buildTime}`;

    const baseConfig = {
        favicon,
        filename,
        title: appTitle,
        meta: {
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
            'app-version': buildIdentifier,
        },
        chunks: [name],
        minify: {
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
            removeAttributeQuotes: false,
            removeEmptyAttributes: true,
            removeOptionalTags: false,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
        },
        ...entry.config.html,
        templateParameters: () => ({templateData: constructEntryTemplateData(env, entry)}),
    };

    return template ? Object.assign(baseConfig, {template}) : baseConfig;
};

const createHTMLPluginWith = (buildEntry: BuildEntry) => {
    const {usage} = buildEntry;

    return (suffix: string) => (entry: AppEntry<EntryConfig>): HtmlWebpackPlugin => {

        // 在build的时候，因为静态资源是放在`assets`下，这也是`output`配置项的值，所以HTML要放到外面一层，即`../`下，
        // 不过在调试的时候，启动`webpack-dev-server`没有这个情况，所以又不需要`../`
        const filename = (usage === 'build' ? '../' : '') + `${entry.name}${suffix}.html`;
        const pluginConfig = getHTMLConfig(filename, entry, buildEntry);
        return new HtmlWebpackPlugin(pluginConfig);
    };
};

export const createHtmlPluginInstances = (buildContext: BuildContext): WebpackPluginInstance[] => {
    const {isDefaultTarget, buildTarget, entries} = buildContext;
    const createInstanceWithSuffix = createHTMLPluginWith(buildContext);
    const pluginsWithinTarget = entries.map(createInstanceWithSuffix('-' + buildTarget));
    const pluginsOfDefault = isDefaultTarget ? entries.map(createInstanceWithSuffix('')) : [];

    return [...pluginsWithinTarget, ...pluginsOfDefault];
};

export const createTransformHtmlPluginInstance = (buildContext: BuildContext): TransformHtmlWebpackPlugin => {
    return new TransformHtmlWebpackPlugin(buildContext.projectSettings.build.transformEntryHtml);
};
