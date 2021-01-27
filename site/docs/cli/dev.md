---
title: 本地调试
---

## 命令

使用`skr dev`可以打开一个`webpack-dev-server`进行本地的调试。

## 参数

```
--cwd [value]            指定当前工作目录，默认为当前目录
--mode [value]           设置构建的环境模式，可以为development或production，默认为production
--src [value]            指定项目源码所在的目录，默认为src
--build-target [value]   指定调试的特性名称，默认为dev
--proxy-domain [domain]  设置后端API代理的目标地址，用来覆盖reskript.config.js中的devServer.defaultProxyDomain配置
--open [value]           选择自动打开浏览器页面的地址，可以为local（打开localhost）或remote（打开远程IP，用于远程开发场景），默认为local
-h, --help               显示帮助信息
```

除命令行参数外，`reskript.config.js`中的[`devServer`](../settings/dev-server)配置也会影响构建的行为。

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

## 远程开发

如果你处在一个远程开发的环境，包括但不限于使用远程桌面、vscode remote等，此时你在启动本地调试环境后，是无法用`localhost:8080`来访问到页面的。

你可以使用`--open=remote`参数来让`skr dev`默认打开远程IP的页面：

```shell
skr dev --open=remote
```

`reSKRipt`会找到机器上一个可用的IP地址，绝大部分情况下这个IP是正确的，如果出现一些原因导致IP无法访问，你就不得不自己研究如何访问到开发机了。

由于在大部分的公司环境里用的是动态的IP分配，一台电脑的IP是会变化的，所以如果你是在自己的电脑上启动调试，最好不要去使用IP访问，避免休眠再开机后因为IP变化导致页面访问不到。
