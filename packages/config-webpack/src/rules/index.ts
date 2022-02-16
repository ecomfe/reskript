import {RuleSetRule} from 'webpack';
import {isProjectSourceIn, normalizeRuleMatch} from '@reskript/core';
import {BuildEntry} from '@reskript/settings';
import * as loaders from '../loaders/index.js';
import {introduceLoaders} from '../utils/loader.js';

type LoaderType = keyof typeof loaders;

const createUseWith = (entry: BuildEntry) => {
    return (...names: Array<LoaderType | false>) => introduceLoaders(names, entry);
};

const assetModuleConfig = (entry: BuildEntry) => {
    return {
        type: 'asset',
        parser: {
            dataUrlCondition: {
                maxSize: entry.projectSettings.build.largeAssetSize,
            },
        },
    };
};

// 在第三方代码与项目代码的处理上，使用的策略是“非`cwd`下的全部算第三方代码”，而不是“包含`node_modules`的算第三方”。
// 这一逻辑取决于在使用monorepo时的形式，当前monorepo下我们要求被引用的包是构建后的。

export const script = async (entry: BuildEntry): Promise<RuleSetRule> => {
    const {cwd, projectSettings: {build: {script: {babel}}}} = entry;
    const use = createUseWith(entry);
    const isProjectSource = isProjectSourceIn(cwd);
    const rulesWithBabelRequirement = async (requireBabel: boolean) => {
        return {
            oneOf: [
                // 在项目源码内的`*?worker`，需要`worker-loader`
                {
                    resourceQuery: /worker/,
                    use: await use('worker', requireBabel && 'babel'),
                },
                // 项目源码内的其它文件，需要`eslint`检查
                {
                    resource: isProjectSource,
                    use: await use(requireBabel && 'babel'),
                },
                // 第三方代码，按需过`babel`
                {
                    use: await use(requireBabel && 'babel'),
                },
            ],
        };
    };
    const [hasBabel, noBabel] = await Promise.all([rulesWithBabelRequirement(true), rulesWithBabelRequirement(false)]);

    return {
        test: /\.[jt]sx?$/,
        oneOf: [
            {
                resource: normalizeRuleMatch(cwd, babel),
                ...hasBabel,
            },
            noBabel,
        ],
    };
};

export const less = async (entry: BuildEntry): Promise<RuleSetRule> => {
    const {cwd, usage, projectSettings: {build: {style: {modules, extract}}}} = entry;
    const use = createUseWith(entry);
    const final = (usage === 'build' && extract) ? 'cssExtract' : 'style';
    const uses = [
        use(final, 'css', 'postcss', 'less'),
        use('classNames', final, 'cssModules', 'postcss', 'less'),
    ] as const;
    const [globalLess, less] = await Promise.all(uses);

    return {
        test: /\.less$/,
        oneOf: [
            {
                test: /\.global\.less$/,
                use: globalLess,
            },
            {
                resource: normalizeRuleMatch(cwd, modules),
                use: less,
            },
            {
                use: globalLess,
            },
        ],
    };
};

export const css = async (entry: BuildEntry): Promise<RuleSetRule> => {
    const {cwd, usage, projectSettings: {build: {style: {modules, extract}}}} = entry;
    const use = createUseWith(entry);
    const final = (usage === 'build' && extract) ? 'cssExtract' : 'style';
    const uses = [
        use(final, 'css', 'postcss'),
        use('classNames', final, 'cssModules', 'postcss'),
    ] as const;
    const [globalCss, css] = await Promise.all(uses);

    return {
        test: /\.css$/,
        oneOf: [
            {
                test: /\.global\.css$/,
                use: globalCss,
            },
            {
                resource: normalizeRuleMatch(cwd, modules),
                use: css,
            },
            {
                use: globalCss,
            },
        ],
    };
};

export const image = async (entry: BuildEntry): Promise<RuleSetRule> => {
    const use = createUseWith(entry);

    return {
        test: /\.(jpe?g|png|gif)$/i,
        use: await use('img'),
        ...assetModuleConfig(entry),
    };
};

export const svg = async (entry: BuildEntry): Promise<RuleSetRule> => {
    const {mode} = entry;
    const use = createUseWith(entry);
    const uses = [
        use('babel', 'svgToComponent', mode === 'production' && 'svgo'),
        use(mode === 'production' && 'svgo'),
    ] as const;
    const [svgComponent, svg] = await Promise.all(uses);

    return {
        test: /\.svg$/,
        oneOf: [
            {
                // 如果挂了`?react`的，就直接转成组件返回
                resourceQuery: /^\?react$/,
                use: svgComponent,
            },
            {
                resourceQuery: {
                    not: /^\?react$/,
                },
                use: svg,
                ...assetModuleConfig(entry),
            },
        ],
    };
};

export const file = async (entry: BuildEntry): Promise<RuleSetRule> => {
    return {
        test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
        ...assetModuleConfig(entry),
    };
};
