import {getOptions} from 'loader-utils';
import {PlaySettings} from '@reskript/settings';

interface LoaderOptions extends PlaySettings {
    componentTypeName: string;
    componentModulePath: string;
}

// TODO: `webpack`的官方定义里没有`Loader`这个东西：https://github.com/webpack/webpack/issues/11630
const loader = function playEntryLoader(this: any, content: any) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = getOptions(this) as unknown as LoaderOptions;
    const extraImports = options.injectResources.map(e => `import '${e}';`).join('\n');
    const replacements: Array<[RegExp, string]> = [
        [/%COMPONENT_MODULE_PATH%/g, options.componentModulePath],
        [/%COMPONENT_TYPE_NAME%/g, options.componentTypeName],
        [/%EXTRA_IMPORTS%/g, extraImports],
        [/%WRAPPER_RETURN%/g, options.wrapper],
    ];
    const source = replacements.reduce(
        (source, [from, to]) => source.replace(from, to),
        content.toString()
    );
    this.callback(null, source);
};

export default loader;
