import baseConfig from './reskript.config';

const config = {
    ...baseConfig,
    devServer: {
        ...baseConfig.devServer,
        port: 9976,
        https: undefined,
    },
};

export default config;
