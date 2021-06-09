import {noop} from 'lodash';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'better-opn';
import {
    readProjectSettings,
    watchProjectSettings,
    BuildEnv,
    warnAndExitOnInvalidFinalizeReturn,
} from '@reskript/settings';
import {
    createWebpackConfig,
    BuildContext,
    collectEntries,
    createRuntimeBuildEnv,
    EntryLocation,
} from '@reskript/config-webpack';
import {logger, readHostPackageConfig} from '@reskript/core';
import internalIp from 'internal-ip';
import {createWebpackDevServerPartial, createWebpackDevServerConfig} from '@reskript/config-webpack-dev-server';
import {DevCommandLineArgs, LegacyDevCommandLineArgs} from './interface';

process.env.OPEN_MATCH_HOST_ONLY = 'true';

const startDevServer = (cmd: DevCommandLineArgs): Promise<WebpackDevServer> => {
    const projectSettings = readProjectSettings(cmd, 'dev');
    const {name: hostPackageName} = readHostPackageConfig(cmd.cwd);
    const entryLocation: EntryLocation = {
        cwd: cmd.cwd,
        srcDirectory: cmd.srcDir,
        entryDirectory: cmd.entriesDir,
        only: [cmd.entry],
    };
    const entries = collectEntries(entryLocation);

    if (!entries.length) {
        logger.error(`You have specified a missing entry ${cmd.entry}, dev-server is unable to start.`);
        process.exit(21);
    }

    const buildEnv: BuildEnv = {
        hostPackageName,
        usage: 'devServer',
        mode: cmd.mode ?? 'development',
        cwd: cmd.cwd,
        srcDirectory: cmd.srcDir,
        // `react-refresh`无法在`production`模式下工作，所以在该模式下直接禁用掉热更新
        projectSettings: {
            ...projectSettings,
            devServer: {
                ...projectSettings.devServer,
                hot: cmd.mode === 'production' ? 'none' : projectSettings.devServer.hot,
            },
        },
    };
    const runtimeBuildEnv = createRuntimeBuildEnv(buildEnv);
    const buildContext: BuildContext = {
        ...runtimeBuildEnv,
        entries,
        features: projectSettings.featureMatrix[cmd.buildTarget],
        buildTarget: cmd.buildTarget || 'dev',
        isDefaultTarget: true,
    };
    const extra = createWebpackDevServerPartial(buildContext);

    const config = createWebpackConfig(buildContext, [extra]);
    const devServerConfig = createWebpackDevServerConfig(buildContext, cmd.entry, cmd.proxyDomain, config.devServer);
    const finalizedDevServerConfig = buildContext.projectSettings.devServer.finalize(devServerConfig, buildContext);
    warnAndExitOnInvalidFinalizeReturn(finalizedDevServerConfig, 'devServer');
    WebpackDevServer.addDevServerEntrypoints(config, finalizedDevServerConfig);
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, finalizedDevServerConfig);
    const port = finalizedDevServerConfig.port ?? 8080;
    const waitServerFinish = (resolve: (arg: any) => void) => {
        const httpServer = server.listen(
            port,
            '0.0.0.0',
            async () => {
                const host = cmd.open === 'remote' ? await internalIp.v4() : 'localhost';
                const openURL = `http://${host}:${port}/${projectSettings.devServer.openPage}`;
                // 这个`setTimeout`用来让`webpackbar`不会卡在99%，原因不明，`setTimeout`万岁！
                setTimeout(() => open(openURL), 0);
                resolve(server);
            }
        );
        httpServer.on(
            'error',
            (ex: Error) => {
                logger.error(ex.message);
                process.exit(22);
            }
        );
    };
    return new Promise(waitServerFinish);
};

const fixArgs = (cmd: LegacyDevCommandLineArgs): DevCommandLineArgs => {
    if (cmd.src) {
        logger.warn('[DEPRECATED]: --src arg is deprecated, use --src-dir instead');
        return {
            ...cmd,
            srcDir: cmd.srcDir === 'src' ? cmd.src : cmd.srcDir,
        };
    }

    return output;
};

export default async (rawCmd: LegacyDevCommandLineArgs): Promise<void> => {
    const cmd = fixArgs(rawCmd);
    process.env.NODE_ENV = cmd.mode || 'development';

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
