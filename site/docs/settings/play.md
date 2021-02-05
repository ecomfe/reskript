---
title: 单组件调试配置
---

## 配置结构

`reskript.config.js`中的`exports.play`用来配置调试单个组件时的相关行为：

```ts
interface PlaySettings {
    // 注入额外资源
    readonly injectResources: string[];
    // 用JSX定义组件预览的外层结构
    readonly wrapper: string;
}
```

以上所有的配置均可以省略。

## 增加全局资源

有时候组件本身的展示是依赖一些全局资源的，比如`src/styles/app.global.less`里可能声明了一些全局的样式。此类文件可以通过`exports.play.injectResources`来注入，例如一个典型的配置：

```js
const path = require('path');

exports.play = {
    injectResources: [
        path.join(__diranme, 'src', 'styles'),
    ],
};
```

但LESS的注入不需要在这里声明，依然使用`exports.build.style.resources`来管理。

## 为组件预览增加外层结构

有时候你调试的组件是依赖外层的DOM结构的，例如一个组件返回这样的内容：

```jsx
<>
    <div style={{width: 200}}>
        Sidebar
    </div>
    <div style={{flex: 1}}>
        Content
    </div>
</>
```

那么它就隐式地要求它的父元素是一个`display: flex`的布局。

遇到这种情况，你可以通过`exports.play.wrapper`来定义一个外层的布局，这个定义是一段JSX结构，并可以使用`{children}`放置实际的预览界面，比如：

```js
exports.play = {
    wrapper: `
        <div style={{display: 'flex'}}>
            {children}
        </div>
    `,
};
```

注意虽然`wrapper`的**内容**是一段JSX，但它本身是**字符串**类型的。
