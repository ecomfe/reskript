import path from 'node:path';
import {existsSync} from 'node:fs';
import fs from 'node:fs/promises';
import {dirFromImportMeta} from '@reskript/core';
import {resolveLocalConfigurationPath} from '../utils/path.js';

const rootDirectory = path.resolve(dirFromImportMeta(import.meta.url), '..');

export const resolveEntryPath = (enableConcurrentMode: boolean) => {
    return enableConcurrentMode
        ? path.join(rootDirectory, 'assets', 'playground-entry-cm.js.tpl')
        : path.join(rootDirectory, 'assets', 'playground-entry.js.tpl');
};

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
            path.join(rootDirectory, 'assets', 'configuration-block.js.tpl'),
            'utf-8'
        );
        return content.replace(/%MODULE_NAME%/g, name).replace('%CONFIGURATION_PATH%', modulePath);
    }

    return '';
};

export interface BuildEntryOptions {
    componentTypeName: string;
    componentModulePath: string;
    globalSetupModulePath: string | undefined;
    cwd: string;
}

export const buildEntryScript = async (content: string, options: BuildEntryOptions) => {
    const configurationFilePath = resolveLocalConfigurationPath(options.componentModulePath);
    const readingSources = [
        readAsSourceString(configurationFilePath),
        fs.readFile(path.join(rootDirectory, 'assets', 'configuration-initialize.js.tpl'), 'utf-8'),
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
        [/%PLAYGROUND_PATH%/g, path.resolve(rootDirectory, 'Playground')],
        [/%STYLE_PATH%/g, path.resolve(rootDirectory, 'Playground', 'style.css')],
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
        content
    );
    return source;
};
