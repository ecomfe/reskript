import {sync as resolve} from 'resolve';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = () => {
    return {
        loader: resolve('style-loader'),
    };
};

export default factory;
