import {UserSettings} from '@reskript/settings';
import baseConfig from './reskript-vite.config';

const config: UserSettings = {
    ...baseConfig,
    devServer: {
        ...baseConfig.devServer,
        port: 9975,
        https: undefined,
    },
};

export default config;
