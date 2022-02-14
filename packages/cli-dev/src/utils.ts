import WebpackDevServer from 'webpack-dev-server';
import {readProjectSettings, BuildEnv, DevCommandLineArgs, strictCheckRequiredDependency} from '@reskript/settings';
import {EntryLocation, resolveDevHost} from '@reskript/build-utils';
import {BuildContext, collectEntries, createRuntimeBuildEnv} from '@reskript/config-webpack';
import {logger, readPackageConfig} from '@reskript/core';

export const resolvePublicPath = async (hostType: DevCommandLineArgs['host'], port: number) => {
    if (!hostType) {
        return undefined;
    }

    const host = await resolveDevHost(hostType);
    return `http://${host}:${port}/assets/`;
};

export const startServer = async (server: WebpackDevServer): Promise<void> => {
    try {
        await server.start();
    }
    catch (ex) {
        logger.error(ex instanceof Error ? ex.message : `${ex}`);
        process.exit(22);
    }
};

export const createBuildContext = async (cmd: DevCommandLineArgs): Promise<BuildContext> => {
    const {mode, cwd, srcDirectory, entriesDirectory, entry, buildTarget, configFile} = cmd;
    const reading = [
        readProjectSettings({commandName: 'dev', specifiedFile: configFile, ...cmd}),
        readPackageConfig(cwd),
    ] as const;
    const [projectSettings, {name: hostPackageName}] = await Promise.all(reading);
    await strictCheckRequiredDependency(projectSettings, cwd);
    const entryLocation: EntryLocation = {
        cwd: cwd,
        srcDirectory: srcDirectory,
        entryDirectory: entriesDirectory,
        only: [entry],
    };
    const entries = await collectEntries(entryLocation);

    if (!entries.length) {
        logger.error(`You have specified a missing entry ${entry}, dev-server is unable to start.`);
        process.exit(21);
    }

    const buildEnv: BuildEnv = {
        hostPackageName,
        cwd,
        usage: 'devServer',
        mode: mode ?? 'development',
        srcDirectory: srcDirectory,
        // `react-refresh`无法在`production`模式下工作，所以在该模式下直接禁用掉热更新
        projectSettings: {
            ...projectSettings,
            devServer: {
                ...projectSettings.devServer,
                hot: mode === 'production' ? false : projectSettings.devServer.hot,
            },
        },
    };
    const runtimeBuildEnv = await createRuntimeBuildEnv(buildEnv);
    return {
        ...runtimeBuildEnv,
        entries,
        features: projectSettings.featureMatrix[buildTarget],
        buildTarget: buildTarget || 'dev',
        isDefaultTarget: true,
    };
};
