import fs from 'fs';
import path from 'path';
import {LoaderContext} from 'webpack';
import {PlaySettings} from '@reskript/settings';
import {resolveLocalConfigurationPath} from './utils/path';

const readAsSourceString = (filename: string) => {
    const content = (fs.existsSync(filename) ? fs.readFileSync(filename, 'utf-8') : '');
    // 把前后的引号去掉
    return content ? JSON.stringify(content).slice(1, -1).replace(/'/g, '\\\'') : '';
};

const configurationBlockCode = (name: string, modulePath: string | undefined): string => {
    if (modulePath && fs.existsSync(modulePath)) {
        const content = fs.readFileSync(
            path.join(__dirname, 'assets', 'configuration-block.js.tpl'),
            'utf-8'
        );
        return content.replace(/%MODULE_NAME%/g, name).replace('%CONFIGURATION_PATH%', modulePath);
    }

    return '';
};

interface LoaderOptions extends PlaySettings {
    componentTypeName: string;
    componentModulePath: string;
    globalSetupModulePath: string | undefined;
    cwd: string;
}

const loader = function playEntryLoader(this: LoaderContext<LoaderOptions>, content: any) {
    if (this.cacheable) {
        this.cacheable();
    }

    // TODO: 搞成异步的
    const options = this.getOptions();
    const configurationFilePathRelative = path.relative(
        options.cwd,
        resolveLocalConfigurationPath(options.componentModulePath)
    );
    const replacements: Array<[RegExp, string]> = [
        [/%PLAYGROUND_PATH%/g, path.resolve(__dirname, 'Playground')],
        [/%COMPONENT_MODULE_PATH%/g, options.componentModulePath],
        [/%COMPONENT_MODULE_PATH_RELATIVE%/g, path.relative(options.cwd, options.componentModulePath)],
        [/%CONFIGURATION_FILE_PATH%/g, configurationFilePathRelative],
        [/%CONFIGURATION_SOURCE%/g, readAsSourceString(configurationFilePathRelative)],
        [/%COMPONENT_TYPE_NAME%/g, options.componentTypeName],
        [
            /%CONFIGURATION_INITIALIZE_BLOCK%/g,
            fs.readFileSync(path.join(__dirname, 'assets', 'configuration-initialize.js.tpl'), 'utf-8'),
        ],
        [/%GLOBAL_CONFIGURATION_BLOCK%/g, configurationBlockCode('globalConfiguration', options.globalSetupModulePath)],
        [
            /%LOCAL_CONFIGURATION_BLOCK%/g,
            configurationBlockCode('localConfiguration', resolveLocalConfigurationPath(options.componentModulePath)),
        ],
    ];
    const source = replacements.reduce(
        (source, [from, to]) => source.replace(from, to),
        content.toString()
    );
    this.callback(null, source);
};

export default loader;
