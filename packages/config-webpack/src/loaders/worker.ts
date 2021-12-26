import {resolveSync} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = () => {
    return {
        loader: resolveSync('worker-loader'),
        options: {
            filename: '[name].[contenthash].js',
            inline: 'no-fallback',
        },
    };
};

export default factory;
