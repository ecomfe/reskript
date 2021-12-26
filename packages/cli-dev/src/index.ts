import webpack, {Configuration as WebpackConfiguration} from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'better-opn';
import {watchProjectSettings} from '@reskript/settings';
import {BuildContext, createWebpackConfig} from '@reskript/config-webpack';
import {logger, prepareEnvironment, dirFromImportMeta} from '@reskript/core';
import {
    createWebpackDevServerPartial,
    createWebpackDevServerConfig,
    injectDevElements,
} from '@reskript/config-webpack-dev-server';
import {DevCommandLineArgs} from './interface.js';
import {createBuildContext, resolveHost, resolvePublicPath, startServer} from './utils.js';

export {DevCommandLineArgs};

process.env.OPEN_MATCH_HOST_ONLY = 'true';

interface ServerStartContext {
    buildContext: BuildContext;
    host: DevCommandLineArgs['host'];
    extra: WebpackConfiguration;
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
    const {hot, https} = buildContext.projectSettings.devServer;
    const config = await createWebpackConfig(
        buildContext,
        {
            strict: {
                disableRequireExtension: cmd.strict,
                caseSensitiveModuleSource: cmd.strict,
                typeCheck: false,
            },
            extras: [extra, {output: {publicPath}}],
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

    return server;
};

export const run = async (cmd: DevCommandLineArgs): Promise<void> => {
    process.env.NODE_ENV = cmd.mode;
    await prepareEnvironment(cmd.cwd, cmd.mode);

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
        await server.stop();
        if (nextStart) {
            nextStart();
        }
    };
    const listen = await watchProjectSettings(cmd, 'dev');
    listen(restart);
};
