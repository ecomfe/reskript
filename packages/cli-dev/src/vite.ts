import {createServer, InlineConfig} from 'vite';
import open from 'better-opn';
import {logger} from '@reskript/core';
import {DevCommandLineArgs} from '@reskript/settings';
import {createViteConfig, ViteOptions} from '@reskript/config-vite';
import {ServerStartContext} from './utils.js';

export const start = async (cmd: DevCommandLineArgs, serverContext: ServerStartContext<unknown>) => {
    const {buildContext, host, publicPath} = serverContext;
    const {port, https} = buildContext.projectSettings.devServer;

    const configOptions: ViteOptions = {
        clean: true,
        sourceMaps: true,
        host: cmd.host,
        proxyDomain: cmd.proxyDomain,
    };
    const config = await createViteConfig(buildContext, configOptions);
    const serverOptions: InlineConfig = {
        ...config,
        base: publicPath,
        mode: cmd.mode,
        configFile: false,
    };
    const server = await createServer(serverOptions);

    if (buildContext.projectSettings.from) {
        server.watcher.add(buildContext.projectSettings.from);
    }

    await server.listen();

    const protocol = https?.client ? 'https' : 'http';
    const url = `${protocol}://${host}:${port}/${buildContext.projectSettings.devServer.openPage}`;
    logger.log(`Your application is running here: ${url}`);

    if (cmd.open) {
        open(url);
    }

    return () => server.close();
};
