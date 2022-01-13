---
title: 调试单个组件
---

## 命令

使用`skr play`可以打开一个单组件的互动试调试环境。

## 参数

```
--cwd [value]           指定当前工作目录，默认为当前目录
--build-target [value]  指定调试的特性名称，默认为dev
--port [value]          指定监听的端口，默认使用9999端口
--host [value]          设置默认的本地服务器域，可以用localhost、loopback（对应127.0.0.1）、ip（对应本机的局域网IP），也可以指定一个自定义的域名或IP
--setup [value]         指定路径的模块为全局配置
--concurrent-mode       打开React的并发模式
-h, --help              显示帮助信息
```

其中`--setup`会覆盖`reskript.config.{mjs|ts}`中的`play.defaultGlobalSetup`配置。`--concurrent-mode`会覆盖`play.defaultEnableConcurrentMode`配置。

参考[配置 - 单组件调试配置](../settings/play)了解更多配置内容。更多单组件调试的高级手段可参考[高阶应用 - 调试单个组件](../advanced/debug-component)章节的详细说明。
