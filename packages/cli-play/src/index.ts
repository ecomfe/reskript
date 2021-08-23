import path from 'path';
import webpack from 'webpack';
import WebpackDevServer, {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import {createRuntimeBuildEnv, BuildContext} from '@reskript/config-webpack';
import {createWebpackDevServerConfig} from '@reskript/config-webpack-dev-server';
import {readProjectSettings, BuildEnv, ProjectSettings} from '@reskript/settings';
import {logger, prepareEnvironment, readPackageConfig} from '@reskript/core';
import {createWebpackConfig} from './webpack';
import {PlayCommandLineArgs} from './interface';
import setupServer from './server';

export {PlayCommandLineArgs};

const collectBuildContext = async (cmd: PlayCommandLineArgs): Promise<BuildContext> => {
    const userProjectSettings = await readProjectSettings(cmd, 'dev');
    const projectSettings: ProjectSettings = {
        ...userProjectSettings,
        build: {
            ...userProjectSettings.build,
            reportLintErrors: false,
        },
        devServer: {
            ...userProjectSettings.devServer,
            port: cmd.port || 9999,
            openPage: '',
            hot: 'all',
        },
    };
    const {name: hostPackageName} = await readPackageConfig(cmd.cwd);
    const buildEnv: BuildEnv = {
        hostPackageName,
        projectSettings,
        usage: 'devServer',
        mode: 'development',
        cwd: cmd.cwd,
        srcDirectory: 'src',
        // TODO: 考虑改成`transient`后测下效果
        cache: 'off',
    };
    const runtimeBuildEnv = await createRuntimeBuildEnv(buildEnv);
    const enableConcurrentMode = cmd.concurrentMode ?? projectSettings.play.defaultEnableConcurrentMode;
    const buildContext: BuildContext = {
        ...runtimeBuildEnv,
        entries: [
            {
                name: 'index',
                config: {
                    html: {
                        title: 'PlayGround',
                        favicon: path.join(__dirname, 'assets', 'favicon.ico'),
                    },
                },
                template: path.join(__dirname, 'assets', 'playground-entry.ejs'),
                file: enableConcurrentMode
                    ? path.join(__dirname, 'assets', 'playground-entry-cm.js.tpl')
                    : path.join(__dirname, 'assets', 'playground-entry.js.tpl'),
            },
        ],
        features: projectSettings.featureMatrix[cmd.buildTarget],
        buildTarget: cmd.buildTarget || 'dev',
        isDefaultTarget: true,
    };
    return buildContext;
};

const registerSersvice = (config: DevServerConfiguration | undefined, target: string): DevServerConfiguration => {
    const prevBefore = config?.before;

    if (Array.isArray(config?.proxy)) {
        logger.error('Sorry we don\'t allow devServer.proxy to be an array');
        process.exit(21);
    }

    return {
        ...config,
        before: (app, server, compiler) => {
            prevBefore?.(app, server, compiler);
            setupServer(app, target);
        },
        proxy: {
            ...config?.proxy,
            '/io-play': {
                target: 'http://localhost:9998/io-play',
                ws: true,
            },
        },
    };
};

export const run = async (cmd: PlayCommandLineArgs, target: string): Promise<void> => {
    process.env.NODE_ENV = 'development';
    prepareEnvironment(cmd.cwd, 'development');

    const buildContext = await collectBuildContext(cmd);
    const config = await createWebpackConfig(target, cmd, buildContext);
    const devServerConfig = await createWebpackDevServerConfig(
        buildContext,
        'index',
        undefined,
        registerSersvice(config.devServer, target)
    );
    WebpackDevServer.addDevServerEntrypoints(config, devServerConfig);
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, devServerConfig);
    server.listen(buildContext.projectSettings.devServer.port);
};
