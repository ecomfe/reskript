import path from 'node:path';
import {createServer, UserConfig} from 'vite';
import {logger} from '@reskript/core';
import {PlayCommandLineArgs} from '@reskript/settings';
import {createViteConfig, BuildContext, ViteOptions} from '@reskript/config-vite';
import {resolveComponentName} from '../utils/path.js';
import playEntryPlugin from './plugin.js';

export const run = async (buildContext: BuildContext, cmd: PlayCommandLineArgs, target: string) => {
    const entryModified: BuildContext = {
        ...buildContext,
        entries: buildContext.entries.map(v => ({...v, file: '/playground-entry.jsx'})),
    };
    const options: ViteOptions = {
        clean: false,
        sourceMaps: true,
        port: cmd.port,
        host: cmd.host,
        proxyDomain: buildContext.projectSettings.devServer.defaultProxyDomain,
        defaultEntry: 'index',
    };
    const config = await createViteConfig(entryModified, options);
    const pluginOptions = {
        cwd: cmd.cwd,
        componentTypeName: resolveComponentName(target),
        componentModulePath: path.resolve(buildContext.cwd, target),
        globalSetupModulePath: cmd.setup
            ? path.resolve(cmd.cwd, cmd.setup)
            : buildContext.projectSettings.play.defaultGlobalSetup,
        enableConcurrentMode: cmd.concurrentMode ?? buildContext.projectSettings.play.defaultEnableConcurrentMode,
    };
    const socketProxyEnabeld: UserConfig = {
        ...config,
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                // 可能和这个有关：https://github.com/vitejs/vite/issues/6215
                'react/jsx-runtime': 'react/jsx-runtime.js',
            },
        },
        server: {
            ...config.server,
            proxy: {
                ...config.server?.proxy,
                '/io-play': {
                    target: 'http://localhost:9998/io-play',
                    ws: true,
                },
            },
        },
        plugins: [
            playEntryPlugin(pluginOptions),
            ...config.plugins ?? [],
        ],
    };
    const server = await createServer(socketProxyEnabeld);
    await server.listen();
    const protocol = buildContext.projectSettings.devServer.https?.client ? 'https' : 'http';
    const url = `${protocol}://${cmd.host}:${cmd.port}/${buildContext.projectSettings.devServer.openPage}`;
    logger.infoHighlight(`Your application is running here: ${url}`);
};
