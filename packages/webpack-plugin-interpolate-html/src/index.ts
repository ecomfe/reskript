import {Compilation, Compiler, WebpackPluginInstance} from 'webpack';
import {interpolateEntryContent} from '@reskript/build-utils';

const findHtmlWebpackPlugin = (compilation: Compilation) => {
    const isResolved = (plugin: any): plugin is WebpackPluginInstance => {
        return plugin.constructor && plugin.constructor.name === 'HtmlWebpackPlugin';
    };

    const instance = (compilation.compiler.options.plugins || []).find(isResolved);
    return instance ? instance.constructor : null;
};

export default class InterpolateHTMLWebpackPlugin {
    readonly replacements: Record<string, string | undefined>;

    constructor(replacements: Record<string, string | undefined>) {
        this.replacements = replacements;
    }

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('interpolate-html-webpack-plugin', compilation => this.replace(compilation));
    }

    replace(compilation: Compilation) {
        const HtmlWebpackPlugin = findHtmlWebpackPlugin(compilation);

        if (!HtmlWebpackPlugin) {
            // 这个插件是始终要用的，但可能`entries`是空的所以它不需要起作用
            return;
        }

        // @ts-expect-error 需要`HTMLWebpackPlugin`上的静态方法
        const {afterTemplateExecution} = HtmlWebpackPlugin.getHooks(compilation);
        afterTemplateExecution.tap(
            'interpolate-html-webpack-plugin',
            (data: {html: string}) => {
                data.html = interpolateEntryContent(data.html, this.replacements);
            }
        );
    }
}
