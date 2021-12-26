import {resolveSync, compact} from '@reskript/core';
import postCSS from 'postcss';
// import tailwind from 'tailwindcss';
import presetEnv from 'postcss-preset-env';
import nano from 'cssnano';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = ({mode, projectSettings}) => {
    // const {build: {style: {extract}, uses}} = projectSettings;
    const {build: {style: {extract}}} = projectSettings;

    const plugins = [
        // TODO: `tailwindcss`要用户安装，这里就要按需`import`了，为了不异步，要想办法包一层
        /* eslint-disable global-require */
        // uses.includes('tailwind') && tailwind,
        presetEnv(),
        mode === 'production' ? nano() : null,
        /* eslint-enable global-require */
    ];

    return {
        loader: resolveSync('postcss-loader'),
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
