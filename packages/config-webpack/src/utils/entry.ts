import path from 'path';
import fs from 'fs';
import {EntryObject} from 'webpack';
import {AppEntry, EntryConfig} from '../interface';

const EMPTY_ENTRY_CONFIG: Required<EntryConfig> = {
    entry: {},
    html: {},
};

const ENTRY_CONFIG_KEYS = Object.keys(EMPTY_ENTRY_CONFIG);

const isLegacyConfig = (config: any): config is Record<string, any> => {
    return ENTRY_CONFIG_KEYS.every(k => config[k] === undefined);
};

export const readEntryConfig = (name: string, dir: string): EntryConfig => {
    try {
        // eslint-disable-next-line global-require
        const config = require(path.join(dir, name + '.config')) as Record<string, any>;
        return isLegacyConfig(config) ? {html: config} : config;
    }
    catch (ex) {
        return {};
    }
};

const DEFAULT_HTML_TEMPLATE = path.resolve(__dirname, '..', 'assets', 'default-html.ejs');

export const resolveEntryTemplate = (name: string, dir: string): string => {
    const filename = path.join(dir, name + '.ejs');

    return fs.existsSync(filename) ? filename : DEFAULT_HTML_TEMPLATE;
};

export const convertToWebpackEntry = ({file, config}: AppEntry): EntryObject[string] => {
    if (config.entry) {
        return {
            import: file,
            ...config.entry,
        };
    }

    return file;
};
