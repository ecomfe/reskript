import {resolve} from '@reskript/core';
import {postcssConfig} from '@reskript/build-utils';
import postcss from 'postcss';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async ({mode, projectSettings}) => {
    const {cwd, build: {style: {extract}, uses}} = projectSettings;

    const options = {
        cwd,
        tailwind: uses.includes('tailwind'),
        minify: mode === 'production',
    };

    return {
        loader: await resolve('postcss-loader'),
        options: {
            sourceMap: extract,
            implementation: postcss,
            postcssOptions: await postcssConfig(options),
        },
    };
};

export default factory;
