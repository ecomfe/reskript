import {SettingsPlugin, WebpackDevServerSettings, WebpackProjectSettings} from '@reskript/settings';
import {Options} from './interface.js';
import htmlEntry from './htmlEntry.js';
import runtimeEntry from './runtimeEntry.js';

export default (appName: string, options?: Options): SettingsPlugin => {
    const customizeMiddleware: WebpackDevServerSettings['customizeMiddleware'] = ({before, after}) => {
        before.get(
            '/__qiankun_entry__.js',
            async (req, res) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
                res.setHeader('Content-Type', 'application/javascript');
                const script = await runtimeEntry(appName);
                res.end(script);
            }
        );
        // 要首先让`historyApiFallback`把找不到的文件回退到这个页，再去响应它的请求才可以，所以这里必须放在其它的中间件后面
        after.get(
            '/__qiankun__.html',
            async (req, res) => {
                const html = await htmlEntry(appName, options);
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            }
        );
    };

    return async settings => {
        if (settings.driver === 'vite') {
            throw new Error('Vite driver not supported by plugin-qiankun');
        }

        const next: WebpackProjectSettings = {
            ...settings,
            build: {
                ...settings.build,
                finalize: async (config, env, internals) => {
                    const previous = await settings.build.finalize(config, env, internals);
                    previous.output = {
                        ...previous.output,
                        library: `${appName}`,
                        libraryTarget: 'umd',
                        globalObject: 'window',
                    };
                    return previous;
                },
            },
            devServer: options?.setupDevServer === false
                ? settings.devServer
                : {
                    ...settings.devServer,
                    customizeMiddleware,
                    finalize: async (config, env) => {
                        const previous = await settings.devServer.finalize(config, env);
                        previous.historyApiFallback = {
                            index: '/__qiankun__.html',
                            disableDotRule: true,
                        };
                        return previous;
                    },
                },
        };
        return next;
    };
};
