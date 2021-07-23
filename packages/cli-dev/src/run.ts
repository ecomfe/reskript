import {noop} from 'lodash';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'better-opn';
import {watchProjectSettings, warnAndExitOnInvalidFinalizeReturn} from '@reskript/settings';
import {createWebpackConfig} from '@reskript/config-webpack';
import {logger, prepareEnvironment} from '@reskript/core';
import {createWebpackDevServerPartial, createWebpackDevServerConfig} from '@reskript/config-webpack-dev-server';
import {DevCommandLineArgs, LegacyDevCommandLineArgs} from './interface';
import {createBuildContext, resolveHost, resolvePublicPath, startServer} from './utils';

process.env.OPEN_MATCH_HOST_ONLY = 'true';

const startDevServer = async (cmd: DevCommandLineArgs): Promise<WebpackDevServer> => {
    const buildContext = createBuildContext(cmd);
    const host = await resolveHost(cmd.host);
    const extra = createWebpackDevServerPartial(buildContext, host);
    const publicPath = await resolvePublicPath(cmd.host, buildContext.projectSettings.devServer.port);
    const config = createWebpackConfig(buildContext, [extra, {output: {publicPath}}]);
    const devServerConfig = createWebpackDevServerConfig(
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

const fixArgs = (cmd: LegacyDevCommandLineArgs): DevCommandLineArgs => {
    const output = {...cmd};
    // DEPRECATED: 2.0废弃
    if (cmd.src) {
        logger.warn('[DEPRECATED]: --src arg is deprecated, use --src-dir instead');
        output.srcDir = cmd.srcDir === 'src' ? cmd.src : cmd.srcDir;
    }
    // DEPRECATED: 2.0废弃
    if (cmd.open) {
        logger.warn('[DEPRECATED]: --open arg is deprecated, use --host instead');
        const openToHostMapping = {
            local: 'localhost',
            remote: 'ip',
        };
        output.host = openToHostMapping[cmd.open] || undefined;
    }

    return output;
};

export default async (rawCmd: LegacyDevCommandLineArgs): Promise<void> => {
    const cmd = fixArgs(rawCmd);
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
    const listen = watchProjectSettings(cmd, 'dev');
    listen(restart);
};
