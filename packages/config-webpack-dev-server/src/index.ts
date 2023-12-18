import path from 'node:path';
import {Configuration} from 'webpack';
import {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import FriendlyErrorsWebpackPlugin from '@soda/friendly-errors-webpack-plugin';
import {merge} from 'webpack-merge';
import launchInEditor from 'launch-editor-middleware';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {compact} from '@reskript/core';
import {createHtmlPluginInstances, BuildContext} from '@reskript/config-webpack';
import {constructProxyConfiguration, createMiddlewareHook} from '@reskript/build-utils';
import {warnAndExitOnInvalidFinalizeReturn, WebpackBuildEntry} from '@reskript/settings';
import {createPortal, router} from '@reskript/portal';
import ProgressBarPlugin from './ProgressBarPlugin.js';
import {addHotModuleToEntry} from './utils.js';

const getDevServerMessages = (host: string, port: number, https: boolean, openPage: string = ''): string[] => [
    `Your application is running here: ${https ? 'https' : 'http'}://${host}:${port}/${openPage}`,
];

export const createWebpackDevServerPartial = async (context: BuildContext, host = 'localhost') => {
    const {cwd, projectSettings: {devServer: {hot, port, openPage, https}}} = context;
    const htmlPlugins = createHtmlPluginInstances({...context, isDefaultTarget: true});
    const messageOptions = {
        compilationSuccessInfo: {
            messages: getDevServerMessages(host, port, !!https?.client, openPage),
            notes: [],
        },
    };
    const plugins = [
        ...htmlPlugins,
        // TODO: https://github.com/webpack/webpack/pull/11698
        new FriendlyErrorsWebpackPlugin(messageOptions),
        hot && new ReactRefreshWebpackPlugin({overlay: false, forceEnable: true}),
        new ProgressBarPlugin(),
    ];

    const configuration: Configuration = {
        output: {
            path: path.join(cwd, 'dist'),
            // 不要让构建时的`publicPath`影响调试，调试永远走本地，
            // 使用本地的地址用于兼容微前端环境：https://github.com/ecomfe/reskript/issues/62
            publicPath: '/',
            // 在使用热更新时是无法使用`chunkhash`的，因此在调试时使用普通的`hash`
            filename: 'assets/[name].[contenthash].js',
        },
        // @ts-expect-error 上面的`FriendlyErrorsWebpackPlugin`官方类型错误
        plugins: compact(plugins),
    };
    return configuration;
};

interface Options {
    targetEntry: string;
    proxyDomain?: string;
    extra?: DevServerConfiguration;
}

// 这个函数的实现暂时没有异步的逻辑，但对外暴露为异步接口给未来调整留空间
export const createWebpackDevServerConfig = async (buildEntry: WebpackBuildEntry, options: Options) => {
    const {targetEntry, proxyDomain, extra = {}} = options;
    const {
        apiPrefixes,
        defaultProxyDomain,
        proxyRewrite,
        https,
        port,
        hot,
        customizeMiddleware,
    } = buildEntry.projectSettings.devServer;
    const proxyOptions = {
        https: https?.proxy ?? false,
        prefixes: apiPrefixes,
        rewrite: proxyRewrite,
        targetDomain: proxyDomain || defaultProxyDomain,
    };
    const portal = createPortal();
    await buildEntry.projectSettings.portal.setup(portal, {router});
    const baseConfig: DevServerConfiguration = {
        port,
        proxy: constructProxyConfiguration(proxyOptions),
        allowedHosts: 'all',
        host: '0.0.0.0',
        hot: hot ? 'only' : false,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        devMiddleware: {
            publicPath: '/',
            stats: 'none',
        },
        // 微前端跨域用
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
        },
        static: {
            watch: {
                ignored: /node_modules/,
            },
        },
        historyApiFallback: {
            index: `/${targetEntry}.html`,
            disableDotRule: true,
        },
        server: {
            type: https?.client ? 'https' : 'http',
            options: https?.client ? https.serverOptions : undefined,
        },
        setupMiddlewares: (middlewares, server) => {
            if (!server.app) {
                throw new Error('Webpack dev server not launched');
            }

            server.app.use('/__skr__', portal);
            const before = createMiddlewareHook();
            const after = createMiddlewareHook();
            customizeMiddleware({before, after});
            middlewares.unshift(...before.items());
            middlewares.push(...after.items());
            middlewares.unshift({path: '/__open_in_editor__', middleware: launchInEditor()});

            return middlewares;
        },
    };
    const mergedConfig = merge(
        {devServer: baseConfig},
        {devServer: extra}
    );
    const finalized = await buildEntry.projectSettings.devServer.finalize(mergedConfig.devServer, buildEntry);
    warnAndExitOnInvalidFinalizeReturn(finalized, 'devServer');
    return finalized;
};

interface InjectOptions {
    config: Configuration;
    devServerConfig: DevServerConfiguration;
    entry: string;
    resolveBase: string;
    hot: boolean;
}

export const injectDevElements = async (options: InjectOptions) => {
    const {config, devServerConfig, entry, resolveBase, hot} = options;
    const devServerInjected: Configuration = {
        ...config,
        devServer: devServerConfig,
        // 禁用日志输出，让控制台干净点
        infrastructureLogging: {
            level: 'none',
        },
        stats: 'errors-warnings',
    };
    // 这里我们的`entry`应该肯定是一个类似`{index: 'path/to/entries/index.ts'}`这样的东西
    const entryInjected: Configuration = hot && typeof config.entry === 'object' && !Array.isArray(config.entry)
        ? {
            ...devServerInjected,
            entry: {
                [entry]: await addHotModuleToEntry(config.entry[entry], resolveBase),
            },
        }
        : devServerInjected;
    return entryInjected;
};
