import path from 'node:path';
import {existsSync} from 'node:fs';
import fs from 'node:fs/promises';
import {LoaderContext} from 'webpack';
import {dirFromImportMeta} from '@reskript/core';
import {PlaySettings} from '@reskript/settings';
import {resolveLocalConfigurationPath} from './utils/path.js';

const currentDirectory = dirFromImportMeta(import.meta.url);

const readAsSourceString = async (filename: string | undefined): Promise<string> => {
    if (!filename) {
        return '';
    }

    const content = await fs.readFile(filename, 'utf-8');
    // 把前后的引号去掉
    return content ? JSON.stringify(content).slice(1, -1).replace(/'/g, '\\\'') : '';
};

const configurationBlockCode = async (name: string, modulePath: string | undefined): Promise<string> => {
    if (modulePath && existsSync(modulePath)) {
        const content = await fs.readFile(
            path.join(currentDirectory, 'assets', 'configuration-block.js.tpl'),
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

export default async function playEntryLoader(this: LoaderContext<LoaderOptions>, content: any) {
    if (this.cacheable) {
        this.cacheable();
    }

    const callback = this.async();

    const options = this.getOptions();
    const configurationFilePath = resolveLocalConfigurationPath(options.componentModulePath);
    const readingSources = [
        readAsSourceString(configurationFilePath),
        fs.readFile(path.join(currentDirectory, 'assets', 'configuration-initialize.js.tpl'), 'utf-8'),
        configurationBlockCode('globalConfiguration', options.globalSetupModulePath),
        configurationBlockCode('localConfiguration', resolveLocalConfigurationPath(options.componentModulePath)),
    ] as const;
    const [
        configurationSource,
        configurationInitializeCode,
        globalConfigurationBlock,
        localConfigurationBlock,
    ] = await Promise.all(readingSources);
    const replacements: Array<[RegExp, string]> = [
        [/%PLAYGROUND_PATH%/g, path.resolve(currentDirectory, 'Playground')],
        [/%COMPONENT_MODULE_PATH%/g, options.componentModulePath],
        [/%COMPONENT_MODULE_PATH_RELATIVE%/g, path.relative(options.cwd, options.componentModulePath)],
        [/%CONFIGURATION_SOURCE%/g, configurationSource],
        [/%COMPONENT_TYPE_NAME%/g, options.componentTypeName],
        [/%CONFIGURATION_INITIALIZE_BLOCK%/g, configurationInitializeCode],
        [/%GLOBAL_CONFIGURATION_BLOCK%/g, globalConfigurationBlock],
        [/%LOCAL_CONFIGURATION_BLOCK%/g, localConfigurationBlock],
    ];
    const source = replacements.reduce(
        (source, [from, to]) => source.replace(from, to),
        content.toString()
    );
    callback(null, source);
}
