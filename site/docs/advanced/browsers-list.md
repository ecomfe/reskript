---
title: 指定浏览器兼容性
---

你可以在项目的根目录放置`.browserslistrc`文件来指定你需要的兼容性。

这个配置文件的详细内容可以参考[官方文档](https://github.com/browserslist/browserslist#browserslistrc)。

所有支持`browserslist`的工具都会从这个文件中获取配置，包括了`babel`、`post-css`等。

不过有一点需要注意，`reSKRipt`默认把`regenerator-runtime`给去掉了，所以你指定的浏览器兼容性如果不支持`function *`的话，构建后的东西大概率是无法运行的。

如果你在运行的时候看到`regeneratorRuntime is not defined`之类的错误，那肯定是这个问题，重新确认一下你要兼容的浏览器范围。

如果真的一定要兼容到低版本的浏览器，你可以自己手动安装一下再手动引入：

```shell
npm install regenerator-runtime
```

在`src/entries/index.tsx`或其它的入口中加上：

```ts
import 'regenerator-runtime/runtime';
```
