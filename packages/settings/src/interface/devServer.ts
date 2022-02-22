import {ServerOptions} from 'node:https';
import {Configuration} from 'webpack-dev-server';
import {WebpackBuildEntry} from './shared.js';

export type DevServerHttps = {proxy?: boolean} & ({client?: false} | {client: true, serverOptions?: ServerOptions});

export interface DevServerSettings {
    // 是否以HTTPS协议代理请求及启动调试服务器
    readonly https?: DevServerHttps;
    // 监听的端口
    readonly port: number;
    // 代理给后端的API请求的URL前缀
    readonly apiPrefixes: string[];
    // 默认的代理后端路径，可以被`--proxy-domain`命令行参数覆盖
    readonly defaultProxyDomain: string;
    // 重写部分请求URL，优先于apiPrefixes
    readonly proxyRewrite: Record<string, string>;
    // 是否启用热更新，其中`simple`只启用样式的更新，`all`则会加入组件的热更新
    readonly hot: boolean;
    // 服务启动后打开的页面
    readonly openPage: string;
}

export interface WebpackDevServerSettings extends DevServerSettings {
    // 在最终调整配置，可以任意处理，原则上这个函数处理后的对象不会再被内部的逻辑修改
    readonly finalize: (serverConfig: Configuration, env: WebpackBuildEntry) => Configuration | Promise<Configuration>;
}

export interface ViteDevServerSettings extends DevServerSettings {
    // TODO: 支持Vite的`finalize`
    readonly finalize: unknown;
}
