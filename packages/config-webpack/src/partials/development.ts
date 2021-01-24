import {Configuration} from 'webpack';
import {ConfigurationFactory} from '../interface';

const factory: ConfigurationFactory = () => {
    const config: Configuration = {
        // TODO: 等webpack的定义更新到5.0
        // @ts-ignore
        devtool: 'eval-cheap-module-source-map',
    };

    return config;
};

export default factory;
