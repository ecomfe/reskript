---
title: 构建应用
---

## 命令

使用`skr build`可以通过`webpack`来构建应用。

## 参数

```
--cwd [value]           指定当前工作目录，默认为当前目录
--mode [value]          设置构建的环境模式，可以为development或production，默认为production
--src [value]           指定项目源码所在的目录，默认为src
--build-target [value]  指定构建的目标特性名称，如果有这个参数，最后会生成一个index.html包含该特性集
--feature-only [value]  只构建指定的特性名称，其它的特性名称不参与构建
--analyze               启用对构建产物的分析功能
--profile               在构建产出中加入性能追踪的能力
--clean                 构建前删除上一次构建的产出
-h, --help              显示帮助信息
```

除命令行参数外，`reskript.config.js`中的[`build`](../settings/build)配置也会影响构建的行为。

## 指定目标特性集

在`reSKRipt`中，我们支持了[特性矩阵](../settings/feature-matrix)这一功能，可以支持一次性构建出多个版本。在这个模式下，构建的最终入口会是`{entryName}-{featureName}.html`的形式。

但有些项目的线上部署方式是固定的，且只能接受`index.html`这一命名，此时代可以用`--build-target`参数来额外生成一个`index.html`。例如：

```shell
skr build --build-target=stable
```

上面的命令会在完成所有版本的构建后，额外增加一个`index.html`，最终生成的结构类似于：

```
/assets
    # 一堆依赖的资源
index-stable.html
index-insiders.html
index.html # 内容和index-stable.html一样
```

另一种情况是，你根本不希望一次性构建多个版本，或者你有一个更高效的并行执行的CI/CD服务，所以你希望并行地单独构建每一个版本。这时可以用`--feature-only`来控制，如：

```shell
skr build --feature-only=stable
```

上面的命令会只构建`stable`这一特性集，`featureMatrix`中其它的特性集均不参与本次构建。

## 产出分析

如果你希望了解自己的项目构建后的产物情况，可以加上`--analyze`参数，**这个参数必须与`--build-target`一起使用**，指定分析某一个特性集的产物：

```shell
skr build --analyze --build-target=stable
```

在加上这一参数后，我们会对产物进行一系列的分析，当前提供的能力包括：

- 使用[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)生成一份产出的分析视图，并打开你的浏览器展示这个页面。
- 在`dist/assets`中生成一个`stats.json`，里面包含了整个构建的详细信息。

我们有计划在后续增加更多的产出分析，如对初始加载大小的控制、未使用代码的分析等。

**请不要在CI环境中使用`--analyze`参数，它不会给你带来什么作用，但会严重拖慢构建速度。**
