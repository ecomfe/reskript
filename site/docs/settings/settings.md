---
title: 配置文件
---

你可以在应用的根目录下放置一个`reskript.config.{mjs|ts}`文件来声明所有`reSKRipt`需要的配置，该配置文件是一个标准的ESM模块，你可以编写如下的内容：

```ts
import {configure} from '@reskript/settings';

export default configure(
    'webpack',
    {
        // 配置内容
    }
)
```

首先，你需要安装`@reskript/settings`包，并从这个包中引入`configure`函数，调用该函数后用于`export default`导出。

`configure`函数有2个参数，第一个参数为底层的构建器，当前仅支持`webpack`，只要写死即可。第二个参数则为具体的配置对象，可以包含以下属性：

- `featureMatrix`：参考[特性矩阵](feature-matrix)。
- `build`：参考[构建](build)。
- `devServer`：参考[调试服务器](dev-server)。
- `plugins`：参考[插件](plugins)。

一个经典的`reskript.config.ts`类似如下：

```ts
import {configure} from '@reskript/settings';

export default configure(
    'webpack',
    {
        featureMatrix: {
            stable: {
                // 正式环境的矩阵配置
            },
            insiders: {
                // 小流量的矩阵配置
            },
            dev: {
                // 本地开发的矩阵配置
            },
        },
        build: {
            appTitle: '我的应用标题',
        },
        devServer: {
            port: 8080,
        },
    }
);
```

`configure`对象中的每一项都是可以省略的，省略时会使用默认配置代替。

## 基础类型

在配置`reSKRipt`的时候，你需要了解一些内部常用的类型定义。这些结构中的字段大部分都由工具来获取，不需要你手动来声明。但如果你需要进行一些深入的定制，先了解一下这些结构更好。

### 构建环境

构建环境是一次构建的最基本上下文，它的定义如下：

```ts
type ReskriptProvider = 'webpack';

type WorkMode = 'production' | 'development';

interface ProjectAware {
    readonly cwd: string;
}

interface WorkModeAware extends ProjectAware {
    readonly mode: WorkMode;
}

interface BuildEnv extends WorkModeAware {
    // 调用工具时的子命令
    readonly usage: 'build' | 'devServer' | 'test';
    // 源码所在目录，默认为`src`
    readonly srcDirectory: string;
    // 当前代码库的包名，默认读取`package.json`中的`name`字段
    readonly hostPackageName: string;
    // `reskript.config.{mjs|ts}`中定义的配置
    readonly projectSettings: ProjectSettings;
}
```

### 动态构建环境

在构建环境的基础上包含了当次构建的版本、时间信息：

```ts
interface RuntimeBuildEnv extends BuildEnv {
    // 当前构建的版本号，会从`git`的最新提交中自动生成
    readonly buildVersion: string;
    // 构建发生的时间
    readonly buildTime: string;
}
```

### 构建入口

最终落实到一次构建过程的最终信息，在动态构建环境的基础上增加了特性矩阵相关的内容：

```ts
interface BuildEntry extends RuntimeBuildEnv {
    // 构建的特性值
    readonly features: FeatureSet;
    // 当前构建的特性矩阵中的目标
    readonly buildTarget: string;
}
```
