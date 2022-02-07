---
title: V4 - 时新模异
date: 2022-02-03
author: otakustay
author_url: https://github.com/otakustay
author_image_url: https://www.gravatar.com/avatar/d7479a703555cc76b277040e5be9b8ca
tags: [version release]
---

在2021年的新春之际，我们也在忙碌地准备着`reSKRipt` V4版本的发布，在自身重构、与社区协作的多重努力之下，最终完成了这个最为关键的内部重构版本，很高兴向大家介绍变化并不那么大但又处处全新的V4。

对于想快速了解版本间的差异并更新版本的开发者，请参考[V4迁移手册](https://reskript.dev/docs/migration/V4)。V4版本的最大变化是各类配置（项目配置`reskript.config.js`、入口配置`entries/*.config.js`）的调整，我们已经在近10个项目中进行了验证性的升级，以确保大多数项目可以低成本地成功升级。

## 代号

我们依旧延续着为每个版本起一个代号的“执着”，在V4中，最大的变化是我们对社区发展的研判，对新潮的ESM格式的引入，因此我们借用“日新月异”一词，以“Modern”为引，为V4版本赋了一个相对拗口的代号：

> V4 - Moden Module - 时新模异

## 起缘

经常写Node项目的朋友可能会有所了解，随着Node 12开始对ESM模块的原生支持，在Node社区正在逐渐兴起向ESM模块转换的势头，其中[Sindresorhus](https://github.com/sindresorhus)更是以一己之力，将自己发布的近千个流行的NPM包一一升级为ESM格式，并拒绝CommonJS格式的代码调用它们。

为了避免错误地引用仅支持ESM的包导致运行时的错误，在V3的实现中，我们有一个`scripts/check-deps.mjs`文件用于检查依赖版本是否正确。随着时日的积累，这个文件在最终有着这样的代码：

```js
const RESTRICTED_DEPENDENCIES = [
    ['imagemin', '7.x'],
    ['img-loader', '3.x'],
    ['log-symbols', '4.x'],
    ['ora', '5.x'],
    ['globby', '11.x'],
    ['unified', '9.x'],
    ['remark-gfm', '1.x'],
    ['remark-parse', '9.x'],
    ['remark-stringify', '9.x'],
    ['find-up', '5.x'],
    ['pad-stream', '2.x'],
    ['internal-ip', '6.x'],
    ['matcher', '4.x'],
    ['pkg-dir', '5.x'],
    ['chalk', '4.x'],
    ['execa', '5.x'],
    ['matcher', '4.x'],
    ['tailwindcss', '2.x'],
];
```

将近20个依赖已经受ESM的制约而无法升级到最新版本，并且这个数量还在持续地增长。我们渐渐意识到情况并不像想象地那么乐观，如果继续依附在CommonJS格式上，无论有多少理由支持，我们都将与社区渐行渐远，享受Node社区的生态会变得越来越难。

因此，我们在2021年末，下了一个决心，将`reSKRipt`的内部实现整体迁移到ESM格式上。所增`reSKRipt`自身是一个命令行的工具，几乎不被我们的用户通过函数调用的方式使用，这也拿得我们可以通过内部的重构，在尽可能减少对用户影响的情况下实现架构的升级。

## 变化

在经历了大约3个月的重构之后，我们终于实现了`reSKRipt`的几乎全盘ESM化，当前仅有`@reskript/eslint-plugin`和`@reskript/config-jest`两个包受上游（`eslint`和`jest`）的约束依旧保留着CommonJS的格式。这是我们本次重构的代码修改量：

```
377 files changed, 10289 insertions(+), 7054 deletions(-)
```

我们几乎修改了每一个文件，用万行以上的代码调整，确保了ESM模块的可用性、所有依赖的更新，摆脱了依赖版本的限制：

```js
const RESTRICTED_DEPENDENCIES = [
    // 终于所有依赖都能最新了哈哈哈！！！
];
```

除此之外，我们也借着这一次对所有代码的重新审视、调整，引入了不少实用的功能：

1. 我们支持了项目配置和入口配置文件的强类型化，现在你可以使用TypeScript编写配置，通过`@reskript/settings`导出的`configure`函数可以获得强大的类型提示和检验。
2. 在配置中，支持`plugins`数组传递空值和嵌套数组，这将便于你在不同的系统、流水线环境中使用不同的插件集合。
3. 配置中的各个`finalize`函数也升级为了异步函数，你将获得更大的灵活性，甚至可以基于远程的配置来调整`reSKRipt`的输入与输出。
4. 仰仗于各个环节的进一步异步化，我们在查找Webpack Loader等环节使用了并发的异步文件操作，为你带来构建速度上的提升。
5. 更进一步地，V4版本支持自定义项目配置文件的路径，你可以使用`skr build --config`指定配置文件，一个项目多个配置输出不同的产物将不再有任何阻碍。

相信这些优化将支持你更便捷、高效地使用`reSKRipt`来赋能项目的研发效率。

## 后续

如果你在之前看过[V4迁移手册](https://reskript.dev/docs/migration/V4)，可能会发现我们的配置文件格式做了一个重大的调整，通过`configure`函数导出配置时，增加了一个额外的参数：

```ts
export default configure(
    'webpack',
    {
        // ...
    }
);
```

是的，Webpack不再是我们唯一的构建选择，社区也在飞速地发展，新的、差异化的工具开始在舞台上活跃。在完成这一次重构后，我们将把重心放在引入[Vite](https://vitejs.dev/)上。我们的目标是将`reSKRipt`打造成一个“双擎”工具，同时在`build`、`dev`、`play`等命令上支持Webpack和Vite作为底层驱动，让你可以根据项目的粒度、类型、团队等因素自由地选择最合适的工具。
