import * as path from 'path';
import internalIp from 'internal-ip';
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

const devHost = internalIp.v4.sync();

const getDevServerMessages = (port: number, openPage: string = ''): string[] => {
    const prefix = 'Your application is running here';
    const messages = [`${prefix}: http://localhost:${port}/${openPage}`];

    if (devHost) {
        const devHostPrefix = 'or';
        const devHostMsg = ' '.repeat(prefix.length - devHostPrefix.length)
            + devHostPrefix + `: http://${devHost}:${port}/${openPage}`;
        messages.push(devHostMsg);
    }
    return messages;
};

export const createWebpackDevServerPartial = (context: BuildContext): Configuration => {
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
                messages: getDevServerMessages(port, openPage),
                notes: [],
            },
        }) as any,
        hot === 'none' ? null : new HotModuleReplacementPlugin(),
        hot === 'all' ? new ReactRefreshWebpackPlugin({overlay: false, forceEnable: true}) : null,
    ];

    return {
        output: {
            path: path.join(cwd, 'dist'),
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
        https,
        port,
        hot = 'none',
        openPage = '',
    } = buildEntry.projectSettings.devServer;
    const devHost = internalIp.v4.sync();
    const urlPrefix = (https ? 'https://' : 'http://') + (proxyDomain || defaultProxyDomain);
    const agent = createAgent(process.env[https ? 'https_proxy' : 'http_proxy']);
    const proxy = apiPrefixes.reduce(
        (proxy, prefix) => ({...proxy, [prefix]: {agent, target: urlPrefix, changeOrigin: true}}),
        {}
    );

    const baseConfig: DevServerConfiguration = {
        port,
        proxy,
        openPage,
        disableHostCheck: true,
        host: '0.0.0.0',
        public: `${devHost}:${port}`, // `port`不可能是80的，所以不用判断是不是去掉了
        quiet: true,
        compress: true,
        inline: true,
        hot: hot === 'simple',
        hotOnly: hot === 'all',
        publicPath: '/assets/',
        stats: 'normal',
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
