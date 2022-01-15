import path from 'path';
import {resolveSync, compact} from '@reskript/core';
import unixify from 'unixify';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async ({cwd, srcDirectory, projectSettings}) => {
    const {build: {style: {resources}}} = projectSettings;
    const patterns = [
        ...resources,
        unixify(path.resolve(cwd, srcDirectory, 'styles/*.var.less')),
    ];

    return {
        loader: resolveSync('style-resources-loader'),
        options: {
            patterns: compact(patterns),
            injector: 'append',
        },
    };
};

export default factory;
