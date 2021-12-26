import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = ({mode}) => {
    if (mode !== 'production') {
        return null;
    }

    try {
        // TODO: 这玩意在ESM下没法玩
        // eslint-disable-next-line global-require
        const {default: loader} = require('@reskript/config-img-loader');
        return loader;
    }
    catch {
        return null;
    }
};

export default factory;
