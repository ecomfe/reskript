---
title: 本地调试
---

## 命令

使用`skr dev`可以打开一个`webpack-dev-server`进行本地的调试。

## 参数

```
--cwd [value]            指定当前工作目录，默认为当前目录
--mode [value]           设置构建的环境模式，可以为development或production，默认为development
--src-dir [value]        指定项目源码所在的目录，默认为src
--build-target [value]   指定调试的特性名称，默认为dev
--proxy-domain [domain]  设置后端API代理的目标地址，用来覆盖reskript.config.{mjs|ts}中的devServer.defaultProxyDomain配置
--host [value]           设置默认的本地服务器域，可以用localhost、loopback（对应127.0.0.1）、ip（对应本机的局域网IP），也可以指定一个自定义的域名或IP
--entry [value]          指定用来调试的入口，即在src/entries下的文件名（不包含后缀名），默认为index
--strict                 打开严格模式，会稍微影响编译速度，增加更多对源码和依赖的检测
--open                   默认会打开浏览器，使用--no-open可以禁用自动打开功能
-h, --help               显示帮助信息
```

除命令行参数外，`reskript.config.{mjs|ts}`中的[`devServer`](../settings/dev-server)配置也会影响构建的行为。

## 本地与线上差异

有时候，在本地开发调试非常成功的项目，部署到线上会出现页面打不开等问题，这往往是以下的原因引起的：

- 因为本地调试与线上版本的特性集声明不同，导致一些分支判断问题。
- `webpack`在`production`模式下启用了大量优化，某些优化造成最终产物出现问题。

这时候，你可以使用`--mode`和`--build-target`参数来实现本地调试与线上环境的完全一致，比如：

```shell
skr dev --mode=production --build-target=stable
```

上面的命令就可以指定线上版本的`stable`特性集，且打开所有的生产环境优化来进行本地调试，理论上线上的问题均能复现，除非是因为微前端集成等运行环境不同产生的。

当然，打开`--mode=production`会非常严重地影响本地构建的速度，同时也会让热更新等功能失效，所以正常情况下没必要开启这个参数。

## 调试其它入口

假设应用有`src/entries/index.tsx`和`src/entries/mobile.tsx`两个入口，默认情况下使用`skr dev`只能调试到`index`这个入口，另一个入口是无法被访问到的。

你可以使用`skr dev --entry=mobile`来启动调试服务器并将`mobile.tsx`指定为入口。

一次调试仅能指定一个入口，考虑到路由冲突（如`index`入口中有`/mobile`这个路由，同时又有`mobile`这个入口），当前无法同时调试多入口。

## 严格模式

当使用`--strict`参数后，构建会进入严格模式，请参考[配置解密 - 严格模式](../advanced/config-insiders#严格模式)了解这个开关的作用。

## 远程开发

如果你处在一个远程开发的环境，包括但不限于使用远程桌面、VSCode Remote等，此时你在启动本地调试环境后，是无法用`localhost:8080`来访问到页面的。

你可以使用`--host=ip`参数来让`skr dev`默认打开远程IP的页面：

```shell
skr dev --host=ip
```

`reSKRipt`会找到机器上一个可用的IP地址，绝大部分情况下这个IP是正确的，如果出现一些原因导致IP无法访问，你就不得不自己研究如何访问到开发机了。

由于在大部分的公司环境里用的是动态的IP分配，一台电脑的IP是会变化的，所以如果你是在自己的电脑上启动调试，最好不要去使用IP访问，避免休眠再开机后因为IP变化导致页面访问不到。

## 微前端开发

如果你本地启动的应用会被另一个地址的微服务框架加载，那么默认的使用`/assets`作为路径的资源都会在另一个地址上失效。此时同样可以使用`--host`参数进行兼容，即便是本地开发，你也可以这样使用：

```shell
skr dev --host=localhost
```

此时虽然依然通过`http://localhost:8080`访问你的应用，但所有的资源路径都会被强制设定为`http://localhost:8080/assets/*`这样的绝对地址，因此在另一个IP、域名、端口下也可以顺利加载。
