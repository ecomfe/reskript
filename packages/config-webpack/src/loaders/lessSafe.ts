import {resolveSync} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = () => {
    return {
        loader: resolveSync('@reskript/less-safe-loader'),
    };
};

export default factory;
