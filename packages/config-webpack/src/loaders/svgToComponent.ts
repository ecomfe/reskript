import {resolve} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async entry => {
    const {mode, projectSettings: {build: {script: {displayName}}}} = entry;

    return {
        loader: await resolve('loader-of-loader'),
        options: {
            resolveLoader: async () => {
                return {
                    loader: await resolve('@reskript/svg-to-component-loader'),
                    type: 'module',
                    options: {
                        displayName: displayName === 'auto' ? mode === 'development' : displayName,
                    },
                };
            },
        },
    };
};

export default factory;
