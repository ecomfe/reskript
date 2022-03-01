import path from 'node:path';
import webpack from 'webpack';
import WebpackDevServer, {Configuration as DevServerConfiguration, ProxyConfigMap} from 'webpack-dev-server';
import {BuildContext} from '@reskript/config-webpack';
import {createWebpackDevServerConfig, injectDevElements} from '@reskript/config-webpack-dev-server';
import {PlayCommandLineArgs} from '@reskript/settings';
import {logger, dirFromImportMeta} from '@reskript/core';
import {createWebpackConfig} from './config.js';

const currentDirectory = dirFromImportMeta(import.meta.url);

const isProxyMap = (proxy: DevServerConfiguration['proxy']): proxy is ProxyConfigMap | undefined => {
    return !proxy || !Array.isArray(proxy);
};

const registerSersvice = (config: DevServerConfiguration | undefined): DevServerConfiguration => {
    if (!isProxyMap(config?.proxy)) {
        logger.error('Sorry we don\'t allow devServer.proxy to be an array');
        process.exit(21);
    }

    return {
        ...config,
        proxy: {
            ...config?.proxy,
            '/io-play': {
                target: 'http://localhost:9998/io-play',
                ws: true,
            },
        },
    };
};

export const run = async (buildContext: BuildContext, cmd: PlayCommandLineArgs, target: string) => {
    const config = await createWebpackConfig(target, cmd, buildContext);
    const devServerConfig = await createWebpackDevServerConfig(
        buildContext,
        {targetEntry: 'index', extra: registerSersvice(config.devServer)}
    );
    const injectOptions = {
        config,
        devServerConfig,
        hot: true,
        entry: 'index',
        resolveBase: path.resolve(currentDirectory, '..'),
    };
    const devInjected = await injectDevElements(injectOptions);
    const compiler = webpack(devInjected);
    const server = new WebpackDevServer(devServerConfig, compiler);
    await server.start();
};
