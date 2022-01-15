import {resolveSync} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async entry => {
    return {
        loader: resolveSync('css-loader'),
        options: {
            sourceMap: entry.projectSettings.build.style.extract,
            modules: false,
        },
    };
};

export default factory;
