import {sync as resolve} from 'resolve';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = entry => {
    return {
        loader: resolve('css-loader'),
        options: {
            sourceMap: entry.projectSettings.build.style.extract,
            modules: false,
        },
    };
};

export default factory;
