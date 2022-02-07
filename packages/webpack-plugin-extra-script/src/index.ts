import {Compilation, Compiler, WebpackPluginInstance} from 'webpack';
import {ScriptDescriptor, ScriptFactoryContext, ScriptFactory, Options, InlineScriptDescriptor} from './interface.js';

export type {ScriptFactory, ScriptFactoryContext, ScriptDescriptor, Options};

const findHtmlWebpackPlugin = (compilation: Compilation) => {
    const isResolved = (plugin: WebpackPluginInstance) => {
        return plugin.constructor && plugin.constructor.name === 'HtmlWebpackPlugin';
    };

    const instance = (compilation.compiler.options.plugins || []).find(isResolved);
    return instance ? instance.constructor : null;
};

const isInline = (descriptor: ScriptDescriptor): descriptor is InlineScriptDescriptor => !!(descriptor as any).content;

const toTagDescription = (descriptor: ScriptDescriptor) => {
    if (isInline(descriptor)) {
        return {
            tagName: 'script',
            voidTag: false,
            attributes: {},
            innerHTML: (descriptor.content).replace(/(<)(\/script>)/g, '\\x3C$2'),
        };
    }
    return {
        tagName: 'script',
        voidTag: false,
        attributes: {
            src: descriptor.src,
            async: descriptor.async,
            ...(descriptor.crossOrigin ? {crossorigin: true} : null),
        },
    };
};

export default class ExtraScriptWebpackPlugin {
    readonly createScripts: (context: ScriptFactoryContext) => ScriptDescriptor[];

    readonly options: Options;

    constructor(scriptOrFactory: ScriptFactory, options: Options = {}) {
        this.createScripts = (context: ScriptFactoryContext) => {
            const extra = typeof scriptOrFactory === 'function' ? scriptOrFactory(context) : scriptOrFactory;
            return Array.isArray(extra) ? extra : [extra];
        };
        this.options = options;
    }

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('extra-script-webpack-plugin', compilation => this.injectScripts(compilation));
    }

    injectScripts(compilation: Compilation) {
        const HtmlWebpackPlugin = findHtmlWebpackPlugin(compilation);

        if (!HtmlWebpackPlugin) {
            throw new Error('No html-webpack-plugin instance found');
        }

        const {alterAssetTags} = (HtmlWebpackPlugin as any).getHooks(compilation);
        alterAssetTags.tapAsync(
            'extra-script-webpack-plugin',
            (data: any, callback: (error: Error | null, data: any) => void) => {
                const newData = this.addExtraScripts(data);
                callback(null, newData);
            }
        );
    }

    addExtraScripts(data: any) {
        const scripts = this.createScripts(data.plugin.options);
        const tags = scripts.map(toTagDescription);
        return {
            ...data,
            assetTags: {
                ...data.assetTags,
                scripts: this.options.prepend
                    ? [...tags, ...data.assetTags.scripts]
                    : [...data.assetTags.scripts, ...tags],
            },
        };
    }
}
