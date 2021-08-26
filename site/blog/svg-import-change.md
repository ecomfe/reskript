---
title: 导入SVG文件规则调整
date: 2021-08-03
author: otakustay
author_url: https://github.com/otakustay
author_image_url: https://www.gravatar.com/avatar/d7479a703555cc76b277040e5be9b8ca
tags: [build, svg]
---

在之前版本的`reSKRipt`中，你可以通过`ReactComponent`这一命名导出中获得一个SVG转换出来的组件：

```jsx
import {ReactComponent as IconClose} from './close.svg';

<IconClose />
```

从`reSKRipt v1.13.0`开始，这个规则将发生一些改变。

## 背景

在Webpack的发展历史上，[url-loader](https://github.com/webpack-contrib/url-loader)是负责将一个资源转为一个引用它的URL的准官方工具。但随着[新版本的Webpack支持asset module](https://webpack.js.org/guides/asset-modules/)，`url-loader`已经被官方标记为废弃了。

基于这一个技术的发展，原有的[svg-mixed-loader](https://github.com/ecomfe/svg-mixed-loader)也不再能独立地发展。我在[这个issue](https://github.com/webpack/webpack/issues/13870)中和Webpack官方进行了一系列的探讨，最终官方的意见是比较直白的：

> 不要让loader去做这么复杂的事，应该在规则上区分它们，并用资源查询来处理。

基于官方给出的意见，`reSKRipt`也计划做出相应的调整。

## 调整后的使用方式

如果你需要一个SVG为你提供URL字符串，则与原有保持一样。：

```js
import url from './close.svg';
```

如果你希望获得一个组件，需要调整代码：

```js
import IconClose from './close.svg?react';
```

注意在最后增加了一个`?react`的查询。

如果你两者都要，那么你需要写2条`import`语句。

### 在CSS中使用

在之前的版本中，如果你在CSS中引入一个SVG文件，它大概率是不能工作的：

```css
.root {
    background-image: url("./background.svg");
}
```

因为SVG被处理成了一个具备URL和组件代码的混合内容。为了保持向后兼容性，我们现在无法修改这个行为，但增加了一个方式让CSS可以直接引用图片：

```css
.root {
    background-image: url("./background.svg?asset");
}
```

你需要在资源上增加一个`?asset`的查询，即告知`reSKRipt`你只需要它被转化为一个URL。

### 废弃警告

如果你现在依然使用原来的`ReactComponent`导出，你的代码将正常工作，但在浏览器的控制台中将看到一条类似的警告：

```
import {ReactComponent} from '*.svg' is deprecated, please use import ReactComponent from '*.svg?react' instead.
This warning emits because you imported {ReactComponent} from /path/to/filename.svg
```

这条警告仅在`development`模式下出现，你可以快速定位到相关的代码并进行修改。

## 关于类型

当然，现在的方式使得`.svg`文件随着查询的不同会呈现出不同的类型，因此我们的TypeScript定义也要相应调整：

```ts
declare module '*.svg' {
    const url: string;
    export default url;
}

declare module '*.svg?react' {
    import {ComponentType, SVGAttributes} from 'react';

    const Component: ComponentType<SVGAttributes<SVGElement>>;
    export default Component;
}
```

以上代码我们建议放到`src/types/static.d.ts`中。
