import path from 'path';
import {compact} from 'lodash';
import {HotModuleReplacementPlugin, Configuration} from 'webpack';
import {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import WebpackBar from 'webpackbar';
import ProxyAgent from 'proxy-agent';
import {merge} from 'webpack-merge';
import pkgDir from 'pkg-dir';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {createHTMLPluginInstances, BuildContext} from '@reskript/config-webpack';
import {BuildEntry, warnAndExitOnInvalidFinalizeReturn} from '@reskript/settings';

const getDevServerMessages = (host: string, port: number, openPage: string = ''): string[] => [
    `Your application is running here: http://${host}:${port}/${openPage}`,
];

export const createWebpackDevServerPartial = (context: BuildContext, host = 'localhost'): Configuration => {
    const {cwd, projectSettings: {devServer: {hot, port, openPage}}} = context;
    const webpackBarOptions = {
        name: '@reskript/dev',
    };
    const htmlPlugins = createHTMLPluginInstances({...context, isDefaultTarget: true});
    const plugins = [
        ...htmlPlugins,
        new WebpackBar(webpackBarOptions),
        // TODO: https://github.com/webpack/webpack/pull/11698
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: getDevServerMessages(host, port, openPage),
                notes: [],
            },
        }) as any,
        hot === 'none' ? null : new HotModuleReplacementPlugin(),
        hot === 'all' ? new ReactRefreshWebpackPlugin({overlay: false, forceEnable: true}) : null,
    ];

    return {
        output: {
            path: path.join(cwd, 'dist'),
            // 不要让构建时的`publicPath`影响调试，调试永远走本地，
            // 使用本地的地址用于兼容微前端环境：https://github.com/ecomfe/reskript/issues/62
            publicPath: '/assets/',
            // 在使用`HotModuleReplacementPlugin`时是无法使用`chunkhash`的，因此在调试时使用普通的`hash`
            filename: '[name].[contenthash].js',
        },
        resolve: {
            // `webpack-dev-server`需要在构建时注入自己的客户端，而客户端放在`reskript`下面，
            // 从项目的根目录去找客户端需要的依赖（如`ansi-html`就是一个依赖）是找不到的，
            // 因此把`reskript/node_modules`也加到查找的路径里去
            modules: [
                'node_modules',
                path.join(pkgDir.sync(__dirname) ?? __dirname, 'node_modules'),
            ],
        },
        plugins: compact(plugins),
    };
};

const createAgent = (possibleProxyURL?: string) => {
    if (possibleProxyURL) {
        return new ProxyAgent(possibleProxyURL);
    }
    return undefined;
};

export const createWebpackDevServerConfig = (
    buildEntry: BuildEntry,
    targetEntry: string,
    proxyDomain: string | undefined,
    addition: DevServerConfiguration = {}
): DevServerConfiguration => {
    const {
        apiPrefixes = [],
        defaultProxyDomain = '',
        proxyRewrite,
        https,
        port,
        hot = 'none',
        openPage = '',
    } = buildEntry.projectSettings.devServer;
    const agent = createAgent(process.env[https ? 'https_proxy' : 'http_proxy']);
    const proxyRules = [
        ...Object.entries(proxyRewrite),
        ...apiPrefixes.map(path => [path, `${proxyDomain || defaultProxyDomain}/${path}`]),
    ];
    const proxy = proxyRules.reduce(
        (proxy, [prefix, target]) => {
            const parsedURL = new URL(`${https ? 'https' : 'http'}://${target}`);
            proxy[prefix] = {
                agent,
                target: `${parsedURL.protocol}//${parsedURL.hostname}${parsedURL.port ? ':' + parsedURL.port : ''}`,
                pathRewrite: {
                    [`^${prefix}`]: parsedURL.pathname.replace(/^\//, ''),
                },
                changeOrigin: true,
            };
            return proxy;
        },
        {} as Record<string, any>
    );

    const baseConfig: DevServerConfiguration = {
        port,
        proxy,
        openPage,
        disableHostCheck: true,
        host: '0.0.0.0',
        quiet: true,
        compress: true,
        inline: true,
        hot: hot === 'simple',
        hotOnly: hot === 'all',
        publicPath: '/assets/',
        stats: 'normal',
        // 微前端跨域用
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
        },
        watchOptions: {
            ignored: /node_modules/,
        },
        historyApiFallback: {
            index: `/assets/${targetEntry}.html`,
            disableDotRule: true,
        },
    };
    const mergedConfig = merge(
        {devServer: baseConfig},
        {devServer: addition}
    );
    const finalized = buildEntry.projectSettings.devServer.finalize(mergedConfig.devServer, buildEntry);
    warnAndExitOnInvalidFinalizeReturn(finalized, 'devServer');
    return finalized;
};
