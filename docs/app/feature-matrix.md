---
title: 多分支构建
order: 5
---

在实际的业务中，我们会需要针对某些标记生成不同的构建产出，用于新功能的小流量试用、AB测试等场景。`reSKRipt`内置了一次构建产出多个分支的能力。

## 特性矩阵

在`reSKRipt`中，我们使用一个叫作“特性矩阵”的功能对分支进行配置，这个配置出现在`settings.js`文件中，使用`exports.featureMatrix`定义。它是一个对象，对象的每一个属性是一个分支名称，对应的值是一系列的标记。

每一个分支中的标记都可以在业务的代码中使用，你可以通过`$features.someFlag`来得到这个标记的值。

作为示例，在[快速上手](about-entry.md)的基础上，我们修改一下`settings.js`，将其中的`exports.featureMatrix`改为以下内容：

```javascript
exports.featureMatrix = {
    stable: {
        useGoodbye: false,
    },
    insiders: {
        useGoodbye: true,
    },
    dev: {
        useGoodbye: true,
    },
};
```

随后我们修改`src/entries/index.js`文件，在其中放入以下代码：

```javascript
if ($features.useGoodbye) {
    console.log('Goodbye World');
}
else {
    console.log('Hello World');
}
```

随后使用`skr build`进行构建，可以看到最后在`dist/assets`下输出的文件：

```text
index.1168891639cecaeca742.js
index.1168891639cecaeca742.js.map
index.3e6af215f3d8878376ad.js
index.3e6af215f3d8878376ad.js.map
```

可以看到生成了2个同样名为`index.[hash].js`的文件，其中`index.1168891639cecaeca742.js`运行会打印出`"Goodbye World"`，而`index.3e6af215f3d8878376ad.js`则会打印`"Hello World"`。

进一步看`dist`目录，可以看到2个HTML：

```text
index-insiders.html
index-stable.html
```

其中`index-insiders.html`会引用`index.1168891639cecaeca742.js`，因此最终打印出`"Goodbye World"`，`index-stable.html`则通过另一个JavaScript打印出`"Hello World"`。

总而言之，当你在`featureMatrix`配置中声明了多个属性后，会构建出对应`[entryName]-[featureMatrixName].html`的文件，引用对应的JavaScript入口，产生不同的效果。但是`dev`这个属性是特殊的，它仅用于本地调试，因此不会产生对应的HTML文件。

## 特性配置

在`featureMatrix`配置中，每一个分支都可以有任意多个属性，但需要注意以下几点：

1. 属性的值会通过`JSON.stringify`处理后变为`$features.flagName`，因此函数、日期等对象都无法使用。
2. 所有的分支配置的属性名（即对象的结构）必须相同，如有不同则会在构建时报错。

## 指定构建目标

由于特性矩阵的存在，构建产生的文件命名形如`index-stable.html`。如果在实际开发中，仅有一个分支，因此想要让输出的文件名为`index.html`的话，可以使用以下命令：

```shell
skr build --build-target=stable
```

这一命令会仅构建`stable`这一个分支，并且将产出的文件命名为`[entry].html`，与某些已经固定的Nginx配置配合上线更为方便。
