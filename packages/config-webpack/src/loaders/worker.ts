import {resolve} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async () => {
    return {
        loader: await resolve('worker-loader'),
        options: {
            filename: 'assets/[name].[contenthash].js',
            inline: 'no-fallback',
        },
    };
};

export default factory;
