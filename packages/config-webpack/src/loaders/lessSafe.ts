import {sync as resolve} from 'resolve';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = () => {
    return {
        loader: resolve('@reskript/less-safe-loader'),
    };
};

export default factory;
