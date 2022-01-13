---
title: 调试服务器配置
---

## 配置结构

`reskript.config.{mjs|ts}`中的`devServer`是对`webpack-dev-server`配置的进一步抽象，它的结构如下：

```ts
export type DevServerHttps = {proxy: boolean} & ({} | {client: true, serverOptions?: ServerOptions});

interface DevServerSettings {
    // 是否以HTTPS协议代理请求及启动调试服务器
    readonly https: DevServerHttps;
    // 监听的端口
    readonly port: number;
    // 代理给后端的API请求的URL前缀
    readonly apiPrefixes: string[];
    // 重写部分请求URL，优先于apiPrefixes
    readonly proxyRewrite: Record<string, string>;
    // 默认的代理后端路径，可以被`--proxy-domain`命令行参数覆盖
    readonly defaultProxyDomain: string;
    // 是否启用热更新，其中`simple`只启用样式的更新，`all`则会加入组件的热更新
    readonly hot: boolean;
    // 服务启动后打开的页面
    readonly openPage: string;
    // 开辟Node服务器的参数
    readonly serverOptions: ServerOptions;
    // 在最终调整配置，可以任意处理，原则上这个函数处理后的对象不会再被内部的逻辑修改
    readonly finalize: (serverConfig: WebpackDevServerConfiguration, env: BuildEntry) => WebpackDevServerConfiguration;
}
```

以上所有的配置均可以省略，其中`port`的默认值为`8080`。

## 代理API

### 配置代理路径

在大部分的应用中，后端的所有API都集中在一个域名上，很少见到不同的API请求需要代理到不同域名的情况。基于这一考虑，`reSKRipt`简化了API代理的配置，主要用到以下的属性：

- `apiPrefixes`：一个URL的前缀数组，在这数组中声明的URL前缀的请求都会被代理到后端。
- `defaultProxyDomain`：代理的后端地址，这个地址**不需要包含协议部分**（如`http://`或`https://`），只需要声明域名（或IP）和端口。

比如在产品中，以`/api`和`/rest`为前缀的请求都是后端的API，后端的地址为`my-app.dev`，测试环境暴露在端口`8788`上，使用HTTP协议，那么可以使用如下的配置：

```ts
export default configure(
    'webpack',
    {
        devServer: {
            apiPrefixes: ['/api', '/rest'],
            defaultProxyDomain: 'my-app.dev:8788',
        },
    }
);
```

### 启用HTTPS

`https`属性用于配置代理后端接口以及响应前端请求时是否使用HTTPS协议，它的取值如下：

- 当值为`true`时，仅在代理后端接口时启用HTTPS协议，响应前端请求保持HTTP协议。**这是一个兼容历史情况的值，不建议使用**。
- 当`proxy`属性为`true`时，代理后端接口启用HTTPS协议。
- 当`client`属性为`true`时，响应前端请求使用HTTPS协议，你需要通过`serverOptions`属性提供`https.createServer`需要的选项。

如果仅需要代理后端的API时使用HTTPS协议：

```ts
export default configure(
    'webpack',
    {
        devServer: {
            https: {
                proxy: true,
            },
        },
    }
);
```

如果需要响应前端请求时使用HTTPS协议：

```ts
export default configure(
    'webpack',
    {
        devServer: {
            https: {
                client: true,
                serverOptions: {
                    key: './path/to/server.key',
                    cert: './path/to/server.crt',
                },
            },
        },
    }
);
```

如果你已经有系统级的证书可用于`localhost`，则可以不传递`serverOptions`参数。

### 本地网络代理

如果你在本地设置有网络代理，且通过代理才能连接到后端，那么你需要根据`https`配置是否打开，在环境变量中声明`http_proxy`或`https_proxy`。`reSKRipt`会自动读取这2个环境变量，并将其作为代理请求时的中间节点。

相反，如果本地配置的网络代理影响了将请求代理到后端，那么你需要清除掉相应的环境变量：

```shell
unset http_proxy
unset https_proxy
```

**当清除或修改环境变量后，你需要重启调试服务器才会生效。**

### 监听第三方代码变更

