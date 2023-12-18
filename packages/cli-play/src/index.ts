import path from 'node:path';
import {AppEntry, createRuntimeBuildEnv, BuildContext} from '@reskript/build-utils';
import {
    readProjectSettings,
    BuildEnv,
    PlayCommandLineArgs,
    ProjectSettings,
    strictCheckRequiredDependency,
} from '@reskript/settings';
import {prepareEnvironment, readPackageConfig, dirFromImportMeta} from '@reskript/core';
import setupServer from './server/index.js';

const currentDirectory = dirFromImportMeta(import.meta.url);

const enhanceProjectSettings = <S extends ProjectSettings>(settings: S, cmd: PlayCommandLineArgs, target: string) => {
    const enhanced: S = {
        ...settings,
        build: {
            ...settings.build,
            reportLintErrors: false,
            appTitle: 'PlayGround',
        },
        devServer: {
            ...settings.devServer,
            port: cmd.port,
            openPage: '',
            hot: true,
        },
        portal: {
            ...settings.portal,
            setup: async (app, helper) => {
                await settings.portal.setup(app, helper);
                setupServer(app, target);
            },
        },
    };
    return enhanced;
};

const buildProjectSettings = async (cmd: PlayCommandLineArgs, target: string): Promise<ProjectSettings> => {
    const {cwd, configFile} = cmd;
    const userProjectSettings = await readProjectSettings({commandName: 'play', specifiedFile: configFile, ...cmd});
    const projectSettings = enhanceProjectSettings(userProjectSettings, cmd, target);
    await strictCheckRequiredDependency(projectSettings, cwd);
    return projectSettings;
};

type Unused = Record<string, unknown>;

const createPlayEntry = (enableConcurrentMode: boolean): AppEntry<Unused> => {
    return {
        name: 'index',
        config: {},
        template: path.join(currentDirectory, 'assets', 'playground-entry.ejs'),
        file: enableConcurrentMode
            ? path.join(currentDirectory, 'assets', 'playground-entry-cm.js.tpl')
            : path.join(currentDirectory, 'assets', 'playground-entry.js.tpl'),
    };
};

const collectBuildContext = async <S extends ProjectSettings>(settings: S, cmd: PlayCommandLineArgs) => {
    const {name: hostPackageName} = await readPackageConfig(cmd.cwd);
    const buildEnv: BuildEnv<S> = {
        hostPackageName,
        cwd: cmd.cwd,
        projectSettings: settings,
        usage: 'devServer',
        mode: 'development',
        srcDirectory: 'src',
        cache: 'transient',
    };
    const runtimeBuildEnv = await createRuntimeBuildEnv(buildEnv);
    const enableConcurrentMode = cmd.concurrentMode ?? settings.play.defaultEnableConcurrentMode;
    const buildContext: BuildContext<Unused, S> = {
        ...runtimeBuildEnv,
        entries: [createPlayEntry(enableConcurrentMode)],
        features: settings.featureMatrix[cmd.buildTarget],
        buildTarget: cmd.buildTarget,
        isDefaultTarget: true,
    };
    return buildContext;
};

export const run = async (cmd: PlayCommandLineArgs, target: string): Promise<void> => {
    process.env.NODE_ENV = 'development';
    await prepareEnvironment(cmd.cwd, 'development', cmd.envFiles);

    const projectSettings = await buildProjectSettings(cmd, target);

    if (projectSettings.driver === 'webpack') {
        const buildContext = await collectBuildContext(projectSettings, cmd);
        const {run} = await import('./webpack/index.js');
        run(buildContext, cmd, target);
    }
    else {
        const buildContext = await collectBuildContext(projectSettings, cmd);
        const {run} = await import('./vite/index.js');
        run(buildContext, cmd, target);
    }
};
