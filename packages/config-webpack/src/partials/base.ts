import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import {sync as resolve} from 'resolve';
import {compact, mapValues} from 'lodash';
import {paramCase} from 'change-case';
import {DefinePlugin, ContextReplacementPlugin} from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import {findGitRoot} from '@reskript/core';
import {getScriptLintConfig, getStyleLintConfig} from '@reskript/config-lint';
import {ConfigurationFactory, BuildContext} from '../interface';
import {createHTMLPluginInstances} from '../utils';
import * as rules from '../rules';

const toDefines = (context: Record<string, any>, prefix: string): Record<string, string> => {
    const entries = Object.entries(context);
    const defines = entries.map(([key, value]) => [prefix + '.' + key, JSON.stringify(value)]);
    return defines.reduce((output, [key, value]) => Object.assign(output, {[key]: value}), {});
};

const updateHashFromFile = (hash: crypto.Hash, filename: string) => {
    if (fs.existsSync(filename)) {
        hash.update(fs.readFileSync(filename));
    }
};

const computeCacheKey = (entry: BuildContext): string => {
    const hash = crypto.createHash('sha1');
    hash.update(entry.usage);
    hash.update(entry.mode);
    hash.update(entry.hostPackageName);
    hash.update(entry.cwd);
    updateHashFromFile(hash, path.join(__dirname, '..', '..', 'package.json'));

    const settingsLocation = path.join(entry.cwd, 'reskript.config.js');
    if (fs.existsSync(settingsLocation)) {
        hash.update(fs.readFileSync(settingsLocation));
    }
    else {
        hash.update(JSON.stringify(entry.projectSettings));
        hash.update(entry.projectSettings.build.script.finalize.toString());
        hash.update(entry.projectSettings.build.finalize.toString());
        if (entry.usage === 'devServer') {
            hash.update(entry.projectSettings.devServer.finalize.toString());
        }
    }

    const gitRoot = findGitRoot(entry.cwd) ?? entry.cwd;
    updateHashFromFile(hash, path.join(gitRoot, 'node_modules', '.yarn-integrity'));
    updateHashFromFile(hash, path.join(gitRoot, 'package-lock.json'));
    // `package.json`里可能会有`browsers`之类的配置，所以不能只认lock文件
    updateHashFromFile(hash, path.join(gitRoot, '.package.json'));
    updateHashFromFile(hash, path.join(gitRoot, '.browserslistrc'));
    const key = hash.digest('hex');
    return key;
};

const toDynamicDefines = (context: Record<string, any>, prefix: string): Record<string, any> => {
    const staticDefines = toDefines(context, prefix);
    return mapValues(staticDefines, v => DefinePlugin.runtimeValue(() => v, true));
};

// eslint-disable-next-line complexity
const factory: ConfigurationFactory = entry => {
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
        cache = true,
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
        eslintPath: resolve('eslint'),
        baseConfig: getScriptLintConfig(),
        exclude: ['node_modules', 'externals'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        emitError: true,
        emitWarning: usage === 'devServer',
    };
    const styleLintOptions = {
        config: getStyleLintConfig(),
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
        // TODO: https://github.com/webpack/webpack/pull/11698
        new CaseSensitivePathsPlugin() as any,
        new ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en|zh-cn)$/),
        new DefinePlugin(defines),
        reportLintErrors && usage === 'build' && new ESLintPlugin(eslintOptions),
        reportLintErrors && usage === 'build' && new StyleLintPlugin(styleLintOptions),
    ];

    return {
        mode,
        context: cwd,
        entry: entries.reduce((entry, {name, file}) => ({...entry, [name]: file}), {}),
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
                // 要对babel转的里面的`$internal/core-js`固定到自带的`core-js@3`，这里不能强行把所有的`core-js`固定，
                // 第三方代码比如`antd`里面有用于`babel-runtime`进一步引用`core-js@2`，所以全固定到`3.x`会死
                '$internal/core-js': path.dirname(resolve('core-js')),
                'regenerator-runtime': path.dirname(resolve('regenerator-runtime')),
            },
        },
        cache: cache
            ? {
                type: 'filesystem',
                version: computeCacheKey(entry),
                name: `${paramCase(entry.usage)}-${paramCase(entry.mode)}`,
            }
            : false,
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