默认情况下，`skr dev`不会监听`node_modules`下的代码的变化。我们有理由相信这些代码并不会频繁变更，而大量的监听会影响调试服务器的性能和内存占用。

如果你正好在调试第三方的包，需要主动去修改包的源码来确认问题，那么你可能不希望每一次修改都要重启服务。此时你可以通过`devServer.finalize`来控制第三方包的监听：

```ts
export default configure(
    'webpack',
    {
        devServer: {
            finalize: devServerConfig => {
                // 监听所有文件，当然你也可以写得更精确一些
                devServerConfig.static.watch.ignored = undefined;
                return devServerConfig;
            },
        },
    }
);
```

具体参考[webpack的说明](https://webpack.js.org/configuration/dev-server/#watch)来实现。

关于`finalize`详细配置在下文中单独说明。

### 更换代理目标

在有些团队中，不同的开发人员、版本会需要将后端API请求代理到不同的机器或域名、IP上去。但我们不希望每个人都修改一份自己的`reskript.config.{mjs|ts}`并引起合并冲突等问题。

为此，在`skr dev`的命令行上，我们支持`--proxy-domain`参数来覆盖`defaultProxyDomain`这一配置：

```shell
skr dev --proxy-domain=my-local-app.dev:8988
```

### 多后端代理配置

对于更复杂的应用，有可能后端在开发环境中使用多服务且没有一个统一的入口，所以不同的接口路径需要代理到不同的后端上。

对于此类情况，你可以使用`proxyRewrite`配置，例如以下的配置：

```ts
export default configure(
    'webpack',
    {
        devServer: {
            defaultProxyDomain: 'my-app.dev:8788',
            proxyRewrite: {
                '/api/user': 'user-app.dev:8786',
                '/api/inventory': 'inventory-app.dev:8787',
            },
        },
    }
);
```

是述配置表达了如下的转发规则：

- 当请求的URL前缀为`/api/user`时，请求将代理到`user-app.dev:8786`下。
- 当请求的URL前缀为`/api/inventory`时，请求将代理到`user-app.dev:8786`下。
- 其它请求都代理到`my-app.dev:8788`下。

比如请求的路径为`/api/user/list?page=1`，则目标的URL为`user-app.dev:8786/list?page=1`。**需要注意的是，在`proxyRewrite`中配置的前缀不会变成代理后URL的一部分**。

## 关于热更新

热更新在实际的开发调试中有着非常强的效率提升效果，`reSKRipt`内置集成了热更新相关的逻辑，简化了它的对外配置，`devServer.hot`被设计为一个`boolean`类型：

- `hot: true`：尽可能地启用不同类型资源的热更新，包括使用`react-refresh`进行组件热更新。
- `hot: false`：完全关闭热更新。

:::note
当你使用`--mode=production`启动调试服务器时，会始终关闭热更新以保持与生产环境尽可能的一致。
:::

## 扩展配置

如果你需要最终再对`webpack-dev-server`的配置做自己的调整，可以使用`devServer.finalize`配置。这个配置是一个函数，第一个参数是最终生成的`webpack-dev-server`配置对象，第二个参数是`BuildEntry`对象。

在上文中你已经看到如何利用这一配置实现对第三方代码的变更的监听。再比如你想要给调试服务器增加一个`/version`的路由，访问时返回当前产品的版本号，也是可以通过扩展来实现的：

```ts
import fs from 'node:fs';
import {configure} from '@reskript/settings';

const pacakgeInfo = JSON.parse(fs.readFileSync('./package.json'), 'utf-8');

export default configure(
    'webpack',
    {
        devServer: {
            finalize: devServerConfig => {
                // 记得调用之前已经有的配置，不要太暴力覆盖
                const {setupMiddlewares} = devServerConfig;
                devServerConfig.setupMiddlewares = (middlewares, devServer) => {
                    const returnValue = setupMiddlewares?.(devServer) ?? middlewares;
                    devServer.app.get(
                        '/version',
                        (req, res) => {
                            res.status(200).type('html').end(`${packageInfo.name}@${packageInfo.version}`);
                        }
                    );
                    return returnValue;
                };
                return devServerConfig;
            },
        },
    }
);
```

关于`devServer.setupMiddlewares`可以参考[官方文档](https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares)。
