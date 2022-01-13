---
title: 单组件调试配置
---

## 配置结构

`reskript.config.{mjs|ts}`中的`play`用来配置调试单个组件时的相关行为：

```ts
interface PlaySettings {
    // 默认启用React的并发模式
    readonly defaultEnableConcurrentMode: boolean;
    // 指定全局配置模块路径
    readonly defaultGlobalSetup?: string;
}
```

以上所有的配置均可以省略。

## 全局配置

通常一个应用里，会有一些几乎所有组件调试都需要的依赖，比如大家都要`Button`组件，或者大家都需要事先引入全局的样式`src/styles/app.global.css`之类的情况。

`skr play`支持一个全局的配置模块，你可以通过`play.defaultGlobalSetup`来设定：

```ts
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const src = path.join(path.dirname(fileURLToPath(import.meta.url)), 'src');

export default configure(
    'webpack',
    {
        play: {
            defaultGlobalSetup: path.join(src, 'config', 'play.js'),
        },
    }
);
```

这个属性必须指向一个存在的文件名，**不能省略文件后缀**。

这个配置与[单个组件的调试配置](../advanced/debug-component#组件调试配置)的作用是一样的，你可以引入任何模块，并允许导出`provides`和`Wrapper`两个内容，这2个内容与单个组件的配置的关系如下：

1. 单组件配置的`provides`全与全局的`provides`合并，且单组件配置覆盖全局中同名的。
2. 在显示组件时，首先渲染全局的`Wrapper`，在其内部渲染单组件配置的`Wrapper`，最后再渲染组件本身。

更多单组件调试的高级手段可参考[高阶应用 - 调试单个组件](../advanced/debug-component)章节的详细说明。

当你想用不同的全局配置调试组件时，也可以用[命令行的`--setup`参数](../cli/play#参数)来覆盖`defaultGlobalSetup`配置，比如可以借此调试暗黑模式下的效果。

## 启用并发模式

如果你使用了React 18.x，并希望在调试组件时试一试并发模式，那么你可以通过`play.defaultEnableConcurrentMode`配置来打开它：

```ts
export default configure(
    'webpack',
    {
        play: {
            defaultEnableConcurrentMode: true,
        },
    }
);
```

当打开这个配置时，`skr play`生成的代码会使用`createRoot`代替`render`，以此开启并发模式。

如果你只想针对某些组件尝试性地使用并发模式，也可以通过[命令行的`--concurrent-mode`参数](../cli/play#参数)来单独启用。
