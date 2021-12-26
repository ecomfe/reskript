import path from 'path';
import {PluginItem, TransformOptions} from '@babel/core';
import debugReactComponentFileName from '@reskript/babel-plugin-debug-react-component-file-name';
import pluginRemovePropTypes from 'babel-plugin-transform-react-remove-prop-types';
// TODO: https://github.com/facebook/react/pull/23087
import pluginReactRefresh from 'react-refresh/babel.js';
import {compact} from '@reskript/core';
import {fillBabelConfigOptions} from './utils.js';
import getParseOnlyBabelConfigFilled from './parseOnly.js';
import getTransformBabelConfigFilled from './transform.js';
import {BabelConfigOptions, BabelConfigOptionsFilled} from './interface.js';

// TODO: 看看能不能为jest和eslint定制一个完全不依赖自己的babel plugin的配置出来

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
            debugReactComponentFileName,
            {
                srcDirectory: path.resolve(cwd, srcDirectory),
                fullPathPrefix: options.openInEditorPrefix,
            },
        ],
        ...transform.plugins || [],
        requireReactOptimization && pluginRemovePropTypes,
        hot && [pluginReactRefresh, {skipEnvCheck: true}],
    ];

    return {presets: transform.presets, plugins: compact(plugins)};
};
