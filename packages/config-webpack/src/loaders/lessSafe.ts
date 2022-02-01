import {resolve} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async () => {
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
