import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async ({mode}) => {
    if (mode !== 'production') {
        return null;
    }

    try {
        const {default: loaderFactory} = await import('@reskript/config-img-loader');
        return loaderFactory();
    }
    catch {
        return null;
    }
};

export default factory;
