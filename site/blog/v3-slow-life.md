---
title: V3 - 闲生慢活
date: 2022-01-04
author: otakustay
author_url: https://github.com/otakustay
author_image_url: https://www.gravatar.com/avatar/d7479a703555cc76b277040e5be9b8ca
tags: [version release]
---

在2022年的伊始，很荣幸向大家介绍`reSKRipt` V3的更新。

对于想快速了解版本间的差异并更新版本的开发者，请参考[V3迁移手册](https://reskript.vercel.app/docs/migration/V3)。V3的变更非常有限，相信你可以很快地完成升级。

## 代号

我们之前说过，出于唯心的考虑，我们会为每一个版本起一个代号。事实上，V3版本虽然仅有很小的变更，但它的孕育是一个非常曲折的过程，在此，我们为它赋予一个最能表达的代号：

> V3 - Slow Life - 闲生慢活

## 诞生

自V2在2021年8月发布以来，稳定的迭代更新支持着数百个项目的构建。但随着社区一些工具的更新，我想每一个使用`reSKRipt`的开发者或多或少见到过这样的提示：

```shell
=============

WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.

You may find that it works just fine, or you may not.

SUPPORTED TYPESCRIPT VERSIONS: >=3.3.1 <4.5.0

YOUR TYPESCRIPT VERSION: 4.5.4

Please only submit bug reports when using the officially supported version.

=============
```

又或者在使用VSCode的StyleLint插件时见到过这样的警告：

```txt
vscode-stylelint 1.x expects to use Stylelint 14 at minimum. Usage with prior versions of Stylelint is no longer supported. While older versions may continue to work for a while, you may encounter unexpected behaviour. You should upgrade your copy of Stylelint to version 14 or later for the best experience.
```

在这一段时间里，社区的两大代码检查工具ESLint和StyleLint都发布了大版本的升级，而出于兼容用户本地安装的版本，`reSKRipt`一直没有跟进这些升级。

在原定的计划中，我们计划将ESLint和StyleLint的升级与更多的功能和内部实现一同发布，形成一个更有冲击力的版本。但我们也发现，为了自身的研发节奏，长久地将我们的用户暴露在这些警告和提示之下，是一种不负责任。

所以，我们在思索许久之后，决定**放慢**我们的研发节奏，将大版本拆分为多个阶段，更早地将有用的内容推送给大家。当然这也可能让大家更频繁地看到大版本的变化而产生一些不安感，但我们依然愿意相信，伴随着`@reskript/doctor migrate`功能，我们可以提供更友好、流畅的更新体验。

因此，我们选择将最为核心的工具升级发布为一个单独的V3版本，同时借此希望给大家一份“**轻松愉快地升级并享受最新工具链**”的功能，这也正是我们寄托在“慢生闲活”之上的愿望。

## 后续

前面有进到，V3实际上是一个大版本拆分后的发布，在这个时间点上，我们也很高兴向大家同步后续几个大版本的路线图。

我们计划在Q1继续发布2个大版本。

在2月初，即春节后，我们将发布V4版本。V4版本将是一次内部实现的重大调整，我们会在这个版本中实现**纯ESM格式版本**、**用TypeScript编写配置文件**等重要特性，将开发和构建真正带入现代化的进程。

随后的3月底，我们将发布V5版本。V5版本将会引入一个相对基础的[Vite](https://vitejs.dev)的实现。我们决定在这个版本同时兼容Webpack与Vite，由开发者自主选择其一作为开发、构建的底层工具。兼容并抽象多个工具并不是一件简单的事，因此我们也会在这个版本引入较大的**配置文件结构的变更**，同时我们将尽可能地保持没有深入定制的产品可以低成本切换到Vite生态之上。假如你没有使用各种`finalize`配置，并且没有自定义HTML模板，相信迁移将会是一件愉快的事情。

在此之后，我们计划在V5上稳定观察大约半年左右，并有Q3底针对Vite做出稳定性、性能的优化后发布V6版本。并且我们也将在这个版本决定是否还保留Webpack的实现。

在这些版本推进的同时，我们也将积极思考如API Mock、WASM图片压缩、强化Bundle分析等话题，争取将`reSKRipt`打造为真正有别于社区的，一体化的优秀工具。

## 祝愿

2022年初是对中国的互联网来说并不温暖的一个冬天，我们也通过这个版本，祝愿大家能抛开一些焦虑与紧张，有一个自己期望的生活节奏。

我们强烈地推荐你升级到V3版本，如果在此期间遇到任何的困难，欢迎[通过Github向我们咨询](https://github.com/ecomfe/reskript/issues/new)。
