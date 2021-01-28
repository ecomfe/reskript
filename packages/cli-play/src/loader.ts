import {getOptions} from 'loader-utils';
import * as webpack from 'webpack';

interface LoaderOptions {
    componentTypeName: string;
    componentModulePath: string;
    injectResources: string[];
}

const loader: webpack.loader.Loader = function playEntryLoader(content) {
    if (this.cacheable) {
        this.cacheable();
    }

    const {componentTypeName, componentModulePath, injectResources} = getOptions(this) as unknown as LoaderOptions;
    const extraImports = injectResources.map(e => `import '${e}';`).join('\n');
    const replacements: Array<[RegExp, string]> = [
        [/%COMPONENT_MODULE_PATH%/g, componentModulePath],
        [/%COMPONENT_TYPE_NAME%/g, componentTypeName],
        [/%EXTRA_IMPORTS%/g, extraImports],
    ];
    const source = replacements.reduce(
        (source, [from, to]) => source.replace(from, to),
        content.toString()
    );
    this.callback(null, source);
};

export default loader;
