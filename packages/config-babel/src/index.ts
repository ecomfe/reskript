import {compact} from 'lodash';
import {sync as resolve} from 'resolve';
import {PluginItem, TransformOptions} from '@babel/core';
import {WorkMode} from '@reskript/core';

export interface BabelConfigOptions {
    readonly mode?: WorkMode;
    readonly hot?: 'none' | 'simple' | 'all';
    readonly hostType?: 'application' | 'library';
    readonly polyfill?: boolean;
    readonly modules?: false | 'commonjs';
    readonly defaultImportOptimization?: boolean;
}

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
        polyfill && coreJSPreset,
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

export const getTransformBabelConfig = (options: BabelConfigOptions = {}): TransformOptions => {
    const minimal = getParseOnlyBabelConfig(options);
    const {mode = 'development', defaultImportOptimization = true} = options;
    const plugins: Array<PluginItem | false> = [
        // 这东西必须放在最前面，不然`export default class`会被其它插件转义掉没机会确认真实的名字
        resolve('@reskript/babel-plugin-add-react-display-name'),
        resolve('babel-plugin-styled-components'),
        ...minimal.plugins || [],
        defaultImportOptimization && [
            resolve('babel-plugin-import'),
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
        ],
        defaultImportOptimization && mode === 'production' && [
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
    const {mode = 'development', hot = 'none', hostType = 'application'} = options;
    const transform = getTransformBabelConfig(options);
    const requireReactOptimization = mode === 'production' && hostType === 'application';

    // 考虑到生成的chunk的hash稳定性，此处不使用`babel-plugin-lodash`来缩减lodash的体积了
    const plugins: Array<PluginItem | false> = [
        ...transform.plugins || [],
        requireReactOptimization && resolve('babel-plugin-transform-react-remove-prop-types'),
        hot === 'all' && [resolve('react-refresh/babel'), {skipEnvCheck: true}],
    ];

    return {presets: transform.presets, plugins: compact(plugins)};
};
