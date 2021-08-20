import path from 'path';
import {existsSync} from 'fs';
import fs from 'fs/promises';
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

const readEntryConfig = async (file: string): Promise<EntryConfig> => {
    try {
        const config: Record<string, any> = await import(path.join(file));
        // DEPRECATED: 2.0只支持新版
        return isLegacyConfig(config) ? {html: config} : config;
    }
    catch (ex) {
        return {};
    }
};

const DEFAULT_HTML_TEMPLATE = path.resolve(__dirname, '..', 'assets', 'default-html.ejs');

const resolveEntryTemplate = (file: string): string => {
    return existsSync(file) ? file : DEFAULT_HTML_TEMPLATE;
};

const POSSIBLE_ENTRY_EXTENSION_REGEX = /\.[jt]sx?$/;

const ALLOWED_ENTRY_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

const resolveDirectoryEntry = async (dir: string, shouldInclude: (name: string) => boolean) => {
    const name = path.basename(dir);

    if (!shouldInclude(name)) {
        return null;
    }

    const possibleEntryFiles = ALLOWED_ENTRY_EXTENSIONS.map(e => path.join(dir, 'index' + e));
    const entry = possibleEntryFiles.find(existsSync);
    if (entry) {
        const config = await readEntryConfig(path.join(dir, 'index.config.js'));
        const appEntry: AppEntry = {
            name,
            config,
            file: entry,
            template: resolveEntryTemplate(path.join(dir, 'index.ejs')),
        };
        return appEntry;
    }

    return null;
};

const resolveFileEntry = async (file: string, shouldInclude: (name: string) => boolean) => {
    const extension = path.extname(file);

    if (!ALLOWED_ENTRY_EXTENSIONS.includes(extension) || file.includes('.config.')) {
        return null;
    }

    const name = path.basename(file, extension);

    if (!shouldInclude(name)) {
        return null;
    }

    const base = file.replace(POSSIBLE_ENTRY_EXTENSION_REGEX, '');
    const config = await readEntryConfig(`${base}.config.js`);
    const appEntry: AppEntry = {
        file,
        config,
        name: path.basename(file, extension),
        template: resolveEntryTemplate(`${base}.ejs`),
    };
    return appEntry;
};

// `targetBase`可以是`src/entries/index.js`这样的具体文件，也可以是`src/entries/index`这样的目录
export const resolveEntry = async (targetBase: string, shouldInclude: (name: string) => boolean) => {
    const stat = await fs.stat(targetBase);

    return stat.isDirectory()
        ? resolveDirectoryEntry(targetBase, shouldInclude)
        : resolveFileEntry(targetBase, shouldInclude);
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
