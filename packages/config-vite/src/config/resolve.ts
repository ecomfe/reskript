import path from 'node:path';
import {ConfigFactory} from '../interface.js';

const factory: ConfigFactory = async context => {
    return {
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
            mainFields: ['browser', 'module', 'main'],
            alias: {
                '@': path.join(context.cwd, context.srcDirectory),
                ...context.hostPackageName ? {[context.hostPackageName]: path.join(context.cwd, 'src')} : {},
                // NOTE: 不支持`regenerator-runtime`
            },
        },
    };
};

export default factory;
