---
title: 开始使用
---

## 系统要求

**要求系统安装`node >= 14.0.0`版本。**

## 前置依赖

一些基本上你一定会需要的依赖，任何场景都请先安装上：

```
npm install --save-dev eslint stylelint typescript webpack
```

## 分场景安装

`reSKRipt`由多个包组成，你可以按照下面描述的不同场景选择性安装：

> 我想用webpack构建我的应用。

```
npm install --save-dev @reskript/cli @reskript/cli-build

skr build
```

> 我想用webpack-dev-server调试我的应用。

```
npm install --save-dev @reskript/cli @reskript/cli-dev

skr dev
```

> 我想基于已有的webpack配置自己定义构建。

```
npm install --save-dev @reskript/config-webpack
```

> 我想检查我的代码规范。

```
npm install --save-dev @reskript/cli @reskript/cli-lint

skr lint
```

> 我直接使用eslint、通过vscode的eslint插件检查代码，但想使用已有的规则配置。

```
npm install --save-dev @reskript/config-lint
```

> 我想用jest进行单元测试。

```
npm install --save-dev @reskript/cli @reskript/cli-test

skr test
```

> 我想基于已有的jest配置进一步定制我的单元测试。

```
npm install --save-dev @reskript/config-jest
```
