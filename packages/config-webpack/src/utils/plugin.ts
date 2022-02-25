import {Compilation, Compiler} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export class TransformHtmlWebpackPlugin {
    readonly transform: (html: string) => string;

    constructor(transform: (html: string) => string) {
        this.transform = transform;
    }

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('transform-html-webpack-plugin', compilation => this.inject(compilation));
    }

    inject(compilation: Compilation) {
        const {afterTemplateExecution} = HtmlWebpackPlugin.getHooks(compilation);
        afterTemplateExecution.tap(
            'transform-html-webpack-plugin',
            data => ({...data, html: this.transform(data.html)})
        );
    }
}
