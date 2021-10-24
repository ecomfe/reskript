import {mergeWithCustomize, customizeArray, customizeObject} from 'webpack-merge';

const builtinStrategy = {
    customizeArray: customizeArray({'module.rules': 'append'}),
    customizeObject: customizeObject({'resolve.alias': 'prepend'}),
};

export const mergeBuiltin = mergeWithCustomize(builtinStrategy);
