---
title: 支持Reflect Metadata
date: 2021-08-05
author: otakustay
author_url: https://github.com/otakustay
author_image_url: https://www.gravatar.com/avatar/d7479a703555cc76b277040e5be9b8ca
tags: [build, babel]
---

`reSKRipt`从`v1.13.0`起，增加了对`Reflect.metadata`的支持，对应TyepScript中的[emitDecoratorMetadata](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata)配置项。

考虑到这一功能会生成额外的代码，而大部分应用并不需要，我们将它隐藏在了`build.uses`配置项中，具体可参考[特殊第三方库的优化](https://reskript.vercel.app/docs/settings/build#特殊第三方库的优化)章节的说明。

如果你从现在开始希望使用这一功能，可以将你的`reskript.config.js`修改为以下内容：

```js
exports.build = {
    uses: ['antd', 'lodash', 'reflect-metadata'],
};
```

需要注意的是，如果你原本没有`build.uses`配置，那么自定义该配置会导致默认值（`[antd', 'lodash']`）失效，因此需要自己重新补充上这2个值。
