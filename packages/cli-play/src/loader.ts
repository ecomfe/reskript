import fs from 'fs';
import path from 'path';
import {LoaderContext} from 'webpack';
import {PlaySettings} from '@reskript/settings';
import {resolveConfigurationPath} from './utils/path';

const readAsSourceString = (filename: string) => {
    const content = (fs.existsSync(filename) ? fs.readFileSync(filename, 'utf-8') : '');
    // 把前后的引号去掉
    return content ? JSON.stringify(content).slice(1, -1).replace(/'/g, '\\\'') : '';
};

const generateConfigurationBlockCode = (componentModulePath: string): string => {
    const configurationPath = resolveConfigurationPath(componentModulePath);

    if (fs.existsSync(configurationPath)) {
        const content = fs.readFileSync(
            path.join(__dirname, 'assets', 'has-configuration-block.js.tpl'),
            'utf-8'
        );
        return content.replace('%CONFIGURATION_PATH%', configurationPath);
    }

    return fs.readFileSync(
        path.join(__dirname, 'assets', 'no-configuration-block.js.tpl'),
        'utf-8'
    );
};

interface LoaderOptions extends PlaySettings {
    componentTypeName: string;
    componentModulePath: string;
    cwd: string;
}

const loader = function playEntryLoader(this: LoaderContext<LoaderOptions>, content: any) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = this.getOptions();
    const extraImports = options.injectResources.map(e => `import '${e}';`).join('\n');
    const configurationFilePathRelative = path.relative(
        options.cwd,
        resolveConfigurationPath(options.componentModulePath)
    );
    const replacements: Array<[RegExp, string]> = [
        [/%PLAYGROUND_PATH%/g, path.resolve(__dirname, 'Playground')],
        [/%COMPONENT_MODULE_PATH%/g, options.componentModulePath],
        [/%COMPONENT_MODULE_PATH_RELATIVE%/g, path.relative(options.cwd, options.componentModulePath)],
        [/%CONFIGURATION_FILE_PATH%/g, configurationFilePathRelative],
        [/%CONFIGURATION_SOURCE%/g, readAsSourceString(configurationFilePathRelative)],
        [/%COMPONENT_TYPE_NAME%/g, options.componentTypeName],
        [/%EXTRA_IMPORTS%/g, extraImports],
        [/%WRAPPER_RETURN%/g, options.wrapper],
        [/%CONFIGURATION_BLOCK%/g, generateConfigurationBlockCode(options.componentModulePath)],
    ];
    const source = replacements.reduce(
        (source, [from, to]) => source.replace(from, to),
        content.toString()
    );
    this.callback(null, source);
};

export default loader;
