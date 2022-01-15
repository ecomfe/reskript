import {SettingsPlugin, BuildSettings, DevServerSettings} from '@reskript/settings';
import {Request, Response} from 'webpack-dev-server';
import {Options} from './interface.js';
import htmlEntry from './htmlEntry.js';
import runtimeEntry from './runtimeEntry.js';

export default (appName: string, options?: Options): SettingsPlugin => {
    const finalizeBuild: BuildSettings['finalize'] = config => {
        config.output = {
            ...config.output,
            library: `${appName}-[name]`,
            libraryTarget: 'umd',
            globalObject: 'window',
        };
        return config;
    };

    const finalizeDevServer: DevServerSettings['finalize'] = config => {
        const {setupMiddlewares} = config;
        config.setupMiddlewares = (middlewares, devServer) => {
            devServer.app?.get(
                '/__qiankun_entry__.js',
                async (req, res) => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
                    const script = await runtimeEntry(appName);
                    res.type('js').end(script);
                }
            );
            // 要首先让`historyApiFallback`把找不到的文件回退到这个页，再去响应它的请求才可以，所以这里必须放在其它的中间件后面
            return [
                ...setupMiddlewares?.(middlewares, devServer) ?? middlewares,
                {
                    name: 'qiankun-entry-html',
                    path: '/__qiankun__.html',
                    middleware: async (req: Request, res: Response) => {
                        const html = await htmlEntry(appName, options);
                        res.type('html').end(html);
                    },
                },
            ];
        };
        config.historyApiFallback = {
            index: '/__qiankun__.html',
            disableDotRule: true,
        };
        return config;
    };

    return settings => {
        return {
            ...settings,
            build: {
                ...settings.build,
                finalize: async (config, env, internals) => {
                    const previous = await settings.build.finalize?.(config, env, internals);
                    return finalizeBuild(previous, env, internals);
                },
            },
            devServer: options?.setupDevServer === false
                ? settings.devServer
                : {
                    ...settings.devServer,
                    finalize: async (config, env) => {
                        const previous = await settings.devServer.finalize(config, env);
                        return finalizeDevServer(previous, env);
                    },
                },
        };
    };
};
