---
title: 特性矩阵配置
---

特性矩阵是`reSKRipt`独有的概念，它用于声明一个项目可能发布的多个版本（或多个环境）中不同的功能标记，并在`skr build`时自动构建出多个入口HTML文件。只需要将所有的构建结果发布，并将不同的用户导向不同的HTML，即可灵活地进行灰度、小流量实验等工作。

## 使用特性矩阵

### 定义矩阵

在`reskript.config.{mjs|ts}`中增加`featureMatrix`导出，它是一个对象，且至少包含一个叫做`dev`的属性：

```ts
export default configure(
    'webpack',
    {
        featureMatrix: {
            stable: {},
            insiders: {},
            dev: {},
        },
    }
);
```

这个对象的每一个属性代表一个构建后的入口（`dev`除外），我们称之为“特性名称”，对应的值则称为“特性名”。最终生成的HTML会以`{entryName}-{featureName}.html`命名。例如由`src/entries/index.tsx`构建的`insiders`版本，就会是`index-insiders.html`。

每一个特性集是一个对象，对象内可以是任意的键-值对。

**需要注意的是，一个特性集中的值必须是可以被`JSON.stringify`序列化的，如基本类型（数字、字符串等）、简单的数组、对象都可以，但你不可以使用`function`、`Map`、`Set`这些类型。**

### 引用特性

在项目的源码中，可以使用`$features.someKey`来引用某一个特性。引用特性的代码类似于`process.env.NODE_ENV`，必须是一个完整的串，不可以有任何的动态性，例如下面的写法都是**不可用**的：

```ts
const myKey = 'someKey';
$features[myKey];

for (const key of $features) {
    // ...
}

Object.keys($features).filter(k => k.startsWith('app'));
```

### 推荐特性名

在常见场景下，我们推荐使用如下特性名称区分不同流量：

- 全流量：`stable`。
- 小流量：`insiders`。
- 内部试用流量：`pioneer`。

其它场景下，如版本具有明确的业务含义，可以随意取名。

## 一些注意点

### 特性集结构

在`featureMatrix`中的每个特性集的结构必须完全一致，如果不同的特性集有不同的属性名称，则会在构建过程中报错：

```
Build target foo & bar have incompatible feature schema
```

### 本地开发用特性

在本地开发即`skr dev`时，会默认使用`dev`这特性集。这也是为什么前文有提到`featureMatrix`中至少要有`dev`这个键。

同样的，`dev`的结构必须与其它特性集保持一致。并且**`dev`这一特性集默认不会在构建时使用**，即并不会有类似`index-dev.html`这样的最终产物。

如果你需要针对另一个特性集进行调试，可以使用`skr dev --build-target={featureName}`来指定。

### 从构建中排除其它特性集

如上文所述，默认情况下`dev`这一特性集是被排除在构建之外的，如果你需要同样排除其它的构建集，也可以使用`build.excludeFeatures`配置来解决。在使用这个配置时，原有的排除`dev`的行为会被禁掉，你需要手动把它加回来。

例如你想要同时排除`dev`和`local`这两个特性集，那么这样配置：

```ts
export default configure(
    'webpack',
    {
        build: {
            excludeFeatures: ['dev', 'local'],
        },
    }
);
```

## 正确使用

### 推荐场景

在以下情况中，我们推荐通过特性矩阵来管理：

- 功能开关，如在小流量中启用某个功能，但在全流量中暂不可见。
- 一个文案在不同的版本上显示不同的内容。

总的来说，特性矩阵适合用来区分**不同的用户**，让不同的人看到不同的内容。

### 不推荐场景

首先，我们**不推荐**用特性矩阵来区分**不同的环境**，例如这样的诉求：

> 在测试环境中不要采集用户行为数据，但在线上环境中打开采集能力。

类似这样的诉求，它是**对环境的区分**。如果我们同时在特性矩阵中区分环境和用户，就会形成“环境X用户”的条件组合，比如你既有`stable`和`insiders`两个用户版本，又有`test`和`online`两个环境版本，那最终一定会出现`testStable`、`onlineInsiders`这种组件的版本，随着用户和环境版本增多，组件版本是不可控的。

因此，对于环境我们依然推荐用`process.env`来做区分，例如：

```ts
if (process.env.TRACK !== 'off') {
    enableUserTrack();
}
```

其次，特性矩阵**不可用来声明运行时的特性**，特性矩阵是在编译期被常量替换的，会在运行时完全丢失。
