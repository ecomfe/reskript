import {mergeWithCustomize, customizeArray, customizeObject} from 'webpack-merge';

const builtinStrategy = {
    customizeArray: customizeArray({'module.rules': 'append' as any}),
    customizeObject: customizeObject({'resolve.alias': 'prepend' as any}),
};

export const mergeBuiltin = mergeWithCustomize(builtinStrategy);
