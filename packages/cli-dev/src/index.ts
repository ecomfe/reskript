import {noop} from 'lodash';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'better-opn';
import {watchProjectSettings, warnAndExitOnInvalidFinalizeReturn} from '@reskript/settings';
import {BuildContext, createWebpackConfig} from '@reskript/config-webpack';
import {logger, prepareEnvironment} from '@reskript/core';
import {createWebpackDevServerPartial, createWebpackDevServerConfig} from '@reskript/config-webpack-dev-server';
import {DevCommandLineArgs} from './interface';
import {createBuildContext, resolveHost, resolvePublicPath, startServer} from './utils';

export {DevCommandLineArgs};

process.env.OPEN_MATCH_HOST_ONLY = 'true';

interface ServerStartContext {
    buildContext: BuildContext;
    host: DevCommandLineArgs['host'];
    extra: webpack.Configuration;
    publicPath: string | undefined;
}

const prepareServerContext = async (cmd: DevCommandLineArgs): Promise<ServerStartContext> => {
    const [buildContext, host] = await Promise.all([createBuildContext(cmd), resolveHost(cmd.host)]);
    const buildingPartial = createWebpackDevServerPartial(buildContext, host);
    const resolvingPublicPath = resolvePublicPath(cmd.host, buildContext.projectSettings.devServer.port);
    const [extra, publicPath] = await Promise.all([buildingPartial, resolvingPublicPath]);
    return {buildContext, host, extra, publicPath};
};

const startDevServer = async (cmd: DevCommandLineArgs): Promise<WebpackDevServer> => {
    const {buildContext, host, extra, publicPath} = await prepareServerContext(cmd);
    const config = await createWebpackConfig(buildContext, [extra, {output: {publicPath}}]);
    const devServerConfig = await createWebpackDevServerConfig(
        buildContext,
        cmd.entry,
        cmd.proxyDomain,
        config.devServer
    );
    const finalizedDevServerConfig = buildContext.projectSettings.devServer.finalize(devServerConfig, buildContext);
    warnAndExitOnInvalidFinalizeReturn(finalizedDevServerConfig, 'devServer');

    WebpackDevServer.addDevServerEntrypoints(config, finalizedDevServerConfig);
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, finalizedDevServerConfig);
    const port = finalizedDevServerConfig.port ?? 8080;
    await startServer(server, port);

    const openURL = `http://${host}:${port}/${buildContext.projectSettings.devServer.openPage}`;
    open(openURL);

    return server;
};

export const run = async (cmd: DevCommandLineArgs): Promise<void> => {
    process.env.NODE_ENV = cmd.mode;
    prepareEnvironment(cmd.cwd, cmd.mode);

    let startingServer = startDevServer(cmd);
    let nextStart: (() => void) | null = null;
    const restart = async () => {
        logger.log('Detected reskript.config.js change, restarting dev server...');
        if (nextStart) {
            return;
        }

        nextStart = () => {
            startingServer = startDevServer(cmd);
            nextStart = null;
        };
        const server = await startingServer;
        server.close(nextStart || noop);
    };
    const listen = await watchProjectSettings(cmd, 'dev');
    listen(restart);
};
