# @reskript/cli-dev

使用webpack-dev-server进行应用的调试。

## 正常使用

使用`skr dev`启动调试服务器，初次构建完成后会自动打开网页。

```
Usage: dev [options]

Start dev server for debugging

Options:
  --cwd [value]            override current working directory (default: process.cwd())
  --mode [value]           set build mode, default to "development" (default: "development")
  --src-dir [value]        specify the dir containing source files relative to cwd (default: "src")
  --build-target [value]   set build target, default to "dev" (default: "dev")
  --proxy-domain [domain]  set api proxy domain, only domain part (www.example.com) is required
  --open [value]           choose open "local" (localhost) or "remote" (ip) browser page (default "local")
  -h, --help               output usage information
```

在调试过程中，会监听`reskript.config.js`的变更并重启调试服务器，重启后不会自动打开网页。

## 配置调试服务器

由`reskript.config.js`导出`devServer`对象，可包含以下属性：

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
    readonly hot: boolean;
    // 服务启动后打开的页面
    readonly openPage: string;
    // 在最终调整配置，可以任意处理，原则上这个函数处理后的对象不会再被内部的逻辑修改
    readonly finalize: (serverConfig: WebpackDevServerConfiguration, env: BuildEntry) => WebpackDevServerConfiguration;
}
```

调试服务器同样会参考`build`、`featureMatrix`和`plugins`配置，具体请参考[config-webpack的说明](../config-webpack)。
