import {PluginItem, TransformOptions} from '@babel/core';
import pluginImport from 'babel-plugin-import';
import pluginStyledComponents from 'babel-plugin-styled-components';
import pluginEmotion from '@emotion/babel-plugin';
import pluginTypeScriptMetadata from 'babel-plugin-transform-typescript-metadata';
import {shouldEnable} from './utils.js';
import getParseOnlyBabelConfigFilled from './parseOnly.js';
import {BabelConfigOptionsFilled} from './interface.js';

// 因为要转CJS，不能依赖`@reskript/core`提供的`compact`
const hasValue = (value: PluginItem | false): value is PluginItem => !!value;

const requireDisplayName = (options: BabelConfigOptionsFilled) => {
    const {displayName, mode} = options;
    return displayName === true || (displayName === 'auto' && mode === 'development');
};

export default (options: BabelConfigOptionsFilled): TransformOptions => {
    const parseOnly = getParseOnlyBabelConfigFilled(options);
    const {uses, mode} = options;
    const plugins: Array<PluginItem | false> = [
        shouldEnable('styled-components', uses) && [
            pluginStyledComponents,
            {
                displayName: requireDisplayName(options),
                minify: mode === 'production',
                meaninglessFileNames: ['index'],
            },
        ],
        shouldEnable('emotion', uses) && [
            pluginEmotion,
            {
                sourceMap: mode === 'development',
                // TODO: https://github.com/emotion-js/emotion/issues/2305
                // autoLabel: mode === 'production' ? 'never' : 'always',
                autoLabel: 'always',
            },
        ],
        shouldEnable('reflect-metadata', uses) && pluginTypeScriptMetadata,
        ...parseOnly.plugins || [],
        shouldEnable('antd', uses) && [
            pluginImport,
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
        ],
    ];

    return {
        presets: parseOnly.presets,
        plugins: plugins.filter(hasValue),
    };
};
