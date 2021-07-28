import {logger} from '@reskript/core';
import {sync as resolve} from 'resolve';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = entry => {
    logger.warn('[DEPRECATED]: url-loader is deprecated, DO NOT use it.');

    return {
        loader: resolve('url-loader'),
        options: {
            limit: entry.projectSettings.build.largeAssetSize,
            name: '[name].[contenthash].[ext]',
        },
    };
};

export default factory;
