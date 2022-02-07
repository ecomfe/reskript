---
title: 自动接入Qiankun
---

## 插件说明

在构建时期处理与[qiankun](https://qiankun.umijs.org/)的整合问题。

这个插件会做以下几件事：

1. 把产出的格式修改为UMD格式，允许在运行时动态加载。
2. 如果打开了`setupDevServer`配置，会在`dev-server`上增加一个代理，本地调试时会打开一个`qiankun`的容器页面，并在该页面中加载实际的产品代码。

通过这个插件，可以在本地调试的时候也基于`qiankun`，尽早地发现与其生命周期相关的兼容性问题。

**注意：这个插件并不会帮你写`qiankun`的生命周期函数，你依然需要[参考文档](https://qiankun.umijs.org/guide/getting-started#1-exports-lifecycles-from-sub-app-entry)实现这些函数。**

## 使用

### 安装

```shell
npm i -D @reskript/plugin-qiankun
```

### 增加插件

```ts
// reskript.config.ts
import {configure} from '@reskript/settings';
import qiankun = require('@reskript/plugin-qiankun');


export default configure(
    'webpack',
    {
        plugins: [
            qiankun({/* 配置 */}),
        ],
    }
);
```

### 配置

```ts
interface PlaceholderConfig {
    size: number;
    backgroundColor: string;
}

interface TemplateConfig {
    header?: number | PlaceholderConfig;
    sidebarLeft?: number | PlaceholderConfig;
    footer?: number | PlaceholderConfig;
}

interface Options {
    template?: string | TemplateConfig;
    setupDevServer?: boolean;
}

function qiankun(appName: string, options?: Options): SettingsPlugin;
```

插件的第一个参数`appName`，指定应用的名称，这个名称会被用在：

1. 构建的的UMD包的全局函数名称上，这个函数的名称会是`${appName}-[name]`，其中`[name]`由`webpack`负责处理，是入口文件的名字，通常是`index`。
2. 应用在`qiankun`的路由中注册的名称，实际没啥用。
3. 本地调试时的容器页的标题，标题内容会是`${appName} - Qiankun`。如果没有看到` - Qiankun`的后缀，说明这个插件失效了，可以反馈问题。

第二个参数`options`，可选，可以提供以下功能：

#### 打开devServer功能

当`setupDevServer`未赋值或被设置为`true`时，插件会劫持`skr dev`，并注入相关代码，让你的应用跑在一个伪造的`qiankun`运行时内。此时你可以检查自己的应用是否在运行时下可以正确运动。

:::caution
如果你已经自己架设了整个微前端运行时，比如你有一个主应用和子应用，并从主应用加载子应用进行本地调试，那么你需要设置`setupDevServer`的值为`false`。且打开这个配置会造成多层的微前端嵌套，出现一些预期之外的问题。
:::

#### 配置模板

`options.template`可以用于配置容器页面的模板，仅在`setupDevServer`为`true`时才有用。

当这个选项的值为字符串时，根据字符串的表现形式，有以下的功能：

- 当字符串以`/`起始时，认为是一个模板文件的路径，插件会读取该文件的内容作为最终的HTML内容。同时插件会自动注入`qiankun`的启动脚本，并将其中`{appName}`这个字符串替换为真实的应用名称。
- 其它情况下，认为字符串是一段合法的HTML内容，直接用作最终输出，并自动注入`qiankun`的启动脚本。

同时，`options.template`也可以是一个对象，结构参考上文的`TemplateConfig`类型定义。在对象中，可以分别定义顶部、侧边栏、底部三个占位区域，最终页面呈现的效果大致如下：

```
--------------------------------------------
|                  header                  |
--------------------------------------------
|             |                            |
|             |                            |
|             |                            |
| sidebarLeft |            apps            |
|             |                            |
|             |                            |
|             |                            |
--------------------------------------------
|                  footer                  |
--------------------------------------------
```

其中`apps`用来渲染真正的应用内容，其它3块分别可以指定`size`和`backgroundColor`，背景色默认使用一个浅灰色。

例如希望有一个高度为60的头部，以及一个宽度为140的左边栏，且头部使用深黑色，边栏保持默认颜色，可以如下配置：

```ts
{
    header: {
        size: 60,
        backgroundColor: '#000',
    },
    sidebarLeft: 140
}
```

如果不配置其中一块，对应的HTML元素也会出现在最终的容器页面上，但尺寸为0导致不可见，最终HTML的结构大致如下：

```html
<header id="header"></header>
<div id="content">
    <aside id="sidebar-left"></aside>
    <main id="apps"></main>
</div>
<footer id="footer"></footer>
```

这个结构并不代表应用最终发布到线上时的样子，所以在应用的代码中，不要依赖这个结构上的任何信息去做实现。

