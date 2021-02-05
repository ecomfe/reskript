import {getOptions} from 'loader-utils';
import {PlaySettings} from '@reskript/settings';
import * as webpack from 'webpack';

interface LoaderOptions extends PlaySettings {
    componentTypeName: string;
    componentModulePath: string;
}

const loader: webpack.loader.Loader = function playEntryLoader(content) {
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
