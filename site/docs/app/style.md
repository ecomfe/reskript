---
title: 编写样式
---

在上一章[编写组件](./component)中我们了解到可以快速地通过JavaScript或TypeScript编写一个组件，也了解了`@/`这一特殊的别名。本章节将介绍如何编写样式文件，以及由CSS Module产生的样式使用的特殊性。

## 支持语言

`reSKRipt`支持CSS和LESS作为样式语言，但不支持如SASS、Stylus等其它语言。

**考虑到LESS本身的编译性能不太理想，也考虑到React推荐组件粒度足够小，不会让一个组件有太复杂的样式，因此我们比较推荐你尽量使用纯CSS来编写样式。**

### CSS Module

[CSS Modules](https://github.com/css-modules/css-modules)是由社区提出的CSS的一种编译方法，它会将CSS中的class、id等编译成一个带有哈希的全局唯一的标识，来使各个样式相互隔离，不会产生全局名称上的冲突。

`reSKRipt`在全局启用了CSS Modules，所有的`.css`和`.less`文件都会经过Modules处理，除以下2种情况外：

- 后缀名为`.global.css`或`.global.less`。
- 属于第三方的样式，即在`node_modules`下。

## 让TypeScript支持样式

我们推荐用TypeScript来编写你的应用，但TypeScript并不支持`.less`、`.svg`、`.png`这些文件的类型定义，所以我们需要先进行手动的声明。

建立一个`src/interface/static.d.ts`文件，我们把所有非脚本类型的文件的类型定义都放在里面：

```ts
/* eslint-disable */
declare module '*.css' {
    type Primitive = string | number | boolean | null | undefined;
    const content: {
        [className: string]: string;
        (...names: Array<Primitive | Record<string, Primitive>>): string;
    };
    export default content;
}

declare module '*.less' {
    import style from '*.less';
    export default style;
}

declare module '*.png' {
    const url: string;
    export default url;
}

declare module '*.svg' {
    import {ComponentType, SVGProps} from 'react';
    export const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;
    const url: string;
    export default url;
}
```

如果你需要`.gif`、`.jpg`、`.ttf`等其它二进制格式，也可以参考上文的`*.png`来定义。

你在上面的定义中，应该也已经窥视到了`.css`、`.less`和`.svg`与其它类型的文件有所不同，我们在本章会重点说明样式的使用方式，在后续章节会说明`.svg`的使用。

## 增加全局样式

在一个应用中，我们往往需要一些全局的样式，它与具体组件无关，更多的是对`font-family`、`body`的`margin`等的处理。

我们建议这些全局的样式被放在`src/styles`目录下，且统一用一个`index.ts`文件来引入，所以你的目录结构应该如下：

```
/src
    /styles
        app.global.css # 放全局样式
        index.ts
```

在`app.global.css`中，我们来覆盖一些全局样式，再增加几个CSS变量：

```css
html,
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

:root {
    --color-primary: #389af2;
    --color-warning: #f69f57;
    --color-error: #f5443d;
}
```

再从`index.ts`中引入它:

```ts
import './app.global.css';
```

需要特别注意的是，**对于`.global.css`并没有CSS Modules的编译，所以引入它们不需要指定一个变量名**。

最后，我们在`src/entries/index.ts`中再把`styles/index.ts`也引入：

```ts
import {render} from 'react-dom';
import '@/styles';

// 初始化代码
```

截止此刻，我们已经让应用中有了一个全局的样式覆盖。如果你需要使用`reset-css`等其它的全局样式，同样可以在`src/styles/index.ts`中引入。

## 定义全局样式变量

如果你使用LESS来编写样式，那么经常会用到它的变量功能。有一些变量它可能是全局的，你希望尽可能在任何`.less`文件中都能用到，也并不想每次用的时候要加一个`@import (reference) ...`的语句。

在`reSKRipt`中，你只需要在`src/styles`下放置一个后缀为`.var.less`的文件就可以声明全局全用的变量。

我们试着创建一个`src/styles/theme.var.less`文件，再写入一些变量：

```less
@header-height: 50px;
@font-size-base: 14px;
```

注意，这个文件**不需要**被任何地方`import`引入，只需要放在那边，它默认会在全局生效。

## 编写组件样式

### 引入样式

最后，我们回到最常见的场景：为组件编写样式。

我们先尝试建立一个`src/components/Header`目录，在这个目录下，我们计划实现一个顶栏的组件，它是一个固定在顶部的带有深色背景的条，并且包含了LOGO和一个全局搜索框。

我们先把对应的样式写到`Header/index.less`中：

```less
.root {
    position: fixed;
    top: 0;
    left: 0
    right: 0;
    height: @haeder-height;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: #1e1e1e;
}

.dark {
    background-color: #4f4f4f;
}

.logo {
    margin-right: 20px;
}

.logo-image {
    width: 40px;
    height: 40px;
}

.search {
    width: 240px;
}
```

可以观察到上面的`.root`类中使用了`@header-height`这一LESS变量，它是在上文的`src/styles/theme.var.less`中定义的，因此可以直接引用。

我们再回到组件的实现上，先建立`Headers/index.tsx`文件，把`index.less`给引入进来：

```tsx
import c from './index.less';
```

### 了解样式函数

你应该注意到，上文在`index.less`被引入时，绑定了一个叫做`c`的变量。

这正是`reSKRipt`内置的一个功能。因为启用了CSS Modules，所以正常来说样式引入后是一个对象，你可以这样使用：

```tsx
import styles from './index.less';

<div className={styles.root} />
```

但`reSKRipt`更进一步，在此基础上使用[classnames](https://www.npmjs.com/package/classnames)对样式对象做了一次封装，此处绑定的`c`变量事实上是一个函数，它的作用与`classNames`函数完全一致，并且还具备原本对象类型的效果，因此以下使用方法都是合理的：

```tsx
import c from './index.less';

// 保持与对象相同的用法
c.root;
// 有横线连接的类名会被转为camelCase，下面的调用对应.size-small
c.sizeSmall;
// 字符串作为参数，会返回编译后的串
c('root');
// 传多个字符串，会做拼接
c('root', 'dark');
// 使用对象来根据条件选择性地使用某些类名
c('root', {'size-small': props.small});
// 如果字符串不在LESS中定义，会保持原样，不会加上哈希转义
c('external-class');
```

还有其它更多的用法，请参考[classnames的文档](https://www.npmjs.com/package/classnames#usage)来了解，不在此一一赘述。

### 为组件增加样式

在了解完`reSKRipt`对样式的处理后，我们简单地为`Header`组件增加一些样式：

```tsx
import {Input} from 'antd';
import logo from './logo.png'; // 图片依然是标准的引入后变成字符串
import c from './index.less';

interface Props {
    mode: 'light' | 'dark';
}

function Header({mode}: Props) => {
    return (
        <header className={c('root', {dark: mode === 'dark'})}>
            <a className={c.logo} href="/">
                <img className={c.logoImage} src={logo} alt="回到首页" />
            </a>
            <Input.Search className={c.search} />
        </header>
    );
}
```

在将`Header`组件加入`App`并成功运行应用后，观察开发者工具中各个HTML元素的`class`属性，你会发现类似`header-root-8bff2`这样的串。出于调试和问题排查方便，`reSKRipt`将组件的名称、LESS中的类名都放到了这个`class`属性上，并增加了一个哈希值来防止冲突，最终产生了一个同时具备可读性并全局唯一的标识。

## 总结

在本章中，我们重点讲解了样式的编写与管理，`reSKRipt`在这一块的处理有以下特点：

- 全局使用CSS Modules，除了`.global.{css,less}`和第三方样式外。
- 全局样式推荐使用`src/styles/*.global.css`进行管理，使用`src/styles/indes.ts`统一引入。
- 可创建`src/styles/*.var.less`来声明全局可用的LESS变量和mixin。
- 样式文件被`import`引入后会变成一个与`classnames`功能相同的函数，也具备对象访问具体类名的功能。
- 组件可以使用`import c from './index.less'`的形式引入样式后与`className`绑定使用。
