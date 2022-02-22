import baseConfig from './reskript-vite.config';

const config = {
    ...baseConfig,
    devServer: {
        ...baseConfig.devServer,
        port: 9975,
        https: undefined,
    },
};

export default config;
