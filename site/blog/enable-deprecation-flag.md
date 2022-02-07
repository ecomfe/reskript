---
title: 用全局环境变量做好升级2.0的准备
date: 2021-08-19
author: otakustay
author_url: https://github.com/otakustay
author_image_url: https://www.gravatar.com/avatar/d7479a703555cc76b277040e5be9b8ca
tags: [cli, flags]
---

在2021年8月19日，[webpack-dev-server发布了4.0.0版本](https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0)。作为`reSKRipt`计划中的一部分，我们将在这个时间点开始准备`2.0.0`版本的升级。

我们将会使用一周的时间，即在2021年8月26日左右冻结所有`1.x`版本的新功能需求，针对`1.x`版本后续仅接受问题修复，并在约6个月后逐渐停止对问题的修复支持。

我们计划`2.0.0`版本的主要改动是支持`webpack-dev-server@4`和一些当前标记为废弃的功能的清理，预期升级的成本不高。

为了更好地支持你升级到未来的版本，我们在`1.15.0`版本中推出了一项新的功能。现在你可以通过`SKR_FLAGS=deprecation-error`这一环境变量，来要求`skr`命令遇到废弃功能时直接报错退出。当然在命令行上依然会提示你相应的修改点和替代功能。

`SKR_FLAGS`将是一个长期存在且重大的功能，我们计划在未来支持更多的标记让`reSKRipt`有更丰富的定制行为，在当前，我们建议你全局配置该环境变量以打开相关的标记：

```shell
export SKR_FLAGS=all
```

关于标记的具体功能和使用方式，可以参考[命令行介绍文档](https://reskript.vercel.app/docs/cli/introduction#全局控制标记)。
