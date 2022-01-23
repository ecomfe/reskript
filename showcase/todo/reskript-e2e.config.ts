import config from './reskript.config';

export default {
    ...config,
    devServer: {
        ...config.devServer,
        port: 9876,
        https: undefined,
    },
};
