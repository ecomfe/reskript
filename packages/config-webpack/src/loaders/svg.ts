import {sync as resolve} from 'resolve';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = entry => {
    return {
        loader: resolve('@ecomfe/svg-mixed-loader'),
        options: {
            url: {
                limit: entry.projectSettings.build.largeAssetSize,
                name: '[name].[contenthash].[ext]',
            },
            react: true,
        },
    };
};

export default factory;
