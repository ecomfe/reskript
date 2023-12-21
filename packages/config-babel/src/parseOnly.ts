import {PluginItem, TransformOptions} from '@babel/core';
import presetEnv from '@babel/preset-env';
import presetTypeScript from '@babel/preset-typescript';
import presetReact from '@babel/preset-react';
import pluginDecorators from '@babel/plugin-proposal-decorators';
import pluginClassProperties from '@babel/plugin-proposal-class-properties';
import pluginDoExpressions from '@babel/plugin-proposal-do-expressions';
import pluginExportDefaultFrom from '@babel/plugin-proposal-export-default-from';
import pluginExportNamespaceFrom from '@babel/plugin-proposal-export-namespace-from';
import pluginNullishCoalescingOperator from '@babel/plugin-proposal-nullish-coalescing-operator';
import pluginNumericSeparator from '@babel/plugin-proposal-numeric-separator';
import pluginOptionalChaining from '@babel/plugin-proposal-optional-chaining';
import pluginThrowExpressions from '@babel/plugin-proposal-throw-expressions';
import pluginDynamicImport from '@babel/plugin-syntax-dynamic-import';
import pluginImportMeta from '@babel/plugin-syntax-import-meta';
import {BabelConfigOptionsFilled} from './interface.js';
import {compatPluginTarget, shouldEnable} from './utils.js';

// 因为要转CJS，不能依赖`@reskript/core`提供的`compact`
const hasValue = (value: PluginItem | false): value is PluginItem => !!value;

export default (options: BabelConfigOptionsFilled): TransformOptions => {
    const {polyfill, modules, uses} = options;
    const presets: Array<PluginItem | false> = [
        [
            compatPluginTarget(presetEnv),
            {
                modules,
                bugfixes: true,
                debug: false,
                useBuiltIns: polyfill ? 'usage' : false,
                corejs: polyfill ? {version: polyfill === true ? 3 : polyfill, proposals: true} : undefined,
            },
        ],
        compatPluginTarget(presetTypeScript),
        [
            compatPluginTarget(presetReact),
            {
                runtime: 'automatic',
                importSource: shouldEnable('emotion', uses) ? '@emotion/react' : 'react',
            },
        ],
    ];
    const plugins: PluginItem[] = [
        [compatPluginTarget(pluginDecorators), {legacy: true}],
        compatPluginTarget(pluginClassProperties),
        compatPluginTarget(pluginDoExpressions),
        // export Foo from './Foo';
        compatPluginTarget(pluginExportDefaultFrom),
        // export {Foo} from './Foo';
        compatPluginTarget(pluginExportNamespaceFrom),
        // const foo = obejct.foo ?? 'default';
        compatPluginTarget(pluginNullishCoalescingOperator),
        // 1_234_567
        compatPluginTarget(pluginNumericSeparator),
        // object?.foo?.bar
        compatPluginTarget(pluginOptionalChaining),
        // const valid = input.isValid() || throw new Error('Invalid')
        compatPluginTarget(pluginThrowExpressions),
        compatPluginTarget(pluginDynamicImport),
        compatPluginTarget(pluginImportMeta),
    ];

    return {
        plugins,
        presets: presets.filter(hasValue),
    };
};
