import WebpackDevServer from 'webpack-dev-server';
import {internalIpV4} from 'internal-ip';
import {readProjectSettings, BuildEnv, strictCheckRequiredDependency} from '@reskript/settings';
import {BuildContext, collectEntries, createRuntimeBuildEnv, EntryLocation} from '@reskript/config-webpack';
import {logger, readPackageConfig} from '@reskript/core';
import {DevCommandLineArgs} from './interface.js';

export const resolveHost = async (hostType: DevCommandLineArgs['host']) => {

    if (!hostType) {
        return 'localhost';
    }

    switch (hostType) {
        case 'localhost':
            return 'localhost';
        case 'loopback':
            return '127.0.0.1';
        case 'ip': {
            const ip = await internalIpV4();
            return ip ?? 'localhost';
        }
        default:
            return hostType;
    }
};

export const resolvePublicPath = async (hostType: DevCommandLineArgs['host'], port: number) => {
    if (!hostType) {
        return undefined;
    }

    const host = await resolveHost(hostType);
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
    const [
        projectSettings,
        {name: hostPackageName},
    ] = await Promise.all([readProjectSettings(cmd, 'dev'), readPackageConfig(cmd.cwd)]);
    await strictCheckRequiredDependency(projectSettings, cmd.cwd);
    const entryLocation: EntryLocation = {
        cwd: cmd.cwd,
        srcDirectory: cmd.srcDirectory,
        entryDirectory: cmd.entriesDirectory,
        only: [cmd.entry],
    };
    const entries = await collectEntries(entryLocation);

    if (!entries.length) {
        logger.error(`You have specified a missing entry ${cmd.entry}, dev-server is unable to start.`);
        process.exit(21);
    }

    const buildEnv: BuildEnv = {
        hostPackageName,
        usage: 'devServer',
        mode: cmd.mode ?? 'development',
        cwd: cmd.cwd,
        srcDirectory: cmd.srcDirectory,
        // `react-refresh`无法在`production`模式下工作，所以在该模式下直接禁用掉热更新
        projectSettings: {
            ...projectSettings,
            devServer: {
                ...projectSettings.devServer,
                hot: cmd.mode === 'production' ? false : projectSettings.devServer.hot,
            },
        },
    };
    const runtimeBuildEnv = await createRuntimeBuildEnv(buildEnv);
    return {
        ...runtimeBuildEnv,
        entries,
        features: projectSettings.featureMatrix[cmd.buildTarget],
        buildTarget: cmd.buildTarget || 'dev',
        isDefaultTarget: true,
    };
};
