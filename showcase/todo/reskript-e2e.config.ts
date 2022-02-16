import {UserSettings} from '@reskript/settings';
import baseConfig from './reskript.config';

const config: UserSettings = {
    ...baseConfig,
    devServer: {
        ...baseConfig.devServer,
        port: 9976,
        https: undefined,
    },
};

export default config;
