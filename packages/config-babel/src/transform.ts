import {compact} from 'lodash';
import {sync as resolve} from 'resolve';
import {PluginItem, TransformOptions} from '@babel/core';
import {shouldEnable} from './utils';
import getParseOnlyBabelConfigFilled from './parseOnly';
import {BabelConfigOptionsFilled} from './interface';

const requireLodashOptimization = (options: BabelConfigOptionsFilled) => {
    const {uses, mode} = options;
    return shouldEnable('lodash', uses) && mode === 'production';
};

const requireDisplayName = (options: BabelConfigOptionsFilled) => {
    const {displayName, mode} = options;
    return displayName === true || (displayName === 'auto' && mode === 'development');
};

export default (options: BabelConfigOptionsFilled): TransformOptions => {
    const minimal = getParseOnlyBabelConfigFilled(options);
    const {uses, mode} = options;
    const plugins: Array<PluginItem | false> = [
        // 这东西必须放在最前面，不然`export default class`会被其它插件转义掉没机会确认真实的名字
        requireDisplayName(options) && resolve('@reskript/babel-plugin-add-react-display-name'),
        shouldEnable('styled-components', uses) && [
            resolve('babel-plugin-styled-components'),
            {
                displayName: requireDisplayName(options),
                minify: mode === 'production',
            },
        ],
        shouldEnable('emotion', uses) && [
            resolve('@emotion/babel-plugin'),
            {
                sourceMap: mode === 'development',
                // TODO: https://github.com/emotion-js/emotion/issues/2305
                // autoLabel: mode === 'production' ? 'never' : 'always',
                autoLabel: 'always',
            },
        ],
        shouldEnable('reflect-metadata', uses) && resolve('babel-plugin-transform-typescript-metadata'),
        ...minimal.plugins || [],
        shouldEnable('antd', uses) && [
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
