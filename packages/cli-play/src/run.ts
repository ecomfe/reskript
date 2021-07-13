import webpack from 'webpack';
import WebpackDevServer, {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import {json} from 'body-parser';
import {sync as resolve} from 'resolve';
import {createRuntimeBuildEnv, BuildContext} from '@reskript/config-webpack';
import {createWebpackDevServerConfig} from '@reskript/config-webpack-dev-server';
import {readProjectSettings, BuildEnv, ProjectSettings} from '@reskript/settings';
import {readHostPackageConfig} from '@reskript/core';
import {createWebpackConfig} from './webpack';
import {PlayCase, PlayCommandLineArgs} from './interface';
import createService from './service';

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

const registerSersvice = (config: DevServerConfiguration | undefined, target: string): DevServerConfiguration => {
    const prevBefore = config?.before;
    const service = createService(target);

    return {
        ...config,
        before: (app, server, compiler) => {
            prevBefore?.(app, server, compiler);
            app.get(
                '/play/cases',
                (req, res) => {
                    const cases = service.listCases();
                    res.json(cases);
                }
            );
            app.post(
                '/play/cases',
                json(),
                (req, res) => {
                    const caseToSave = req.body as PlayCase;
                    service.saveCase(caseToSave);
                    res.status(204).end();
                }
            );
        },
    };
};

export default async (target: string, cmd: PlayCommandLineArgs): Promise<void> => {
    process.env.NODE_ENV = 'development';

    const buildContext = collectBuildContext(cmd);
    const config = createWebpackConfig(target, buildContext);
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
