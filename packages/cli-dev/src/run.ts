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
import {createWebpackConfig, BuildContext, collectEntries, createRuntimeBuildEnv} from '@reskript/config-webpack';
import {readHostPackageConfig} from '@reskript/core';
import internalIp from 'internal-ip';
import {createWebpackDevServerPartial, createWebpackDevServerConfig} from '@reskript/config-webpack-dev-server';
import {DevCommandLineArgs} from './interface';

process.env.OPEN_MATCH_HOST_ONLY = 'true';

const startDevServer = (cmd: DevCommandLineArgs): Promise<WebpackDevServer> => {
    const projectSettings = readProjectSettings(cmd, 'dev');
    const {name: hostPackageName} = readHostPackageConfig(cmd.cwd);
    const entries = collectEntries(cmd.cwd, cmd.src);
    const buildEnv: BuildEnv = {
        hostPackageName,
        usage: 'devServer',
        mode: cmd.mode ?? 'development',
        cwd: cmd.cwd,
        srcDirectory: cmd.src,
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
    const devServerConfig = createWebpackDevServerConfig(buildContext, cmd.proxyDomain, config.devServer);
    const finalizedDevServerConfig = buildContext.projectSettings.devServer.finalize(devServerConfig, buildContext);
    warnAndExitOnInvalidFinalizeReturn(finalizedDevServerConfig, 'devServer');
    WebpackDevServer.addDevServerEntrypoints(config, finalizedDevServerConfig);
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, finalizedDevServerConfig);
    const port = finalizedDevServerConfig.port ?? 8080;
    const waitServerFinish = (resolve: (arg: any) => void) => server.listen(
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
    return new Promise(waitServerFinish);
};

export default async (cmd: DevCommandLineArgs): Promise<void> => {
    process.env.NODE_ENV = cmd.mode || 'development';

    let startingServer = startDevServer(cmd);
    let nextStart: (() => void) | null = null;
    const restart = async () => {
        console.log('Detected settings.js change, restarting dev server...');
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
