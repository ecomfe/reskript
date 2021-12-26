import {resolveSync} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = entry => {
    const {mode, projectSettings: {build: {script: {displayName}}}} = entry;

    return {
        loader: resolveSync('@reskript/svg-to-component-loader'),
        options: {
            displayName: displayName === 'auto' ? mode === 'development' : displayName,
        },
    };
};

export default factory;
