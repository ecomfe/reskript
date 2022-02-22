import {ConfigFactory} from '../interface.js';

const factory: ConfigFactory = async (context, options) => {
    return {
        mode: context.mode,
        cacheDir: options.cacheDirectory ?? 'node_modules/.cache/vite',
    };
};

export default factory;
