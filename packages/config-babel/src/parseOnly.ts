import {compact} from 'lodash';
import {sync as resolve} from 'resolve';
import {PluginItem, TransformOptions} from '@babel/core';
import {BabelConfigOptionsFilled} from './interface';
import {shouldEnable} from './utils';

export default (options: BabelConfigOptionsFilled): TransformOptions => {
    const {polyfill, modules, uses} = options;
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
                importSource: shouldEnable('emotion', uses) ? '@emotion/react' : 'react',
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
