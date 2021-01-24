import {sync as resolve} from 'resolve';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = () => {
    return {
        loader: resolve('worker-loader'),
        options: {
            filename: '[name].[hash].js',
            inline: 'no-fallback',
        },
    };
};

export default factory;
