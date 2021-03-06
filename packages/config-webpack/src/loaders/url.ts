import {sync as resolve} from 'resolve';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = entry => {
    return {
        loader: resolve('url-loader'),
        options: {
            limit: entry.projectSettings.build.largeAssetSize,
            name: '[name].[contenthash].[ext]',
        },
    };
};

export default factory;
