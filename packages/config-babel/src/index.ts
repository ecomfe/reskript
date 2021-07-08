import {compact} from 'lodash';
import {sync as resolve} from 'resolve';
import {PluginItem, TransformOptions} from '@babel/core';
import {WorkMode} from '@reskript/core';
import {ThirdPartyUse} from '@reskript/settings';

export interface BabelConfigOptions {
    readonly uses?: ThirdPartyUse[];
    readonly mode?: WorkMode;
    readonly hot?: 'none' | 'simple' | 'all';
    readonly hostType?: 'application' | 'library';
    readonly polyfill?: boolean;
    readonly modules?: false | 'commonjs';
    readonly defaultImportOptimization?: boolean;
    readonly displayName?: boolean | 'auto';
}

const DEFAULT_USES: BabelConfigOptions['uses'] = ['antd', 'lodash'];

const shouldEnable = (library: ThirdPartyUse, config: BabelConfigOptions['uses'] = DEFAULT_USES) => {
    return config.includes(library);
};

// https://github.com/babel/babel/issues/10379#issuecomment-527077992
const coreJSPreset = () => {
    return {
        plugins: [
            [
                resolve('@reskript/babel-plugin-resolve-core-js'),
                {
                    replacementName: '$internal/core-js',
                },
            ],
        ],
    };
};

export const getParseOnlyBabelConfig = (options: BabelConfigOptions = {}): TransformOptions => {
    const {polyfill = false, modules = false} = options;
    const presets: Array<PluginItem | false> = [
        [
            resolve('@babel/preset-env'),
            {
                modules,
                bugfixes: true,
                debug: false,
                useBuiltIns: polyfill ? 'usage' : false,
                corejs: polyfill ? {version: 3, proposals: true} : undefined,
            },
        ],
        resolve('@babel/preset-typescript'),
        [
            resolve('@babel/preset-react'),
            {
                runtime: 'automatic',
            },
        ],
    ];
    const plugins: PluginItem[] = [
        [resolve('@babel/plugin-proposal-decorators'), {legacy: true}],
        resolve('@babel/plugin-proposal-class-properties'),
        resolve('@babel/plugin-proposal-do-expressions'),
        // export Foo from './Foo';
        resolve('@babel/plugin-proposal-export-default-from'),
        // export {Foo} from './Foo';
        resolve('@babel/plugin-proposal-export-namespace-from'),
        // const foo = obejct.foo ?? 'default';
        resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        // 1_234_567
        resolve('@babel/plugin-proposal-numeric-separator'),
        // object?.foo?.bar
        resolve('@babel/plugin-proposal-optional-chaining'),
        // const result = array |> unique |> compact |> flatten
        [resolve('@babel/plugin-proposal-pipeline-operator'), {proposal: 'minimal'}],
        // const valid = input.isValid() || throw new Error('Invalid')
        resolve('@babel/plugin-proposal-throw-expressions'),
        resolve('@babel/plugin-syntax-dynamic-import'),
        resolve('@babel/plugin-syntax-import-meta'),
    ];

    return {
        plugins,
        presets: compact(presets),
    };
};

const requireAntdOptimization = (options: BabelConfigOptions) => {
    const {uses, defaultImportOptimization = true} = options;
    return defaultImportOptimization && shouldEnable('antd', uses);
};

const requireLodashOptimization = (options: BabelConfigOptions) => {
    const {uses, mode = 'development', defaultImportOptimization = true} = options;
    return defaultImportOptimization && shouldEnable('lodash', uses) && mode === 'production';
};

export const getTransformBabelConfig = (options: BabelConfigOptions = {}): TransformOptions => {
    const minimal = getParseOnlyBabelConfig(options);
    const {uses, mode = 'development', displayName = true} = options;
    const requireDisplayName = displayName === true || (displayName === 'auto' && mode === 'development');
    const plugins: Array<PluginItem | false> = [
        // 这东西必须放在最前面，不然`export default class`会被其它插件转义掉没机会确认真实的名字
        requireDisplayName && resolve('@reskript/babel-plugin-add-react-display-name'),
        shouldEnable('styled-components', uses) && [
            resolve('babel-plugin-styled-components'),
            {
                displayName: requireDisplayName,
            },
        ],
        ...minimal.plugins || [],
        requireAntdOptimization(options) && [
            resolve('babel-plugin-import'),
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
        ],
        requireLodashOptimization(options) && [
            resolve('babel-plugin-lodash'),
            {
                id: ['lodash', 'lodash-decorators'],
            },
        ],
    ];

    return {
        presets: minimal.presets,
        plugins: compact(plugins),
    };
};

export const getBabelConfig = (options: BabelConfigOptions = {}): TransformOptions => {
    const {mode = 'development', hot = 'none', hostType = 'application', polyfill = false} = options;
    const transform = getTransformBabelConfig(options);
    const requireReactOptimization = mode === 'production' && hostType === 'application';

    const presets: Array<PluginItem | false> = [
        polyfill && hostType === 'application' && coreJSPreset,
        ...transform.presets || [],
    ];
    // 考虑到生成的chunk的hash稳定性，此处不使用`babel-plugin-lodash`来缩减lodash的体积了
    const plugins: Array<PluginItem | false> = [
        ...transform.plugins || [],
        requireReactOptimization && resolve('babel-plugin-transform-react-remove-prop-types'),
        hot === 'all' && [resolve('react-refresh/babel'), {skipEnvCheck: true}],
    ];

    return {presets: compact(presets), plugins: compact(plugins)};
};
