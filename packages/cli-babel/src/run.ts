import path from 'path';
import {promises as fs} from 'fs';
import globby from 'globby';
import rimraf from 'rimraf';
import pLimit from 'p-limit';
import highlight from 'cli-highlight';
import {transformFileAsync, TransformOptions} from '@babel/core';
import {logger} from '@reskript/core';
import {getTransformBabelConfig, BabelConfigOptions} from '@reskript/config-babel';
import {BabelCommandLineArgs} from './interface';

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
    const files = await globby(`${dir.replace(/\/$/, '')}/**/*.{js,jsx,ts,tsx}`);
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

export default async (file: string, cmd: BabelCommandLineArgs): Promise<void> => {
    if (!file) {
        return;
    }

    const outDirectory = cmd.outDir;

    if (!path.extname(file) && !outDirectory) {
        logger.error('Cannot output to terminal with directory input, please specify a single file or use --out.');
        process.exit(21);
    }

    if (outDirectory) {
        if (cmd.clean) {
            rimraf.sync(outDirectory);
        }

        await fs.mkdir(outDirectory, {recursive: true});
    }

    const babelConfigOptions: BabelConfigOptions = {
        mode: cmd.mode,
        hot: 'none',
        hostType: 'application',
        polyfill: !cmd.noPolyfill,
        modules: false,
    };
    const babelConfig: TransformOptions = {
        ...getTransformBabelConfig(babelConfigOptions),
        sourceMaps: !!outDirectory,
    };
    if (path.extname(file)) {
        if (outDirectory) {
            await transformFile(file, path.dirname(file), outDirectory, babelConfig);
        }
        else {
            const result = await transformFileAsync(file, babelConfig);
            printInConsole(result?.code);
        }
    }
    else {
        await transformDirectory(file, outDirectory, babelConfig);

        if (cmd.copy) {
            const limit = pLimit(10);
            const files = await globby([`${file}/**`, `!${file}/**/*.{ts,js,tsx,jsx}`]);
            await Promise.all(files.map(f => limit(copyFile, f, file, outDirectory)));
        }
    }
};
