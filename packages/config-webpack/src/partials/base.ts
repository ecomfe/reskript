import path from 'node:path';
import {existsSync} from 'node:fs';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import {map} from 'ramda';
import {compact, dirFromImportMeta, resolve, findGitRoot, pMap} from '@reskript/core';
import {kebabCase} from 'change-case';
import webpack, {EntryObject} from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import InterpolateHTMLPlugin from '@reskript/webpack-plugin-interpolate-html';
import {constructDefines, DefineContext} from '@reskript/build-utils';
import {getScriptLintBaseConfig, getStyleLintBaseConfig} from '@reskript/config-lint';
import {ConfigurationFactory, BuildContext} from '../interface.js';
import {createHtmlPluginInstances, createTransformHtmlPluginInstance} from '../utils/html.js';
import {convertToWebpackEntry} from '../utils/entry.js';
import * as rules from '../rules/index.js';

const {DefinePlugin, ContextReplacementPlugin} = webpack;

const readFileIfExists = async (filename: string) => {
    if (existsSync(filename)) {
        const buffer = await fs.readFile(filename);
        return buffer;
    }

    return Buffer.from('');
};

const updateHashFromFile = async (hash: crypto.Hash, filename: string): Promise<boolean> => {
    if (existsSync(filename)) {
        const buffer = await fs.readFile(filename);
        hash.update(buffer);
        return true;
    }

    return false;
};

const computeCacheKey = async (entry: BuildContext): Promise<string> => {
    const hash = crypto.createHash('sha1');
    hash.update(entry.usage);
    hash.update(entry.mode);
    hash.update(entry.hostPackageName);
    hash.update(entry.cwd);
    // `reSKRipt`自己的版本信息等
    await updateHashFromFile(hash, path.join(dirFromImportMeta(import.meta.url), '..', '..', 'package.json'));

    if (entry.projectSettings.from) {
        hash.update(entry.projectSettings.from);
        await updateHashFromFile(hash, entry.projectSettings.from);
    }
    else {
        hash.update(JSON.stringify(entry.projectSettings));
        hash.update(entry.projectSettings.build.script.finalize.toString());
        hash.update(entry.projectSettings.build.finalize.toString());
        if (entry.usage === 'devServer') {
            hash.update(entry.projectSettings.devServer.customizeMiddleware.toString());
            hash.update(entry.projectSettings.devServer.finalize.toString());
        }
    }

    const gitRoot = await findGitRoot(entry.cwd) ?? entry.cwd;
    const hashIncludes = [
        path.join(gitRoot, 'package-lock.json'),
        path.join(gitRoot, 'yarn.lock'),
        path.join(gitRoot, 'pnpm-lock.yaml'),
        // `package.json`里可能会有`browsers`之类的配置，所以不能只认lock文件
        path.join(gitRoot, 'package.json'),
        path.join(gitRoot, '.browserslistrc'),
    ];
    const hashParts = await pMap(hashIncludes, readFileIfExists);
    for (const part of hashParts) {
        hash.update(part);
    }
    const key = hash.digest('hex');
    return key;
};

const constructDynamicDefines = (context: DefineContext): Record<string, any> => {
    const staticDefines = constructDefines(context);
    return map(v => DefinePlugin.runtimeValue(() => v, true), staticDefines);
};

// eslint-disable-next-line complexity
const factory: ConfigurationFactory = async entry => {
    const {
        usage,
        cwd,
        srcDirectory,
        hostPackageName,
        mode,
        features,
        buildTarget,
        buildVersion,
        buildTime,
        entries,
        cache = 'persist',
        cacheDirectory,
        projectSettings: {
            build: {
                publicPath,
                thirdParty,
                reportLintErrors,
                style: {
                    extract,
                },
            },
        },
    } = entry;
    const tasks = [
        computeCacheKey(entry),
        Promise.all(Object.values(rules).map(rule => rule(entry))),
        resolve('eslint'),
        resolve('stylelint'),
        resolve('regenerator-runtime'),
    ] as const;
    const [cacheKey, moduleRules, eslintPath, stylelintPath, regeneratorRuntimePath] = await Promise.all(tasks);
    const defines: DefineContext = {
        features,
        mode,
        buildVersion,
        buildTarget,
        buildTime,
        env: process.env,
    };
    const eslintOptions = {
        eslintPath,
        baseConfig: getScriptLintBaseConfig({cwd}),
        exclude: ['node_modules', 'externals'],
        extensions: ['js', 'cjs', 'mjs', 'jsx', 'ts', 'tsx'],
        emitError: true,
        emitWarning: usage === 'devServer',
    };
    const styleLintOptions = {
        stylelintPath,
        config: getStyleLintBaseConfig({cwd}),
        emitErrors: true,
        allowEmptyInput: true,
        failOnError: mode === 'production',
        files: `${srcDirectory}/**/*.{css,less}`,
    };
    const htmlPlugins = thirdParty ? [] : createHtmlPluginInstances(entry);
    const cssOutput = thirdParty ? 'assets/index.css' : 'assets/[name].[contenthash].css';
    const plugins = [
        ...htmlPlugins,
        createTransformHtmlPluginInstance(entry),
        (usage === 'build' && extract) && new MiniCssExtractPlugin({filename: cssOutput}),
        new ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en|zh-cn)$/),
        new DefinePlugin(constructDynamicDefines(defines)),
        new InterpolateHTMLPlugin(process.env),
        reportLintErrors && usage === 'build' && new ESLintPlugin(eslintOptions),
        reportLintErrors && usage === 'build' && new StyleLintPlugin(styleLintOptions),
    ];

    return {
        mode,
        context: cwd,
        entry: entries.reduce(
            (webpackEntry, appEntry) => {
                const currentWebpackEntry = convertToWebpackEntry(appEntry);
                webpackEntry[appEntry.name] = currentWebpackEntry;
                return webpackEntry;
            },
            {} as EntryObject
        ),
        output: {
            path: path.join(cwd, 'dist'),
            filename: 'assets/[name].[chunkhash].js',
            assetModuleFilename: 'assets/[hash][ext]',
            publicPath: publicPath || '/',
        },
        module: {
            rules: moduleRules,
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            mainFields: ['browser', 'module', 'main'],
            alias: {
                '@': path.join(cwd, srcDirectory),
                ...hostPackageName ? {[hostPackageName]: path.join(cwd, 'src')} : {},
                'regenerator-runtime': path.dirname(regeneratorRuntimePath),
            },
            extensionAlias: {
                '.js': ['.ts', '.js', '.jsx', '.tsx'],
                '.mjs': ['.mts', '.mjs', '.mtsx', '.mjsx'],
                '.cjs': ['.cts', '.cjs', '.ctsx', '.cjsx'],
            },
        },
        cache: cache === 'off'
            ? false
            : (
                cache === 'persist'
                    ? {
                        type: 'filesystem',
                        version: cacheKey,
                        cacheDirectory: cacheDirectory ? path.join(cwd, cacheDirectory) : undefined,
                        name: `${kebabCase(entry.usage)}-${kebabCase(entry.mode)}`,
                    }
                    : {type: 'memory'}
            ),
        snapshot: {
            module: {
                timestamp: usage !== 'build',
                hash: usage === 'build',
            },
            resolve: {
                timestamp: usage !== 'build',
                hash: usage === 'build',
            },
        },
        plugins: compact(plugins),
        optimization: {},
    };
};

export default factory;
