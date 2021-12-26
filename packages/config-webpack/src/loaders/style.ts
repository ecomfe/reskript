import {resolveSync} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = () => {
    return {
        loader: resolveSync('style-loader'),
    };
};

export default factory;
