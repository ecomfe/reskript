import {SettingsPlugin, WebpackProjectSettings} from '@reskript/settings';
import {chainWebpackFinalize, chainCustomizeMiddleware} from '@reskript/plugin-utils';
import {Options} from './interface.js';
import htmlEntry from './htmlEntry.js';
import runtimeEntry from './runtimeEntry.js';

export default (appName: string, options?: Options): SettingsPlugin => async (settings, cmd) => {
    if (settings.driver === 'vite') {
        throw new Error('Vite driver not supported by plugin-qiankun since qiankun doesn\'t support modules');
    }

    const finalizeEnhanced = chainWebpackFinalize(
        settings,
        async config => {
            config.output = {
                ...config.output,
                library: `${appName}`,
                libraryTarget: 'umd',
                globalObject: 'window',
            };
            return config;
        }
    );

    if (cmd.commandName !== 'dev' || options?.setupDevServer === false) {
        return finalizeEnhanced;
    }

    const middlewareEnhanced = chainCustomizeMiddleware(
        finalizeEnhanced,
        ({before, after}) => {
            before.get('/__qiankun_entry__.js', async (req, res) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
                res.setHeader('Content-Type', 'application/javascript');
                // Webpack的结构比较奇怪，在`dev`模式下HTML是在`/assets`里面的
                const script = await runtimeEntry(appName, `/assets/${cmd.entry}-${cmd.buildTarget}.html`);
                res.end(script);
            });
            // 要首先让`historyApiFallback`把找不到的文件回退到这个页，再去响应它的请求才可以，所以这里必须放在其它的中间件后面
            after.get('/__qiankun__.html', async (req, res) => {
                const html = await htmlEntry(appName, options);
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            });
        }
    );
    const historyApiEnhanced: WebpackProjectSettings = {
        ...middlewareEnhanced,
        devServer: {
            ...middlewareEnhanced.devServer,
            finalize: async (config, buildEntry) => {
                const prev = await middlewareEnhanced.devServer.finalize(config, buildEntry);
                prev.historyApiFallback = {
                    index: '/__qiankun__.html',
                    disableDotRule: true,
                };
                return prev;
            },
        },
    };
    return historyApiEnhanced;
};
