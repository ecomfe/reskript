---
title: 引入资源为URL或内容文本
---

`reSKRipt`同时为Webpack与Vite提供了引入资源为URL或内容文本的功能。

## 引入为URL

使用`?url`查询可以将任意资源引入为URL：

```ts
import fileUrl from './someStaticFile.js?url';

console.log(fileUrl); // 文件生成的URL，如：4b1ecf094b34871d3ce3.js
```

:::note
被引入为URL的资源不会经过其它处理，如引入`.js?url`则该文件并不会被`babel`等处理器编译。
:::

## 引入为内容文本

使用`?raw`查询可以将什么问题资源引入为内容文本：

```ts
import fileUrl from './someStaticFile.js?url';

console.log(fileUrl); // 文件内容，如：console.log('file content');
```

:::note
被引入为内容文本的资源不会经过其它处理，如引入`.js?raw`则该文件并不会被`babel`等处理器编译。
:::
