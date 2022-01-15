import path from 'path';
import {resolveSync} from '@reskript/core';
// @ts-expect-error
import hasha from 'hasha';
import {paramCase} from 'change-case';
import {LoaderFactory} from '../interface.js';

const generateScopedStyleName = (name: string, filename: string): string => {
    const hash = hasha(filename + name, {algorithm: 'md5'});
    const basename = path.basename(filename, path.extname(filename));
    const componentName = basename === 'index' ? path.basename(path.dirname(filename)) : basename;
    return `${paramCase(componentName)}-${name}-${hash.slice(0, 5)}`;
};


const factory: LoaderFactory = async entry => {
    return {
        loader: resolveSync('css-loader'),
        options: {
            sourceMap: entry.projectSettings.build.style.extract,
            importLoaders: true,
            modules: {
                mode: 'local',
                exportLocalsConvention: 'dashes',
                getLocalIdent({resourcePath}: any, localIdentName: string, localName: string): string {
                    return generateScopedStyleName(localName, resourcePath);
                },
            },
        },
    };
};

export default factory;
