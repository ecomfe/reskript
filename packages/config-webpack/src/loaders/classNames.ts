import {sync as resolve} from 'resolve';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = () => {
    return {
        loader: resolve('@ecomfe/class-names-loader'),
        options: {
            classNamesModule: resolve('classnames'),
        },
    };
};

export default factory;
