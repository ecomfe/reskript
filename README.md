<p align="center">
  <a href="https://ecomfe.github.io/reskript">
    <img width="200" src="https://ecomfe.github.io/reskript/images/logo.svg">
  </a>
</p>

<div align="center">

基于 React 与 Ant Design 开发的命令行工具套件

</div>


**[reSKRipt](https://ecomfe.github.io/reskript)** 是基于 [React](https://github.com/facebook/react) 与 [Ant Design](https://github.com/ant-design/ant-design) 开发的一套命令行工具套件，整合了代码检查、单元测试、构建、代码转义和本地调试等一系列功能，意图做到在开发业务时无需关心工具选型。

## 为什么自研

社区中的 [create-react-app](https://www.npmjs.com/package/create-react-app) 提供了最基础的开发体验，而 reSKRipt 则在此基础之上加了一些独特的能力和更多的约束，在此例举一些主要的：

- **更严格地挑选 Babel 插件**：我们曾经在 [bind operator](https://github.com/tc39/proposal-bind-operator) 标准上吃过不小亏，从此以后便开始避免无脑地使用 `stage-0` 来进行转义，精细地挑选当前的插件，选择更为成熟且比较确定会持续演进最终进入规范的部分。

- **默认 CSS Modules**：所有的 .less 和 .css 文件均经过 CSS Modules 处理，仅有 `.global.{less,css}` 被排除在外，这能够更好地控制样式的隔离，更符合一个严谨的工程开发模式。

- **样式被转化为函数**：对于样式文件，在引入后会变成一个函数，比如： `import c from './index.less'` 后可以使用 `c('text', {'size-small': props.small})` 这样的形式生成元素的className，内部基于 [classnames](https://www.npmjs.com/package/classnames) 实现。

- **SVG组件化**：可以通过 `import {ReactComponent} from './icon.svg'` 将 SVG 转化为组件，这与 [create-react-app](https://www.npmjs.com/package/create-react-app) 提供的能力相似，但 reSKRipt 使用了自定义的 loader 来实现这一功能，具备更好的转换性能。

- **严格的代码检查规则**：基于百度内部的编码规范，使用 [@ecomfe/eslint-config](https://www.npmjs.com/package/@ecomfe/eslint-config) 和 [@ecomfe/stylelint-config](https://www.npmjs.com/package/@ecomfe/stylelint-config) 的严格规则做检查，并在此基础上增加了一系列自己的规则，代码检查远比社区更加严格。

- **自动添加组件名称**：所有组件都会自动加上 displayName 属性，无论是以 function、const 还是 export default 定义，都能很好地识别出来并自动的推导最合适的组件名称。

- **追求更新的框架版本**：仅支持 react@17 和 webpack@5，并且我们在未来也将以最快速度跟进框架的最新版本，不断淘汰对旧版本的支持，以此让业务紧密跟随社区的发展。

因此，使用 reSKRipt 可能会一定程度上约束你的开发模式，它并不一定适用于所有的应用，但我们有信心在开发模式契合的情况下为你大幅度提升开发效率。

## 版本管理

所有的包始终使用同一个版本，由 lerna 进行管理，使用 pnpm 作为包管理工具。

我们会在发布版本的时候使用 `--force-publish` 参数，这意味着即便有一个包没有任何的改动，也会跟随发布新的版本。这样做的好处是能很好地处理各包之间错综复杂的依赖关系，避免某个包被重复引入多个版本。

如果你需要升级包，在知道最新版本号的前提下，大可以在 package.json 文件中把所有以 `@reskript/` 开头的包的版本统一修改，再运行 `npm install` 或 `yarn` 来更新。

## 安装

**要求系统安装`node >= 14.0.0`版本。**

一些你基本上一定会需要的依赖，任何场景都请先安装上：

```bash
npm install --save-dev eslint stylelint typescript webpack
```

reSKRipt 由多个包组成，你可以按照下面描述的不同场景选择性安装：

- 我想用 webpack 构建我的应用

```bash
npm install --save-dev @reskript/cli @reskript/cli-build

skr build
```

- 我想用 webpack-dev-server 调试我的应用

```bash
npm install --save-dev @reskript/cli @reskript/cli-dev

skr dev
```

- 我想基于已有的 webpack 配置自己定义构建

```bash
npm install --save-dev @reskript/config-webpack
```

- 我想检查我的代码规范

```bash
npm install --save-dev @reskript/cli @reskript/cli-lint

skr lint
```

- 我直接使用 eslint、通过 vscode 的 eslint 插件检查代码，但想使用已有的规则配置

```bash
npm install --save-dev @reskript/config-lint
```

- 我想用jest 进行单元测试

```bash
npm install --save-dev @reskript/cli @reskript/cli-test

skr test
```

- 我想基于已有的 jest 配置进一步定制我的单元测试

```bash
npm install --save-dev @reskript/config-jest
```
