import {resolveSync} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = () => {
    return {
        loader: resolveSync('@ecomfe/class-names-loader'),
        options: {
            classNamesModule: resolveSync('classnames'),
        },
    };
};

export default factory;
