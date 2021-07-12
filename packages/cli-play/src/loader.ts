import path from 'path';
import {LoaderContext} from 'webpack';
import {PlaySettings} from '@reskript/settings';

interface LoaderOptions extends PlaySettings {
    componentTypeName: string;
    componentModulePath: string;
}

const loader = function playEntryLoader(this: LoaderContext<LoaderOptions>, content: any) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = this.getOptions();
    const extraImports = options.injectResources.map(e => `import '${e}';`).join('\n');
    const replacements: Array<[RegExp, string]> = [
        [/%PLAYGROUND_PATH%/g, path.resolve(__dirname, 'Playground')],
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
