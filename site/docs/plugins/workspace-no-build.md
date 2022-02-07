---
title: Monorepo源码依赖
---

## 插件说明

如果你的应用满足以下场景：

1. 是一个monorepo形式的项目。
2. 项目中的包并不需要发布到npm等依赖源上。
3. 项目中有一个或几个包是一个Web应用，其它的包是它（们）的依赖。
4. 各个包的源码（包括脚本和样式）都能被`reSKRipt`构建。
5. 各个包的源码在`src`目录下。

那么，你可以选择不去构建各个依赖包，因为它们也不会发布到npm源上。此时在使用这个插件后，在Web应用中直接引用这些包，会被定向到各个包的`src`目录下。

诸如你有这样的一个项目结构：

```
/packages
    /web # Web应用入口
    /util # 工具包
        /src
            index.ts
        package.json # 里面的name是@me/util
    /component # 组件包
        /src
        package.json # 里面的name是@me/component
package.json # 里面声明了workspaces属性
```

你可以在`packages/web`下这样引用：

```ts
import {parseDate} from '@me/util'; // 对应packages/util/src/index.ts
import Label from '@me/component/Label'; // 对应package/component/Label/index.tsx
```

## 使用

### 安装

```shell
npm i -D @reskript/plugin-workspace-no-build
```

### 增加插件

```ts
// reskript.config.ts
import {configure} from '@reskript/settings';
import workspaceNoBuild = require('@reskript/plugin-workspace-no-build');


export default configure(
    'webpack',
    {
        plugins: [
            workspaceNoBuild({/* 配置 */}),
        ],
    }
);
```

### 配置

```ts
interface Options {
    includes?: string[];
    excludes?: string[];
    styles?: boolean;
}

function workspaceNoBuild(options?: Options): SettingsPlugin;
```

#### 控制引入包的范围

其中`includes`和`excludes`都是写在`package.json`的`name`字段的包名（**不是目录名**），几个配置的逻辑：

1. 如果没有`includes`，则取所有`package.json`中的`workspaces`字段配置的目录，无此配置则用`packages/*`。
2. 如果有`includes`，则只取`includes`的部分。
3. 在前2步的基础上，排除`excludes`声明的。

:::note
推荐用`@i/*`或`@me/*`来命名本地的子包，打字方便又不容易冲突。
:::

#### 子包中的样式处理

配置中的`styles`配置如果为`true`，则会把其它包中的样式文件均视为源码样式，即开启CSS Modules处理，具体参考[编写样式](../app/style)了解情况。

这个配置为`false`或未配置时，其它包中的样式则不会被CSS Modules处理，引入样式文件也不会形成[样式函数](../app/style#了解样式函数)，你需要自己动手硬编码`className`引用各个样式。

## 注意点

### 关于源码结构

1. `import`的时候对应的包名是各个名中的`package.json`中的`name`字段声明的，和文件夹名没关系。
2. 你的源码**必须**在`src`下，这个是硬编码的。
3. 此时`package.json`中的`main`、`browser`、`module`、`exports`等字段全部失效，只按照`src`下的文件路径来找文件。
4. 这个插件并不适用于`skr test`，单元测试时依然是正常的路径查找，因此建议你在`package.json`中写`"main": "./src/index.ts"`来让`jest`可以正确地找到文件。经测试，此后`skr test`提供的配置能够正确编译TypeScript文件。

### 关于依赖

如果你的结构是这样的：

```
/packages
    /app # 应用主入口
        package.json # 包含dependencies: react-router-dom, @i/biz
    /biz # 一个业务模块
        package.json # 包含devDependencies: react-router-dom和peerDependencies: react-router-dom
```

根据你使用的包管理工具的不同，可能`app/node_modules/react-router-dom`和`biz/node_modules/react-router-dom`并不能保证指向同一个目录，那么就会引起路由读不到自己的`Context`直接报错之类的问题。

以上以`react-router-dom`为例只是一个通俗的说明，存在此问题的包还有很多。

为了解决这个问题，如果一个包你希望做到“由应用主入口提供，其它业务模块仅声明依赖”，则你需要做以下几点：

1. 对于业务模块，必须用`peerDependencies`和`devDependencies`去依赖它，**切记**一定要在`peerDependencies`中声明。
2. 对于应用主入口，必须用`dependencies`或`devDependencies`依赖它。
3. 依赖的版本必须相互兼容。

在满足以上2点的情况下，本插件会做一个特殊的处理，把业务模块的`peerDependencies`都指向主应用的`dependencies`，保证它们是同一个第三方包。
