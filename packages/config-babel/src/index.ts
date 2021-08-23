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

const requireFileName = (options: BabelConfigOptionsFilled) => {
    const {mode, hostType} = options;
    return mode === 'development' && hostType === 'application';
};

export const getBabelConfig = (input?: BabelConfigOptions): TransformOptions => {
    const options = fillBabelConfigOptions(input);
    const {mode, hot, hostType, cwd, srcDirectory} = options;
    const transform = getTransformBabelConfig(options);
    const requireReactOptimization = mode === 'production' && hostType === 'application';
    const plugins: Array<PluginItem | false> = [
        // 这东西必须放在最前面，不然其它插件会转义出如`function Wrapper()`这样的函数，这个插件再插入代码就会出问题
        requireFileName(options) && [
            resolve('@reskript/babel-plugin-debug-react-component-file-name'),
            {
                srcDirectory: path.resolve(cwd, srcDirectory),
            },
        ],
        ...transform.plugins || [],
        requireReactOptimization && resolve('babel-plugin-transform-react-remove-prop-types'),
        hot === 'all' && [resolve('react-refresh/babel'), {skipEnvCheck: true}],
    ];

    return {presets: transform.presets, plugins: compact(plugins)};
};
