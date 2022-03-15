---
title: 与原生Vite的区别
---

本文摘录使用reSKRipt的Vite引擎进行构建、调试时，与直接使用Vite对编写代码的影响。

## CSS Modules

所有的`.less`、`.css`文件，除非后缀为`.global.{css,less}`，均被视为CSS Modules文件。

与Vite使用`.module.{css,less}`的白名单方式引入CSS Modules不同的是，reSKRipt从工程的角度考虑，继续保持了原有的“黑名单”的形式。即默认样式文件启用CSS Modules，使用特定的后缀（`.global.{css,less}`）来豁免。

## 样式函数

针对启用了CSS Modules的样式文件工，其`import`后的默认导出为一个函数。你可以通过[应用开发 - 编写样式](../app/style#了解样式函数)来了解样式函数的作用。

简单来说，你可以如同`classnames`库一样去使用这个函数，并且会提供与CSS Modules处理后的样式类名对应的功能：

```tsx
import c from './index.less';

<div className={c('root', {dark: props.isDarkMode})} />
```

## 无需入口HTML

reSKRipt内置了入口模板，且在模板上增加了大量实用功能。正常情况下你无需放置`index.html`文件，只需有`src/entries/*.ts`，reSKRipt会自动生成入口的HTML结构。

如果你需要自定义模板，可以使用`src/entries/*.ejs`来制作模板，并支持简单的EJS模板语法。具体可以参考[多应用入口](./multiple-entry#自定义HTML模板)中的说明来使用入口模板。

## SVG组件化

你可以使用`import Icon from './icon.svg?react'`的方式来将一个SVG文件引入为React组件。
