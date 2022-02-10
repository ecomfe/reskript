import {resolve, logger} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async () => {
    logger.warn('@reskript/less-safe-loader is deprecated, reSKRipt has a built-in implementation.');
    logger.warn('If you are not intentionally using this loader but seeing this message, please report an issue.');

    return {
        loader: await resolve('loader-of-loader'),
        options: {
            resolveLoader: async () => {
                return {
                    loader: await resolve('@reskript/less-safe-loader'),
                    type: 'module',
                };
            },
        },
    };
};

export default factory;
