import path from 'node:path';
import {promises as fs} from 'node:fs';
import pLimit from 'p-limit';
import {highlight} from 'cli-highlight';
import {globby} from 'globby';
import babel, {TransformOptions} from '@babel/core';
import {logger, resolveDependencyVersion} from '@reskript/core';
import {getTransformBabelConfig, BabelConfigOptions} from '@reskript/config-babel';
import {BabelCommandLineArgs} from '@reskript/settings';

const {transformFileAsync} = babel;

const changeExtension = (file: string, extension: string) => {
    const normalized = path.normalize(file);
    const parsed = path.parse(normalized);
    const changed = {...parsed, base: undefined, ext: extension};
    return path.format(changed);
};

const writeFile = async (file: string, content: string) => {
    await fs.mkdir(path.dirname(file), {recursive: true});
    await fs.writeFile(file, content);
};

const transformFile = async (file: string, baseIn: string, baseOut: string, options: TransformOptions) => {
    // 定义文件不处理
    if (file.endsWith('.d.ts')) {
        return;
    }

    const result = await transformFileAsync(file, options);

    if (!result || result.code == null || result.map == null) {
        logger.error(`Failed to transform ${file}`);
        process.exit(20);
    }

    const relative = path.relative(baseIn, file);
    const destination = path.join(baseOut, changeExtension(relative, '.js'));
    const writingFiles = [
        writeFile(destination, result.code + `\n//# sourceMappingURL=${destination}.map`),
        writeFile(`${destination}.map`, JSON.stringify(result.map)),
    ];
    await Promise.all(writingFiles);
};

const transformDirectory = async (dir: string, out: string, options: TransformOptions) => {
    const files = await globby('**/*.{js,jsx,ts,tsx}', {cwd: dir, absolute: true});
    await Promise.all(files.map(f => transformFile(f, dir, out, options)));
};

const copyFile = async (file: string, baseIn: string, baseOut: string) => {
    const relative = path.relative(baseIn, file);
    const out = path.join(baseOut, relative);
    await fs.mkdir(path.dirname(out), {recursive: true});
    return fs.copyFile(file, out);
};

const printInConsole = (code: string | null | undefined) => {
    if (code == null) {
        logger.error('Transform failed');
        process.exit(20);
    }

    // eslint-disable-next-line no-console
    console.log(highlight(code, {language: 'javascript'}));
};

const coreJsVersion = async () => {
    try {
        const version = await resolveDependencyVersion('core-js', process.cwd());
        return version;
    }
    catch {
        return 3;
    }
};

export const run = async (cmd: BabelCommandLineArgs, file: string): Promise<void> => {
    if (!file) {
        return;
    }

    const {outDirectory, clean, copy, mode, polyfill, uses} = cmd;

    if (outDirectory) {
        if (clean) {
            await fs.rm(outDirectory, {recursive: true, force: true});
        }

        await fs.mkdir(outDirectory, {recursive: true});
    }

    const babelConfigOptions: BabelConfigOptions = {
        mode,
        uses,
        polyfill: polyfill ? await coreJsVersion() : false,
        hot: false,
        hostType: 'application',
        modules: false,
    };
    const babelConfig: TransformOptions = {
        ...getTransformBabelConfig(babelConfigOptions),
        sourceMaps: !!outDirectory,
        babelrc: false,
    };
    const stat = await fs.stat(file);

    if (stat.isFile()) {
        if (outDirectory) {
            await transformFile(file, path.dirname(file), outDirectory, babelConfig);
        }
        else {
            const result = await transformFileAsync(file, babelConfig);
            printInConsole(result?.code);
        }
    }
    else {
        if (!outDirectory) {
            logger.error('Cannot output to terminal with directory input, specify a single file or use --out-dir.');
            process.exit(21);
        }

        await transformDirectory(file, outDirectory, babelConfig);

        if (copy) {
            const files = await globby(['**', '!**/*.{ts,js,tsx,jsx}'], {cwd: file, absolute: true});
            const limit = pLimit(2);
            await Promise.all(files.map(v => limit(copyFile, v, file, outDirectory)));
        }
    }
};
