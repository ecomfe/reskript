---
title: 调试单个组件
---

在一个比较复杂的应用的开发中，有时候我们希望针对其中一个组件做些调试，但写一个干净的页面保留一个组件比较麻烦，这时我们可以使用`skr play`功能来将单个组件抽取出来并打开一个可互动的调试界面。

## 使用方法

首先安装上`@reskript/cli-play`：

```shell
npm install --save-dev @reskript/cli-play`
```

你需要`react`和`react-dom`才能够运行，当然相信你都有需要调试的组件了，这些最基本的依赖肯定是安装上了的。

指定你要调试的组件的文件，比如我们想调试一个简单的`src/components/Loading`组件，便可以这样：

```shell
skr play src/components/Loading/index.tsx
```

你可以参阅[命令行 - 调试单个组件](../cli/play)了解命令行上可用的参数。

等待一段时间，命令行中会显示出调试服务器的信息：

```
 DONE  Compiled successfully in 1255ms                                                                                                                2:30:11 PM

 I  Your application is running here: http://localhost:9999/
 I                                or: http://192.168.1.20:9999/
```

调试服务器会固定在`9999`端口打开，在浏览器中打开`http://localhost:9999`就能看到互动式的调试页面：

![](./assets/playground.png)

## 调整组件

你可以在左侧的编辑器中直接使用组件，可以给组件添加一些属性，右侧会展示相应的效果。

在互动界面上，输入会有500毫秒的防抖效果，所以你在输入完后需要等待一小段时间，才能在右侧看到变化。

另外，热更新也是默认支持的，你可以修改`src/components/Loading/index.tsx`文件的内容，浏览器中会自动刷新。

如果组件需要发请求，那么`reskript.config.js`中的`exports.devServer`中代理API相关的配置也会地生效，可以正常地把请求代理给后端服务。

## 受限功能

已知现在有以下的功能还无法支持：

1. 直接`import`外部的包，包括`react`中的`useState`等。
2. 不支持`redux`的状态，也没有啥办法引入`Provider`。
