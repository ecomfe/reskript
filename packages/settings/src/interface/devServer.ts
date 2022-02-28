import {IncomingMessage, ServerResponse} from 'node:http';
import {ServerOptions as HttpsServerOptions} from 'node:https';
import {Configuration} from 'webpack-dev-server';
import {ServerOptions} from 'vite';
import {ViteBuildEntry, WebpackBuildEntry} from './shared.js';

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => void) => void;

export interface MiddlewareHook {
    use: (route: string, fn: Middleware) => void;
    get: (route: string, fn: Middleware) => void;
    post: (route: string, fn: Middleware) => void;
    put: (route: string, fn: Middleware) => void;
    delete: (route: string, fn: Middleware) => void;
    patch: (route: string, fn: Middleware) => void;
}

export interface MiddlewareCustomization {
    before: MiddlewareHook;
    after: MiddlewareHook;
}

interface ClientHttps {
    client: true;
    serverOptions?: HttpsServerOptions;
}

export type DevServerHttps = {proxy?: boolean} & ({client?: false} | ClientHttps);

export type CustomizeMiddleware = (customization: MiddlewareCustomization) => void;

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
    // 对调试服务器追加一些配置或功能
    readonly customizeMiddleware: CustomizeMiddleware;
}

export interface WebpackDevServerSettings extends DevServerSettings {
    // 在最终调整配置，可以任意处理，原则上这个函数处理后的对象不会再被内部的逻辑修改
    readonly finalize: (serverConfig: Configuration, env: WebpackBuildEntry) => Configuration | Promise<Configuration>;
}

export interface ViteDevServerSettings extends DevServerSettings {
    readonly finalize: (serverConfig: ServerOptions, env: ViteBuildEntry) => ServerOptions | Promise<ServerOptions>;
}
