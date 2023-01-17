import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'better-opn';
import {DevCommandLineArgs, WebpackProjectSettings} from '@reskript/settings';
import {createWebpackConfig, EntryConfig} from '@reskript/config-webpack';
import {dirFromImportMeta, logger} from '@reskript/core';
import {
    createWebpackDevServerPartial,
    createWebpackDevServerConfig,
    injectDevElements,
} from '@reskript/config-webpack-dev-server';
import {ServerStartContext} from './utils.js';

type WebpackServerStartContext = ServerStartContext<EntryConfig, WebpackProjectSettings>;

export const startServer = async (server: WebpackDevServer): Promise<void> => {
    try {
        await server.start();
    }
    catch (ex) {
        logger.error(ex instanceof Error ? ex.message : `${ex}`);
        process.exit(22);
    }
};

export const start = async (cmd: DevCommandLineArgs, serverContext: WebpackServerStartContext) => {
    const {buildContext, host} = serverContext;
    const {hot, https} = buildContext.projectSettings.devServer;
    const extra = await createWebpackDevServerPartial(buildContext, host);
    const config = await createWebpackConfig(
        buildContext,
        {
            strict: {
                disableRequireExtension: cmd.strict,
                caseSensitiveModuleSource: cmd.strict,
                typeCheck: false,
            },
            extras: [extra],
        }
    );
    const devServerConfig = await createWebpackDevServerConfig(
        buildContext,
        {targetEntry: cmd.entry, proxyDomain: cmd.proxyDomain}
    );
    const injectOptions = {
        config,
        devServerConfig,
        hot,
        entry: cmd.entry,
        resolveBase: dirFromImportMeta(import.meta.url),
    };
    const devInjected = await injectDevElements(injectOptions);
    const compiler = webpack(devInjected);
    const server = new WebpackDevServer(devServerConfig, compiler);
    await startServer(server);

    if (cmd.open) {
        const port = devServerConfig.port!;
        const protocol = https?.client ? 'https' : 'http';
        const openURL = `${protocol}://${host}:${port}/${buildContext.projectSettings.devServer.openPage}`;
        open(openURL);
    }

    return () => server.stop();
};
