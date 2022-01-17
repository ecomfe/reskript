import {resolve} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async () => {
    return {
        loader: await resolve('@reskript/less-safe-loader'),
    };
};

export default factory;
