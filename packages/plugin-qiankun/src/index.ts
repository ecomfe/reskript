import {SettingsPlugin, BuildSettings, DevServerSettings} from '@reskript/settings';
import {Options} from './interface';
import htmlEntry from './htmlEntry';
import runtimeEntry from './runtimeEntry';

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
        const {before, after} = config;
        config.before = (app, server, compiler) => {
            before?.(app, server, compiler);
            app.get(
                '/__qiankun_entry__.js',
                async (req, res) => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
                    const script = await runtimeEntry(appName);
                    res.type('js').end(script);
                }
            );
        };
        // 要首先让`historyApiFallback`把找不到的文件回退到这个页，再去响应它的请求才可以，所以这里必须用`after`钩子
        config.after = (app, server, conpiler) => {
            after?.(app, server, conpiler);
            app.get(
                '/__qiankun__.html',
                async (req, res) => {
                    const html = await htmlEntry(appName, options);
                    res.type('html').end(html);
                }
            );
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
                finalize: (config, env, internals) => {
                    const before = settings.build.finalize?.(config, env, internals);
                    return finalizeBuild(before, env, internals);
                },
            },
            devServer: options?.setupDevServer === false
                ? settings.devServer
                : {
                    ...settings.devServer,
                    finalize: (config, env) => {
                        const before = settings.devServer.finalize(config, env);
                        return finalizeDevServer(before, env);
                    },
                },
        };
    };
};
