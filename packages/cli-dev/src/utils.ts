import {BuildEnv, DevCommandLineArgs, DevServerSettings, ProjectSettings} from '@reskript/settings';
import {BuildContext, resolveDevHost, createRuntimeBuildEnv, AppEntry} from '@reskript/build-utils';
import {logger, readPackageConfig} from '@reskript/core';

const resolvePublicPath = async (hostType: DevCommandLineArgs['host'], settings: DevServerSettings) => {
    if (!hostType) {
        return undefined;
    }

    const host = await resolveDevHost(hostType);
    const protocol = settings.https?.client ? 'https' : 'http';
    return `${protocol}://${host}:${settings.port}/`;
};

interface BuildContextOptions<C, S extends ProjectSettings> {
    cmd: DevCommandLineArgs;
    projectSettings: S;
    entries: Array<AppEntry<C>>;
}

export const createBuildContext = async <C, S extends ProjectSettings>(options: BuildContextOptions<C, S>) => {
    const {cmd, projectSettings, entries} = options;
    const {mode, cwd, srcDirectory, entry, buildTarget} = cmd;
    const {name: hostPackageName} = await readPackageConfig(cwd);

    if (!entries.length) {
        logger.error(`You have specified a missing entry ${entry}, dev-server is unable to start.`);
        process.exit(21);
    }

    const buildEnv: BuildEnv<S> = {
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
    const buildContext: BuildContext<C, S> = {
        ...runtimeBuildEnv,
        entries,
        features: projectSettings.featureMatrix[buildTarget],
        buildTarget: buildTarget || 'dev',
        isDefaultTarget: true,
    };
    return buildContext;
};

export interface ServerStartContext<C, S extends ProjectSettings> {
    buildContext: BuildContext<C, S>;
    host: DevCommandLineArgs['host'];
    publicPath: string | undefined;
}

interface ServerContextOptions<C, S extends ProjectSettings> {
    cmd: DevCommandLineArgs;
    buildContext: BuildContext<C, S>;
}

export const prepareServerContext = async <C, S extends ProjectSettings>(options: ServerContextOptions<C, S>) => {
    const {cmd, buildContext} = options;
    const host = await resolveDevHost(cmd.host);
    const publicPath = await resolvePublicPath(cmd.host, buildContext.projectSettings.devServer);
    const serverContext: ServerStartContext<C, S> = {buildContext, host, publicPath};
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
