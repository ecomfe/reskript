import path from 'path';
import {compact} from 'lodash';
import {sync as resolve} from 'resolve';
import {PluginItem, TransformOptions} from '@babel/core';
import {fillBabelConfigOptions} from './utils';
import getParseOnlyBabelConfigFilled from './parseOnly';
import getTransformBabelConfigFilled from './transform';
import {BabelConfigOptions, BabelConfigOptionsFilled} from './interface';

export type {BabelConfigOptions};

export const getParseOnlyBabelConfig = (options?: BabelConfigOptions): TransformOptions => {
    return getParseOnlyBabelConfigFilled(fillBabelConfigOptions(options));
};

export const getTransformBabelConfig = (input?: BabelConfigOptions): TransformOptions => {
    return getTransformBabelConfigFilled(fillBabelConfigOptions(input));
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

const requireFileName = (options: BabelConfigOptionsFilled) => {
    const {mode, hostType} = options;
    return mode === 'development' && hostType === 'application';
};

export const getBabelConfig = (input?: BabelConfigOptions): TransformOptions => {
    const options = fillBabelConfigOptions(input);
    const {mode, hot, hostType, polyfill, cwd, srcDirectory} = options;
    const transform = getTransformBabelConfig(options);
    const requireReactOptimization = mode === 'production' && hostType === 'application';

    const presets: Array<PluginItem | false> = [
        polyfill && hostType === 'application' && coreJSPreset,
        ...transform.presets || [],
    ];
    // 考虑到生成的chunk的hash稳定性，此处不使用`babel-plugin-lodash`来缩减lodash的体积了
    const plugins: Array<PluginItem | false> = [
        ...transform.plugins || [],
        requireFileName(options) && [
            resolve('@reskript/babel-plugin-debug-react-component-file-name'),
            {
                srcDirectory: path.resolve(cwd, srcDirectory),
            },
        ],
        requireReactOptimization && resolve('babel-plugin-transform-react-remove-prop-types'),
        hot === 'all' && [resolve('react-refresh/babel'), {skipEnvCheck: true}],
    ];

    return {presets: compact(presets), plugins: compact(plugins)};
};
