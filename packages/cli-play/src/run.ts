import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {sync as resolve} from 'resolve';
import {createRuntimeBuildEnv, BuildContext} from '@reskript/config-webpack';
import {createWebpackDevServerConfig} from '@reskript/config-webpack-dev-server';
import {readProjectSettings, BuildEnv, ProjectSettings} from '@reskript/settings';
import {readHostPackageConfig} from '@reskript/core';
import {createWebpackConfig} from './webpack';
import {PlayCommandLineArgs} from './interface';

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
            port: 9999,
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

export default async (target: string, cmd: PlayCommandLineArgs): Promise<void> => {
    process.env.NODE_ENV = 'development';

    const buildContext = collectBuildContext(cmd);
    const config = createWebpackConfig(target, buildContext);
    const devServerConfig = createWebpackDevServerConfig(buildContext, 'index', undefined, config.devServer);
    WebpackDevServer.addDevServerEntrypoints(config, devServerConfig);
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, devServerConfig);
    server.listen(buildContext.projectSettings.devServer.port);
};
