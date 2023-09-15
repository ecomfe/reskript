import {constructProxyConfiguration} from '@reskript/build-utils';
import {ConfigFactory} from '../interface.js';

const factory: ConfigFactory = async (context, options) => {
    const settings = context.projectSettings;
    const proxyOptions = {
        https: !!settings.devServer.https?.proxy,
        prefixes: settings.devServer.apiPrefixes,
        rewrite: settings.devServer.proxyRewrite,
        targetDomain: options.proxyDomain ?? settings.devServer.defaultProxyDomain,
    };

    return {
        server: {
            port: options.port ?? settings.devServer.port,
            strictPort: true,
            host: '0.0.0.0',
            https: settings.devServer.https?.client && settings.devServer.https.serverOptions,
            open: false,
            proxy: constructProxyConfiguration(proxyOptions),
            cors: true,
            hmr: settings.devServer.hot,
        },
    };
};

export default factory;
