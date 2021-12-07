import {sync as resolve} from 'resolve';
import {compact} from 'lodash';
import postCSS from 'postcss';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = ({mode, projectSettings}) => {
    const {build: {style: {extract}, uses}} = projectSettings;

    const plugins = [
        /* eslint-disable global-require */
        uses.includes('tailwind') && require('tailwindcss'),
        require('postcss-preset-env')(),
        mode === 'production' ? require('cssnano')() : null,
        /* eslint-enable global-require */
    ];

    return {
        loader: resolve('postcss-loader'),
        options: {
            sourceMap: extract,
            implementation: postCSS,
            postcssOptions: {
                plugins: compact(plugins),
            },
        },
    };
};

export default factory;
