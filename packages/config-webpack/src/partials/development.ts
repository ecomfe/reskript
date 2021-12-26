import {Configuration} from 'webpack';
import {ConfigurationFactory} from '../interface.js';

const factory: ConfigurationFactory = () => {
    const config: Configuration = {
        devtool: 'eval-cheap-module-source-map',
    };

    return config;
};

export default factory;
