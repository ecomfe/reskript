import path from 'path';
import {Configuration} from 'webpack';
import {ConfigurationFactory} from '../interface.js';

const factory: ConfigurationFactory = entry => {
    const {cwd} = entry;

    const config: Configuration = {
        output: {
            path: path.join(cwd, 'dist'),
            filename: 'index.js',
            libraryTarget: 'commonjs2',
        },
    };
    return config;
};

export default factory;
