import {BuildEnv, DevCommandLineArgs, ProjectSettings} from '@reskript/settings';
import {BuildContext, resolveDevHost, createRuntimeBuildEnv, AppEntry} from '@reskript/build-utils';
import {logger, readPackageConfig} from '@reskript/core';

const resolvePublicPath = async (hostType: DevCommandLineArgs['host'], port: number) => {
    if (!hostType) {
        return undefined;
    }

    const host = await resolveDevHost(hostType);
    return `http://${host}:${port}/assets/`;
};

interface BuildContextOptions<C> {
    cmd: DevCommandLineArgs;
    projectSettings: ProjectSettings;
    entries: Array<AppEntry<C>>;
}

export const createBuildContext = async <C>({cmd, projectSettings, entries}: BuildContextOptions<C>) => {
    const {mode, cwd, srcDirectory, entry, buildTarget} = cmd;
    const {name: hostPackageName} = await readPackageConfig(cwd);

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
    const buildContext: BuildContext<C> = {
        ...runtimeBuildEnv,
        entries,
        features: projectSettings.featureMatrix[buildTarget],
        buildTarget: buildTarget || 'dev',
        isDefaultTarget: true,
    };
    return buildContext;
};

export interface ServerStartContext<C> {
    buildContext: BuildContext<C>;
    host: DevCommandLineArgs['host'];
    publicPath: string | undefined;
}

interface ServerContextOptions<C> {
    cmd: DevCommandLineArgs;
    buildContext: BuildContext<C>;
}

export const prepareServerContext = async <C>({cmd, buildContext}: ServerContextOptions<C>) => {
    const host = await resolveDevHost(cmd.host);
    const publicPath = await resolvePublicPath(cmd.host, buildContext.projectSettings.devServer.port);
    const serverContext: ServerStartContext<C> = {buildContext, host, publicPath};
    return serverContext;
};

interface RestartContext {
    inProgress: Promise<() => Promise<void>>;
    nextStart: (() => void) | null;
}

export const restartable = (start: () => RestartContext['inProgress']) => {
    const context: RestartContext = {
        inProgress: start(),
        nextStart: null,
    };
    return async () => {
        logger.log('Detected reSKRipt config change, restarting dev server...');

        if (context.nextStart) {
            return;
        }

        context.nextStart = () => {
            context.inProgress = start();
            context.nextStart = null;
        };
        const stop = await context.inProgress;
        await stop();
        if (context.nextStart) {
            context.nextStart();
        }
    };
};
