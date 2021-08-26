---
title: 用skr play调试需要路由的组件
date: 2021-08-03
author: otakustay
author_url: https://github.com/otakustay
author_image_url: https://www.gravatar.com/avatar/d7479a703555cc76b277040e5be9b8ca
tags: [play, debug, router]
---

在使用`reSKRipt`的时候，我们非常推荐使用[skr play命令](https://ecomfe.github.io/reskript/docs/advanced/debug-component)来调试单个组件，它会为你提供一个可实时编程的界面，实时看到对应组件的可交互界面。

但并不是每一个组件都纯粹到可以没有外部依赖就跑起来的，其中很典型的一种情况就是**组件依赖了路由**，例如我们需要用`useParams()`来获取URL中的参数，或使用`useLocation()`拿到具体的路径信息。由于`skr play`默认的调试环节是不具备路由等环境的，因此需要我们做一些额外的配置工作。

## 目录结构

我们假定正在开发一个`Foo`组件，它需要使用`react-router-dom`才能正常展示，那么可以有下面这样的目录结构：

```
/src
    /components
        /Foo
            /__repl__
                index.play.js
            index.tsx
```

其中`src/components/Foo/index.tsx`为组件的实现代码。我们可以看到这个结构中多了一个`src/components/Foo/__repl__/index.play.js`文件，这个被称为`skr play`的配置文件。这个文件的名字与组件文件名同名，如果你的组件文件名是`Bar.tsx`，那么它就是`__repl__/Bar.play.js`。

## 注入外部依赖

在`__repl__/index.play.js`中，我们可以编写以下内容：

```js
import {MemoryRouter} from 'react-router-dom';

export const provides = {
    MemoryRouter,
};
```

可以看到，我们引用了`react-router-dom`中的`MemoryRouter`，并通过`export const provides`对象把它导了出去。

在配置文件中，`export const provides`导出可以将你需要的内容“带给”`skr play`的调试现场。

## 使用依赖

当你使用`skr play src/components/Foo/index.tsx`打开调试现场时，你看到的代码中依然没有`MemoryRouter`，此时你还是不能正确地看到组件的长相。你需要将左侧编辑器中的代码调整为这样：

```jsx
function Repl() {
    return (
        <I.MemoryRouter initialEntries={['/foo/bar/123']}>
            <Foo />
        </I.MemoryRouter>
    );
}
```

简单来说，所有你在配置文件的`provides`对象里提供的东西，都可以在界面中用`I.xxx`拿来用。

当然，为了调试方便，也可以把`Link`也提供出去，在调试界面里加几个链接来快速跳到某些URL下看效果。

## 总结

我们介绍了通过`__repl__/xxx.play.js`配置文件导出依赖给调试现场的方法，重点在于：

1. 有一个`__repl__/xxx.play.js`作为`skr play`的配置文件，与组件一一对应。
2. 使用`export const provides`对象提供依赖。
3. 在调试现场使用`I.xxx`使用依赖。

除了路由，你也可以用相同的方法解决如`Context`等问题。
