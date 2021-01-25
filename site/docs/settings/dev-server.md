---
title: 调试服务器配置
---

## 配置结构

`settings.js`中的`exports.devServer`是对`webpack-dev-server`配置的进一步抽象，它的结构如下：

```ts
interface DevServerSettings {
    // 是否以HTTPS协议代理请求
    readonly https: boolean;
    // 监听的端口
    readonly port: number;
    // 代理给后端的API请求的URL前缀
    readonly apiPrefixes: string[];
    // 默认的代理后端路径，可以被`--proxy-domain`命令行参数覆盖
    readonly defaultProxyDomain: string;
    // 是否启用热更新，其中`simple`只启用样式的更新，`all`则会加入组件的热更新
    readonly hot: 'none' | 'simple' | 'all';
    // 服务启动后打开的页面
    readonly openPage: string;
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

```js
exports.devServer = {
    apiPrefixes: ['/api', '/rest'],
    defaultProxyDomain: 'my-app.dev:8788',
};
```

### 启用HTTPS

如果后端的API需要以`HTTPS`协议来调用，那么可以将`https`属性配置为`true`：

```js
exports.devServer = {
    https: true,
};
```

如果你的测试环境同时支持`HTTP`和`HTTPS`，我们的建议是**不用**打开`https`配置。

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

如果你正好在调试第三方的包，需要主动去修改包的源码来确认问题，那么你可能不希望每一次修改都要重启服务。此时你可以通过`exports.devServer.finalize`来控制第三方包的监听：

```js
exports.devServer = {
    finalize: devServerConfig => {
        // 监听所有文件，当然你也可以写得更精确一些
        devServerConfig.watchOptions.ignored = undefined;
        return devServerConfig;
    },
};
```

具体参考[webpack的说明](https://webpack.js.org/configuration/watch/#watchoptionsignored)来实现。

关于`finalize`详细配置在下文中单独说明。

### 更换代理目标

在有些团队中，不同的开发人员、版本会需要将后端API请求代理到不同的机器或域名、IP上去。但我们不希望每个人都修改一份自己的`settings.js`并引起合并冲突等问题。

为此，在`skr dev`的命令行上，我们支持`--proxy-domain`参数来覆盖`defaultProxyDomain`这一配置：

```shell
skr dev --proxy-domain=my-local-app.dev:8988
```

## 关于热更新

热更新在实际的开发调试中有着非常强的效率提升效果，而`webpack-dev-server`的热更新由`hot`和`hotOnly`两个配置控制。为了简化它们之间的关系，`reSKRipt`对应的`exports.devServer.hot`被设计为一个枚举值：

- `hot: 'none'`：完全关闭热更新，所有的修改都要手动刷新页面才可看到效果。
- `hot: 'simple'`：针对样式资源会进行更新，但动态的脚本逻辑不会热更新。
- `hot: 'all'`：尽可能地启用不同类型资源的热更新。

当`hot: 'all'`时，我们会尽可能地把热更新应用上，这包括使用`react-refresh`来对组件进行热更新。但热更新的机制本身就依赖对代码的约束，所以我们并不保证所有的修改都能正常更新。如果你遇到特殊情况，欢迎提交相关需求。

## 扩展配置

如果你需要最终再对`webpack-dev-server`的配置做自己的调整，可以使用`exports.devServer.finalize`配置。这个配置是一个函数，第一个参数是最终生成的`webpack-dev-server`配置对象，第二个参数是`BuildEntry`对象。

在上文中你已经看到如何利用这一配置实现对第三方代码的变更的监听。再比如你想要给调试服务器增加一个`/version`的路由，访问时返回当前产品的版本号，也是可以通过扩展来实现的：

```js
const pacakgeInfo = require('./package.json');

exports.devServer = {
    finalize: devServerConfig => {
        // 记得调用之前已经有的配置，不要太暴力覆盖
        const {before} = devServerConfig;
        devServerConfig.before = (app, server, compiler) => {
            before && before(app, server, compiler);
            app.get(
                '/version',
                (req, res) => {
                    res.status(200).type('html').end(`${packageInfo.name}@${packageInfo.version}`);
                },
            ),
        };
        return devServerConfig;
    },
};
```

关于`devServer.before`可以参考[官方文档](https://webpack.js.org/configuration/dev-server/#devserverbefore)。
