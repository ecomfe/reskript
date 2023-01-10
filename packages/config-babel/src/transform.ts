import {PluginItem, TransformOptions} from '@babel/core';
import pluginLodash from 'babel-plugin-lodash';
import pluginReactConstantElement from '@babel/plugin-transform-react-constant-elements';
import pluginReactInlineElement from '@babel/plugin-transform-react-inline-elements';
import {compact} from '@reskript/core';
import addReactDisplayName from '@reskript/babel-plugin-add-react-display-name';
import {compatPluginTarget, shouldEnable} from './utils.js';
import getTransformMinimalBabelConfig from './transformMinimal.js';
import {BabelConfigOptionsFilled} from './interface.js';

const requireLodashOptimization = (options: BabelConfigOptionsFilled) => {
    const {uses, mode} = options;
    return shouldEnable('lodash', uses) && mode === 'production';
};

const requireDisplayName = (options: BabelConfigOptionsFilled) => {
    const {displayName, mode} = options;
    return displayName === true || (displayName === 'auto' && mode === 'development');
};

export default (options: BabelConfigOptionsFilled): TransformOptions => {
    const minimal = getTransformMinimalBabelConfig(options);
    const plugins: Array<PluginItem | false> = [
        // 这东西必须放在最前面，不然`export default class`会被其它插件转义掉没机会确认真实的名字
        requireDisplayName(options) && compatPluginTarget(addReactDisplayName),
        ...minimal.plugins || [],
        requireLodashOptimization(options) && [
            compatPluginTarget(pluginLodash),
            {
                id: ['lodash', 'lodash-decorators'],
            },
        ],
        // https://babeljs.io/docs/en/babel-plugin-transform-react-constant-elements
        // https://github.com/facebook/react/issues/3226
        compatPluginTarget(pluginReactConstantElement),
        // https://babeljs.io/docs/en/babel-plugin-transform-react-inline-elements
        // https://github.com/facebook/react/issues/3228
        compatPluginTarget(pluginReactInlineElement),
    ];

    return {
        presets: minimal.presets,
        plugins: compact(plugins),
    };
};
