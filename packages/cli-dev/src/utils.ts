import WebpackDevServer from 'webpack-dev-server';
import internalIp from 'internal-ip';
import {readProjectSettings, BuildEnv} from '@reskript/settings';
import {BuildContext, collectEntries, createRuntimeBuildEnv, EntryLocation} from '@reskript/config-webpack';
import {logger, readHostPackageConfig} from '@reskript/core';
import {DevCommandLineArgs} from './interface';

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
            const ip = await internalIp.v4();
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

export const startServer = (server: WebpackDevServer, port: number): Promise<void> => {
    const execute = (resolve: () => void) => {
        const httpServer = server.listen(port, '0.0.0.0', resolve);
        httpServer.on(
            'error',
            (ex: Error) => {
                logger.error(ex.message);
                process.exit(22);
            }
        );
    };
    return new Promise(execute);
};

export const createBuildContext = async (cmd: DevCommandLineArgs): Promise<BuildContext> => {
    const [
        projectSettings,
        {name: hostPackageName},
    ] = await Promise.all([readProjectSettings(cmd, 'dev'), readHostPackageConfig(cmd.cwd)]);
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
                hot: cmd.mode === 'production' ? 'none' : projectSettings.devServer.hot,
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
