import * as path from 'path';
import * as fs from 'fs';
import {execSync} from 'child_process';
import {get, isEqual} from 'lodash';
import chalk from 'chalk';
import {mergeWithCustomize, customizeArray, customizeObject} from 'webpack-merge';
import HtmlWebpackPlugin, {Options as HTMLOptions} from 'html-webpack-plugin';
import {FeatureMatrix, BuildEntry} from '@reskript/settings';
import {AppEntry, BuildContext} from './interface';

const builtinStrategy = {
    customizeArray: customizeArray({'module.rules': 'append' as any}),
    customizeObject: customizeObject({'resolve.alias': 'prepend' as any}),
};
export const mergeBuiltin = mergeWithCustomize(builtinStrategy);

export const revision = (): string => {
    try {
        return execSync('git rev-parse --short HEAD', {stdio: 'pipe'}).toString().trim();
    }
    catch (ex) {
        console.log('Not a git repository, fallback to default revision');
        return '0000000';
    }
};

const toStringTag = Object.prototype.toString;

const getSchema = (obj: {[key: string]: any}): Array<[string, string]> => {
    const entries = Object.entries(obj);
    entries.sort(([keyX], [keyY]) => keyX.localeCompare(keyY));

    return entries.map(([key, value]) => [key, toStringTag.call(value)] as [string, string]);
};

export const checkFeatureMatrixSchema = (features: FeatureMatrix): void => {
    const featurePairs = Object.entries(features);
    // 计算每一个feature的结构是不是一样，如果有结构不一样的，则直接报错退出
    const baseSchema = getSchema(featurePairs[0][1]);
    const conflicts = featurePairs.slice(1).reduce(
        (errors, [key, value]) => {
            const currentSchema = getSchema(value);

            if (!isEqual(baseSchema, currentSchema)) {
                return [...errors, key];
            }

            return errors;
        },
        [] as string[]
    );

    if (conflicts.length > 0) {
        console.error(`Build target ${conflicts.join(' & ')} have incompatible feature schema`);
        process.exit(1);
    }
};

export const checkPreCommitHookWhenLintDisabled = (cwd: string): void => {
    const packageConfig = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));

    if (!get(packageConfig, ['husky', 'hooks', 'pre-commit'])) {
        const warning = fs.readFileSync(path.join(__dirname, 'assets/lint-disabled-warning.txt'), 'utf-8');
        console.warn(chalk.yellowBright(warning));
        process.exit(1);
    }
};

const getHTMLConfig = (filename: string, entry: AppEntry, env: BuildEntry): HTMLOptions => {
    const {
        mode,
        projectSettings: {
            build: {
                appTitle,
                favicon,
            },
        },
        buildVersion,
        buildTime,
        buildTarget,
    } = env;
    const {name, config, template} = entry;
    const buildIdentifier = `${buildVersion}/${buildTarget}@${buildTime}`;

    const baseConfig = {
        favicon,
        filename,
        mode,
        buildVersion,
        buildTime,
        buildTarget,
        buildIdentifier,
        title: appTitle,
        meta: {
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
            'app-version': buildIdentifier,
        },
        chunks: [name],
        minify: {
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
        },
        ...config,
    };

    return template ? Object.assign(baseConfig, {template}) : baseConfig;
};

const createHTMLPluginWith = (buildEntry: BuildEntry) => {
    const {usage} = buildEntry;

    return (suffix: string) => (entry: AppEntry): HtmlWebpackPlugin => {

        // 在build的时候，因为静态资源是放在`assets`下，这也是`output`配置项的值，所以HTML要放到外面一层，即`../`下，
        // 不过在调试的时候，启动`webpack-dev-server`没有这个情况，所以又不需要`../`
        const filename = (usage === 'build' ? '../' : '') + `${entry.name}${suffix}.html`;
        const pluginConfig = getHTMLConfig(filename, entry, buildEntry);
        return new HtmlWebpackPlugin(pluginConfig);
    };
};

export const createHTMLPluginInstances = (buildContext: BuildContext): HtmlWebpackPlugin[] => {
    const {isDefaultTarget, buildTarget, entries} = buildContext;
    const createInstanceWithSuffix = createHTMLPluginWith(buildContext);
    const pluginsWithinTarget = entries.map(createInstanceWithSuffix('-' + buildTarget));
    const pluginsOfDefault = isDefaultTarget
        ? entries.map(createInstanceWithSuffix(''))
        : [];

    return [...pluginsWithinTarget, ...pluginsOfDefault];
};
