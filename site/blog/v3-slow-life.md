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

## 说一说V3的诞生

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

## 祝愿

2022年初是对中国的互联网来说并不温暖的一个冬天，我们也通过这个版本，祝愿大家能抛开一些焦虑与紧张，有一个自己期望的生活节奏。

我们强烈地推荐你升级到V3版本，如果在此期间遇到任何的困难，欢迎[通过Github向我们咨询](https://github.com/ecomfe/reskript/issues/new)。
