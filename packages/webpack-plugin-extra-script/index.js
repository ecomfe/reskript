const findHtmlWebpackPlugin = compilation => {
    const isResolved = plugin => plugin.constructor && plugin.constructor.name === 'HtmlWebpackPlugin';
    const instance = (compilation.compiler.options.plugins || []).find(isResolved);
    return instance ? instance.constructor : null;
};

module.exports = class ExtraScriptWebpackPlugin {
    constructor(scriptOrFactory, options = {}) {
        this.createScripts = options => {
            const extra = typeof scriptOrFactory === 'function' ? scriptOrFactory(options) : scriptOrFactory;
            return Array.isArray(extra) ? extra : [extra];
        };
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(
            'extra-script-webpack-plugin',
            compilation => this.injectScripts(compilation)
        );
    }

    injectScripts(compilation) {
        const HtmlWebpackPlugin = findHtmlWebpackPlugin(compilation);

        if (!HtmlWebpackPlugin) {
            throw new Error('No html-webpack-plugin instance found');
        }

        const {alterAssetTags} = HtmlWebpackPlugin.getHooks(compilation);
        alterAssetTags.tapAsync(
            'extra-script-webpack-plugin',
            (data, callback) => {
                const newData = this.addExtraScripts(data);
                callback(null, newData);
            }
        );
    }

    addExtraScripts(data) {
        const scripts = this.createScripts(data.plugin.options);
        const toTagDescription = ({src, content, async = false, crossOrigin}) => {
            const crossOriginProps = crossOrigin ? {crossorigin: true} : {};
            return src
                ? {
                    tagName: 'script',
                    voidTag: false,
                    attributes: {src, async, ...crossOriginProps},
                }
                : {
                    tagName: 'script',
                    voidTag: false,
                    attributes: {},
                    innerHTML: (content || '').replace(/(<)(\/script>)/g, '\\x3C$2'),
                };
        };
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
};
