---
title: 单组件调试配置
---

## 配置结构

`reskript.config.js`中的`exports.play`用来配置调试单个组件时的相关行为：

```ts
interface PlaySettings {
    // 注入额外资源
    readonly injectResources: string[];
}
```

以上所有的配置均可以省略。

## 增加全局资源

有时候组件本身的展示是依赖一些全局资源的，比如`src/styles/app.global.less`里可能声明了一些全局的样式。此类文件可以通过`exports.play.injectResources`来注入，例如一个典型的配置：

```js
const path = require('path');

exports.play = {
    injectResources: [
        path.join(__dirname, 'src', 'styles'),
    ],
};
```

但LESS的注入不需要在这里声明，依然使用`exports.build.style.resources`来管理。

更多单组件调试的高级手段可参考[高阶应用 - 调试单个组件](../advanced/debug-component)章节的详细说明。
