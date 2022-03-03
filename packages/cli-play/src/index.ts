import path from 'node:path';
import webpack from 'webpack';
import WebpackDevServer, {Configuration as DevServerConfiguration, ProxyConfigMap} from 'webpack-dev-server';
import {BuildContext} from '@reskript/config-webpack';
import {createRuntimeBuildEnv} from '@reskript/build-utils';
import {createWebpackDevServerConfig, injectDevElements} from '@reskript/config-webpack-dev-server';
import {
    readProjectSettings,
    BuildEnv,
    PlayCommandLineArgs,
    ProjectSettings,
    strictCheckRequiredDependency,
} from '@reskript/settings';
import {logger, prepareEnvironment, readPackageConfig, dirFromImportMeta} from '@reskript/core';
import {createWebpackConfig} from './webpack.js';
import setupServer from './server/index.js';

const currentDirectory = dirFromImportMeta(import.meta.url);

const collectBuildContext = async (cmd: PlayCommandLineArgs): Promise<BuildContext> => {
    const {cwd, buildTarget, port, concurrentMode, configFile} = cmd;
    const userProjectSettings = await readProjectSettings({commandName: 'play', specifiedFile: configFile, ...cmd});
    const projectSettings: ProjectSettings = {
        ...userProjectSettings,
        build: {
            ...userProjectSettings.build,
            reportLintErrors: false,
        },
        devServer: {
            ...userProjectSettings.devServer,
            port: port,
            openPage: '',
            hot: true,
        },
    };
    await strictCheckRequiredDependency(projectSettings, cwd);
    const {name: hostPackageName} = await readPackageConfig(cwd);
    const buildEnv: BuildEnv = {
        hostPackageName,
        projectSettings,
        cwd,
        usage: 'devServer',
        mode: 'development',
        srcDirectory: 'src',
        cache: 'transient',
    };
    const runtimeBuildEnv = await createRuntimeBuildEnv(buildEnv);
    const enableConcurrentMode = concurrentMode ?? projectSettings.play.defaultEnableConcurrentMode;
    const buildContext: BuildContext = {
        ...runtimeBuildEnv,
        entries: [
            {
                name: 'index',
                config: {
                    html: {
                        title: 'PlayGround',
                        favicon: path.join(currentDirectory, 'assets', 'favicon.ico'),
                    },
                },
                template: path.join(currentDirectory, 'assets', 'playground-entry.ejs'),
                file: enableConcurrentMode
                    ? path.join(currentDirectory, 'assets', 'playground-entry-cm.js.tpl')
                    : path.join(currentDirectory, 'assets', 'playground-entry.js.tpl'),
            },
        ],
        features: projectSettings.featureMatrix[buildTarget],
        buildTarget: buildTarget || 'dev',
        isDefaultTarget: true,
    };
    return buildContext;
};

const isProxyMap = (proxy: DevServerConfiguration['proxy']): proxy is ProxyConfigMap | undefined => {
    return !proxy || !Array.isArray(proxy);
};

const registerSersvice = (config: DevServerConfiguration | undefined, target: string): DevServerConfiguration => {
    const previousSetup = config?.setupMiddlewares;

    if (!isProxyMap(config?.proxy)) {
        logger.error('Sorry we don\'t allow devServer.proxy to be an array');
        process.exit(21);
    }

    return {
        ...config,
        setupMiddlewares: (middlewares, devServer) => {
            if (devServer.app) {
                setupServer(devServer.app, target);
            }
            return previousSetup?.(middlewares, devServer) ?? middlewares;
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
    await prepareEnvironment(cmd.cwd, 'development');

    const buildContext = await collectBuildContext(cmd);
    const config = await createWebpackConfig(target, cmd, buildContext);
    const devServerConfig = await createWebpackDevServerConfig(
        buildContext,
        {targetEntry: 'index', extra: registerSersvice(config.devServer, target)}
    );
    const injectOptions = {
        config,
        devServerConfig,
        hot: true,
        entry: 'index',
        resolveBase: currentDirectory,
    };
    const devInjected = await injectDevElements(injectOptions);
    const compiler = webpack(devInjected);
    const server = new WebpackDevServer(devServerConfig, compiler);
    await server.start();
};
