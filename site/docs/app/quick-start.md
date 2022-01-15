---
title: 第一个应用
---

本文将带你一步一步地实现一个最简单的“Hello World”应用。

## 初始化项目

你也可以用[@reskript/init](../cli/init)来初始化项目，以下为手动初始化的过程，着眼于帮助你了解`reSKRipt`的相关依赖和工作过程。

你需要将一个目录转为一个标准的NodeJS项目，即需要`package.json`：

```shell
mkdir my-app
cd my-app
npm init -y
```

## 安装依赖

作为一个简单的应用，我们假设需要使用构建、本地调试、代码检查这几项功能，参考[快速上手](../getting-started)将相关的依赖安装上：

```shell
npm install -D eslint stylelint typescript webpack
npm install -D -E @reskript/cli @reskript/cli-build @reskript/cli-dev @reskript/cli-lint @reskript/config-lint
```

:::note
你可能注意到了，我们安装`@reskript/*`包的时候使用了`-E`参数，这能保证我们对`reSKRipt`的依赖被锁定在固定的版本上。请注意在将来升级版本时，保持它们的版本是完全一致的。
:::

**另请注意：`NodeJS 16.x`和`NPM 7.x`现在还不能完全兼容地安装这些依赖，你可能需要切换到`NodeJS 14.x`，可以考虑使用[nvm](https://github.com/nvm-sh/nvm)来管理你的NodeJS版本。**

当然需要使用`react`进行开发，必要的框架也是不可少的：

```shell
npm install core-js react react-dom
npm install -D @types/react @types/react-dom
```

## 准备一些配置文件

### 代码检查

在项目目录下创建一个`.eslintrc.cjs`，内容如下：

```js
module.exports = {
    extends: require.resolve('@reskript/config-lint/config/eslint'),
};
```

再增加一个`stylelint.config.cjs`，内容如下：

```js
module.exports = {
    extends: require.resolve('@reskript/config-lint/config/stylelint'),
};
```

可以阅读[代码检查](../cli/lint)来了解各个配置文件的作用。

### TypeScript配置

我们想用TypeScript来编写源码，因此在项目目录下再增加一个`tsconfig.json`，内容可以简单如下：

```json
{
    "include": [
        "src",
        "./*.ts"
    ],
    "compilerOptions": {
        "module": "esnext",
        "target": "esnext",
        "outDir": "dist",
        "noEmit": true,
        "jsx": "react-jsx",
        "esModuleInterop": true,
        "moduleResolution": "node",
        "strict": true,
        "noUnusedLocals": false,
        "noFallthroughCasesInSwitch": true,
        "baseUrl": ".",
        "keyofStringsOnly": true,
        "skipLibCheck": true,
        "paths": {
            "@/*": ["./src/*"]
        }
    }
}
```

### 浏览器兼容性配置

在项目根目录增加一个`.browserslistrc`文件，这个文件用来声明你需要兼容的浏览器，像`babel`等工具都会参考这个文件，我们随便填一些：

```
chrome 76
firefox 64
```

以上是一个比较精简可用的配置，使用`emit: false`可以让TypeScript不要去处理代码的生成，获得更好的类型检查的性能。

### 别名配置

虽然`reSKRipt`完整地封装了`webpack`的功能，你不再需要自行做任何的配置。但是也正因为`webpack`的配置被隐藏在工具内，会让代码编辑器无法正确地读取配置来提供编码辅助，最为典型的是`import`语句中的路径会因为别名等原因无法找到，显示出预期外的错误。

为此，我们要在项目目录下放一个`webpack.config.js`，里面内容如下：

```js
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
};
```

这个文件不需要包含任何的其它配置，仅仅用作编辑器识别路径别名。它和实际的构建也没有关系，**任何时候你都不需要改动这个文件**。

### 项目配置

在项目目录下创建一个`reskript.config.ts`文件，简单地填空如下内容：

```ts
import {configure} from '@reskript/settings';

export default configure(
    'webpack',
    {
        build: {
            appTitle: '我的第一个应用',
        },
        devServer: {
            port: 8081,
        },
    }
);
```

你可以通过[配置文件](../settings)来了解更多的配置信息。

## 编写入口代码

`reSKRipt`的一大特点是将所有的应用入口放在了`src/entries`目录下，所以你现在的目录结构大致是这样的：

```
/src
    /entries
        index.tsx # 主入口文件
.eslintrc.cjs
.stylelint.config.cjs
webpack.config.js
reskript.config.ts
package.json
package-lock.json
```

建立`src/entries/index.tsx`，并输入以下代码：

```tsx
import {render} from 'react-dom';

function App() {
    return <h1>Hello World</h1>;
};

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
```

## 配置脚本

打开`package.json`，找到`scripts`这个属性，替换为以下内容：

```json
{
  "scripts": {
    "start": "skr dev",
    "build": "skr build --clean",
    "lint": "skr lint",
    "lint-staged": "skr lint --staged --fix --auto-stage"
  }
}
```

这样可以让你快速地使用`npm start`和`npm run build`来执行脚本，当然你可以在后续灵活地调整这里的参数和脚本内容。

## 运行应用

简单地把应用跑起来看看：

```shell
npm start
```

在短暂的等待后，你将看到浏览器自动打开了`http://localhost:8081`这个地址，页面上出现了“Hello World”字样。同时在命令行上看到一些漂亮的信息：

```shell
 DONE  Compiled successfully in 1608ms

 I  Your application is running here: http://localhost:8081/
```

这说明一个最简单的应用已经成功了，我们可以在完全不接触`webpack`之类工具的前提下快速地实现一个React应用。

## 构建应用

最后我们再来试一下把代码构建成可上线的产物：

```shell
npm run build
```

等待一段时间，任务完成后，你可以看到一个`dist`目录，简单看下里面的内容：

```
dist
├── assets
│   ├── index.2585d1c3d8714afc2ec0.js
│   ├── index.2585d1c3d8714afc2ec0.js.LICENSE.txt
│   └── index.2585d1c3d8714afc2ec0.js.map
└── index-stable.html
```

我们最终产出的入口页面是`index-stable.html`，名字有些不那么常见，你可以从[特性矩阵](../settings/feature-matrix)了解源由。而`dist/assets`中则是所有的静态资源，资源都会带上哈希来提供长效缓存的支持。

## 总结

截止此刻，我们用约5分钟的时间（假设你复制粘贴够熟练）快速地运行了一个简单的React应用，在后续章节我们会慢慢展开讲解更深入的应用开发模式。
