import {Compilation, Compiler, WebpackPluginInstance} from 'webpack';
import escapeRegExp from 'escape-string-regexp';

const findHtmlWebpackPlugin = (compilation: Compilation) => {
    const isResolved = (plugin: WebpackPluginInstance) => {
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

        const {afterTemplateExecution} = (HtmlWebpackPlugin as any).getHooks(compilation);
        afterTemplateExecution.tap(
            'interpolate-html-webpack-plugin',
            (data: {html: string}) => {
                const html = Object.entries(this.replacements).reduce(
                    (html, [key, value]) => (
                        value === undefined
                            ? html
                            : html.replace(new RegExp(`%${escapeRegExp(key)}%`, 'g'), value)
                    ),
                    data.html
                );
                data.html = html;
            }
        );
    }
}
