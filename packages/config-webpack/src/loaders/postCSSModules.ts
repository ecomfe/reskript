import {sync as resolve} from 'resolve';
import {compact} from 'lodash';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = ({mode, projectSettings}) => {
    const {build: {style: {extract}}} = projectSettings;

    const plugins = [
        /* eslint-disable global-require */
        require('autoprefixer')(),
        mode === 'production' ? require('cssnano')() : null,
        /* eslint-enable global-require */
    ];

    return {
        loader: resolve('postcss-loader'),
        options: {
            sourceMap: extract,
            postcssOptions: {
                plugins: compact(plugins),
            },
        },
    };
};

export default factory;
