import path from 'path';
import {existsSync} from 'fs';
import * as crypto from 'crypto';
import fs from 'fs/promises';
import {map} from 'ramda';
import {compact, dirFromImportMeta, resolveSync, findGitRoot, pMap} from '@reskript/core';
import {paramCase} from 'change-case';
import webpack, {EntryObject} from 'webpack';
// @ts-expect-error
import resolveTypeScriptPluginExports from 'resolve-typescript-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import InterpolateHTMLPlugin from '@reskript/webpack-plugin-interpolate-html';
import {getScriptLintBaseConfig, getStyleLintBaseConfig} from '@reskript/config-lint';
import {ConfigurationFactory, BuildContext} from '../interface.js';
import {createHTMLPluginInstances} from '../utils/html.js';
import {convertToWebpackEntry} from '../utils/entry.js';
import * as rules from '../rules/index.js';

const {default: ResolveTypeScriptPlugin} = resolveTypeScriptPluginExports;

const {DefinePlugin, ContextReplacementPlugin} = webpack;

const toDefines = (context: Record<string, any>, prefix: string): Record<string, string> => {
    const entries = Object.entries(context);
    const defines = entries.map(([key, value]) => [prefix + '.' + key, JSON.stringify(value)]);
    return defines.reduce((output, [key, value]) => Object.assign(output, {[key]: value}), {});
};

const readFileIfExists = async (filename: string) => {
    if (existsSync(filename)) {
        const buffer = await fs.readFile(filename);
        return buffer;
    }

    return Buffer.from('');
};

const updateHashFromFile = async (hash: crypto.Hash, filename: string) => {
    if (existsSync(filename)) {
        const buffer = await fs.readFile(filename);
        hash.update(buffer);
    }
};

const computeCacheKey = async (entry: BuildContext): Promise<string> => {
    const hash = crypto.createHash('sha1');
    hash.update(entry.usage);
    hash.update(entry.mode);
    hash.update(entry.hostPackageName);
    hash.update(entry.cwd);
    // `reSKRipt`自己的版本信息等
    await updateHashFromFile(hash, path.join(dirFromImportMeta(import.meta.url), '..', '..', 'package.json'));

    const settingsLocation = path.join(entry.cwd, 'reskript.config.js');
    if (existsSync(settingsLocation)) {
        const buffer = await fs.readFile(settingsLocation);
        hash.update(buffer);
    }
    else {
        hash.update(JSON.stringify(entry.projectSettings));
        hash.update(entry.projectSettings.build.script.finalize.toString());
        hash.update(entry.projectSettings.build.finalize.toString());
        if (entry.usage === 'devServer') {
            hash.update(entry.projectSettings.devServer.finalize.toString());
        }
    }

    const gitRoot = await findGitRoot(entry.cwd) ?? entry.cwd;
    const hashIncludes = [
        path.join(gitRoot, 'node_modules', '.yarn-integrity'),
        path.join(gitRoot, 'package-lock.json'),
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

const toDynamicDefines = (context: Record<string, any>, prefix: string): Record<string, any> => {
    const staticDefines = toDefines(context, prefix);
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
    const buildInfo = {
        mode,
        version: buildVersion,
        target: buildTarget,
        time: buildTime,
    };
    const defines = {
        ...toDynamicDefines(process.env, 'process.env'),
        ...toDynamicDefines(features, '$features'),
        ...toDynamicDefines(buildInfo, '$build'),
    };
    const eslintOptions = {
        eslintPath: resolveSync('eslint'),
        baseConfig: getScriptLintBaseConfig({cwd}),
        exclude: ['node_modules', 'externals'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        emitError: true,
        emitWarning: usage === 'devServer',
    };
    const styleLintOptions = {
        config: getStyleLintBaseConfig({cwd}),
        emitErrors: true,
        allowEmptyInput: true,
        failOnError: mode === 'production',
        files: `${srcDirectory}/**/*.{css,less}`,
    };
    const htmlPlugins = thirdParty ? [] : createHTMLPluginInstances(entry);
    const cssOutput = thirdParty ? 'index.css' : '[name].[contenthash].css';
    const plugins = [
        ...htmlPlugins,
        (usage === 'build' && extract) && new MiniCssExtractPlugin({filename: cssOutput}),
        new ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en|zh-cn)$/),
        new DefinePlugin(defines),
        new InterpolateHTMLPlugin(process.env),
        // @ts-expect-error
        reportLintErrors && usage === 'build' && new ESLintPlugin(eslintOptions),
        // @ts-expect-error
        reportLintErrors && usage === 'build' && new StyleLintPlugin(styleLintOptions),
    ];
    const cacheKey = await computeCacheKey(entry);

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
            path: path.join(cwd, 'dist', 'assets'),
            filename: '[name].[chunkhash].js',
            publicPath: publicPath || '/assets/',
        },
        module: {
            rules: Object.values(rules).map(rule => rule(entry)),
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
            mainFields: ['browser', 'module', 'main'],
            alias: {
                '@': path.join(cwd, srcDirectory),
                ...hostPackageName ? {[hostPackageName]: path.join(cwd, 'src')} : {},
                'regenerator-runtime': path.dirname(resolveSync('regenerator-runtime')),
            },
            plugins: [
                new ResolveTypeScriptPlugin(),
            ],
        },
        cache: cache === 'off'
            ? false
            : (
                cache === 'persist'
                    ? {
                        type: 'filesystem',
                        version: cacheKey,
                        cacheDirectory: cacheDirectory ? path.join(cwd, cacheDirectory) : undefined,
                        name: `${paramCase(entry.usage)}-${paramCase(entry.mode)}`,
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
