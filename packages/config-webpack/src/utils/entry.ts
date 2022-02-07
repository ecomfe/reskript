import path from 'node:path';
import {existsSync} from 'node:fs';
import fs from 'node:fs/promises';
import {EntryObject} from 'webpack';
import {logger, importUserModule, dirFromImportMeta} from '@reskript/core';
import {AppEntry, EntryConfig} from '../interface.js';

const ALLOWED_ENTRY_KEYS = new Set(['entry', 'html']);

const ALLOWED_ENTRY_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

const CONFIG_EXTENSIONS = ['.ts', '.mjs'];

const validateEntryConfig = (config: EntryConfig, file: string) => {
    const keys = Object.keys(config);

    if (keys.some(v => !ALLOWED_ENTRY_KEYS.has(v))) {
        logger.error(`Entry configuration ${file} has invalid keys, only "entry" and "html" are allowed.`);
        process.exit(21);
    }
};

const readEntryConfig = async (fileBaseName: string): Promise<EntryConfig> => {
    try {
        const {value: config} = await importUserModule<EntryConfig>(CONFIG_EXTENSIONS.map(v => fileBaseName + v), {});
        validateEntryConfig(config, fileBaseName);
        return config;
    }
    catch (ex) {
        const message = ex instanceof Error ? ex.message : `${ex}`;
        logger.error(`Unable to read entry configuration from ${fileBaseName}: ${message}`);
        process.exit(22);
    }
};

const DEFAULT_HTML_TEMPLATE = path.resolve(dirFromImportMeta(import.meta.url), '..', 'assets', 'default-html.ejs');

const resolveEntryTemplate = (file: string): string => {
    return existsSync(file) ? file : DEFAULT_HTML_TEMPLATE;
};

const POSSIBLE_ENTRY_EXTENSION_REGEX = /\.[jt]sx?$/;

/**
 * 处理目录类型的入口，如按照`entries/foo`去找`entries/foo/index.ts`
 *
 * @param dir 目录路径
 * @param shouldInclude 是否要包含这个目录对应的入口，用在`--entries-only`之类的参数上
 * @returns 入口配置对象，如果没有对应的入口则返回`null`
 */
const resolveDirectoryEntry = async (dir: string, shouldInclude: (name: string) => boolean) => {
    const name = path.basename(dir);

    if (!shouldInclude(name)) {
        return null;
    }

    const possibleEntryFiles = ALLOWED_ENTRY_EXTENSIONS.map(e => path.join(dir, 'index' + e));
    const entry = possibleEntryFiles.find(existsSync);

    if (entry) {
        const config = await readEntryConfig(path.join(dir, 'index.config'));
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

/**
 * 处理文件类型的入口，比如`entries/foo.ts`
 *
 * @param dir 目录路径
 * @param shouldInclude 是否要包含这个目录对应的入口，用在`--entries-only`之类的参数上
 * @returns 入口配置对象，如果没有对应的入口则返回`null`
 */
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
    const config = await readEntryConfig(`${base}.config`);
    const appEntry: AppEntry = {
        file,
        config,
        name: path.basename(file, extension),
        template: resolveEntryTemplate(`${base}.ejs`),
    };
    return appEntry;
};

/**
 * 根据输入的路径去找到入口并返回配置对象
 *
 * @param targetBase 可以是`src/entries/index.ts`这样的具体文件，也可以是`src/entries/index`这样的目录
 * @param shouldInclude 是否要包含这个目录对应的入口，用在`--entries-only`之类的参数上
 * @returns 入口配置对象，如果没有对应的入口则返回`null`
 */
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
