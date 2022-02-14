import path from 'node:path';
import {existsSync} from 'node:fs';
import fs from 'node:fs/promises';
import {logger, importUserModule} from '@reskript/core';
import {AppEntry, ResolveOptions, TransformConfig} from './interface.js';

const ALLOWED_ENTRY_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

const CONFIG_EXTENSIONS = ['.ts', '.mjs'];

const readEntryConfig = async <C>(fileBaseName: string, transform: TransformConfig<C>): Promise<C> => {
    try {
        // `importUserModule`如果没有`defaultValue`是会抛异常的，但我们又需要返回`undefined`
        const defualtValue = {};
        const {value: imported, resolved} = await importUserModule(
            CONFIG_EXTENSIONS.map(v => fileBaseName + v),
            defualtValue
        );
        return transform(imported === defualtValue ? undefined : imported, resolved);
    }
    catch (ex) {
        const message = ex instanceof Error ? ex.message : `${ex}`;
        logger.error(`Unable to read entry configuration from ${fileBaseName}: ${message}`);
        process.exit(22);
    }
};

const resolveEntryTemplate = (file: string, defaultValue: string): string => {
    return existsSync(file) ? file : defaultValue;
};

const POSSIBLE_ENTRY_EXTENSION_REGEX = /\.[jt]sx?$/;

interface ResolveSingleOptions<C> extends ResolveOptions<C> {
    /** 是否要包含这个目录对应的入口，用在`--entries-only`之类的参数上 */
    shouldInclude: (name: string) => boolean;
}

/**
 * 处理目录类型的入口，如按照`entries/foo`去找`entries/foo/index.ts`
 *
 * @param dir 目录路径
 * @param options 相关选项
 * @returns 入口配置对象，如果没有对应的入口则返回`null`
 */
const resolveDirectoryEntry = async <C>(dir: string, options: ResolveSingleOptions<C>) => {
    const {shouldInclude, templateExtension, defaultTemplate, transformConfig} = options;
    const name = path.basename(dir);

    if (!shouldInclude(name)) {
        return null;
    }

    const possibleEntryFiles = ALLOWED_ENTRY_EXTENSIONS.map(e => path.join(dir, 'index' + e));
    const entry = possibleEntryFiles.find(existsSync);

    if (entry) {
        const config = await readEntryConfig(path.join(dir, 'index.config'), transformConfig);
        const appEntry: AppEntry<C> = {
            name,
            config,
            file: entry,
            template: resolveEntryTemplate(path.join(dir, 'index' + templateExtension), defaultTemplate),
        };
        return appEntry;
    }

    return null;
};

/**
 * 处理文件类型的入口，比如`entries/foo.ts`
 *
 * @param file 文件路径
 * @param options 相关选项
 * @returns 入口配置对象，如果没有对应的入口则返回`null`
 */
const resolveFileEntry = async <C>(file: string, options: ResolveSingleOptions<C>) => {
    const {shouldInclude, templateExtension, defaultTemplate, transformConfig} = options;
    const extension = path.extname(file);

    if (!ALLOWED_ENTRY_EXTENSIONS.includes(extension) || file.includes('.config.')) {
        return null;
    }

    const name = path.basename(file, extension);

    if (!shouldInclude(name)) {
        return null;
    }

    const base = file.replace(POSSIBLE_ENTRY_EXTENSION_REGEX, '');
    const config = await readEntryConfig(`${base}.config`, transformConfig);
    const appEntry: AppEntry<C> = {
        file,
        config,
        name: path.basename(file, extension),
        template: resolveEntryTemplate(base + templateExtension, defaultTemplate),
    };
    return appEntry;
};

/**
 * 根据输入的路径去找到入口并返回配置对象
 *
 * @param targetBase 可以是`src/entries/index.ts`这样的具体文件，也可以是`src/entries/index`这样的目录
 * @param options 相关选项
 * @returns 入口配置对象，如果没有对应的入口则返回`null`
 */
export const resolveEntry = async <C>(targetBase: string, options: ResolveSingleOptions<C>) => {
    const stat = await fs.stat(targetBase);

    return stat.isDirectory()
        ? resolveDirectoryEntry<C>(targetBase, options)
        : resolveFileEntry<C>(targetBase, options);
};
