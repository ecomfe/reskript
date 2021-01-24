import {LoaderFactory} from '../interface';

const factory: LoaderFactory = ({mode}) => {
    if (mode !== 'production') {
        return null;
    }

    try {
        // eslint-disable-next-line global-require
        const {default: loader} = require('@reskript/config-img-loader');
        return loader;
    }
    catch {
        return null;
    }
};

export default factory;
