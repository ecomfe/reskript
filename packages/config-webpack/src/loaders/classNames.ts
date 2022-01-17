import {resolve} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async () => {
    const resolving = [
        resolve('@ecomfe/class-names-loader'),
        resolve('classnames'),
    ] as const;
    const [loader, classNamesModule] = await Promise.all(resolving);
    return {
        loader,
        options: {classNamesModule},
    };
};

export default factory;
