/**
 * @ref https://github.com/swc-project/swc-loader/blob/master/src/index.js
 */
import {LoaderContext} from 'webpack';
import {transform as swcTransform} from '@swc/core';
import {transform} from './binding.cjs';

type SwcOptions = Exclude<Parameters<typeof swcTransform>[1], undefined>;

export default async function swcLoader(this: LoaderContext<SwcOptions>, source: string, sourceMap?: string | unknown) {
    const callback = this.async();
    const filename = this.resourcePath;
    const options = this.getOptions();

    const sourceMapString = sourceMap
        ? (typeof sourceMap === 'object' ? JSON.stringify(sourceMap) : sourceMap)
        : undefined;

    const swcOptions = {
        ...options,
        filename,
        inputSourceMap: sourceMapString,
        sourceMaps: options.sourceMaps ?? this.sourceMap,
        sourceFileName: filename,
    };

    const output = await transform(
        source,
        true,
        Buffer.from(JSON.stringify(swcOptions))
    );

    callback(null, output.code, output.map);
}
