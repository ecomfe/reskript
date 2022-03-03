import {resolveCacheLocation} from '@reskript/core';
import {ConfigFactory} from '../interface.js';

const factory: ConfigFactory = async (context, options) => {
    return {
        mode: context.mode,
        base: options.publicPath,
        cacheDir: options.cacheDirectory ?? await resolveCacheLocation('vite'),
    };
};

export default factory;
