import webpack from 'webpack';
import WebpackDevServer, {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import {sync as resolve} from 'resolve';
import {createRuntimeBuildEnv, BuildContext} from '@reskript/config-webpack';
import {createWebpackDevServerConfig} from '@reskript/config-webpack-dev-server';
import {readProjectSettings, BuildEnv, ProjectSettings} from '@reskript/settings';
import {logger, prepareEnvironment, readHostPackageConfig} from '@reskript/core';
import {createWebpackConfig} from './webpack';
import {PlayCommandLineArgs} from './interface';
import setupServer from './server';

const collectBuildContext = (cmd: PlayCommandLineArgs): BuildContext => {
    const userProjectSettings = readProjectSettings(cmd, 'dev');
    const projectSettings: ProjectSettings = {
        ...userProjectSettings,
        build: {
            ...userProjectSettings.build,
            reportLintErrors: false,
        },
        devServer: {
            ...userProjectSettings.devServer,
            port: parseInt(cmd.port, 10) || 9999,
            openPage: '',
            hot: 'all',
        },
    };
    const {name: hostPackageName} = readHostPackageConfig(cmd.cwd);
    const buildEnv: BuildEnv = {
        hostPackageName,
        projectSettings,
        usage: 'devServer',
        mode: 'development',
        cwd: cmd.cwd,
        srcDirectory: 'src',
        cache: false,
    };
    const runtimeBuildEnv = createRuntimeBuildEnv(buildEnv);
    const buildContext: BuildContext = {
        ...runtimeBuildEnv,
        entries: [
            {
                name: 'index',
                config: {
                    html: {
                        title: 'PlayGround',
                        favicon: resolve('./assets/favicon.ico'),
                    },
                },
                template: resolve('./assets/playground-entry.ejs'),
                file: resolve('./assets/playground-entry.js.tpl'),
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

export default async (target: string, cmd: PlayCommandLineArgs): Promise<void> => {
    process.env.NODE_ENV = 'development';
    prepareEnvironment(cmd.cwd, 'development');

    const buildContext = collectBuildContext(cmd);
    const config = await createWebpackConfig(target, cmd, buildContext);
    const devServerConfig = createWebpackDevServerConfig(
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
