---
title: 执行单元测试
---

## 命令

使用`skr test`可以使用`jest`执行单元测试。

## 参数

```
--cwd [value]           指定当前工作目录，默认为当前目录
--coverage              输出覆盖率数据
--watch                 启用监听模式，文件变更后会自动运行单元测试
--target [value]        指定单测的运行时环境，可以为react或node，默认是node
--changed-since [value] 只检查指定的提交后有变更的部分，可以是一个分支名或一个git提交的id
-h, --help              显示帮助信息
```

现在`skr test`的功能还不够成熟，仅支持最基本的功能，并封装了组件测试的能力。

## 测试组件

如果要对组件测试，你需要使用`skr test --target=react`来跑。在这个模式下，会引入[enzyme](https://www.npmjs.com/package/enzyme)，并且会切换到`jsdom`作为运行时，执行的性能会有比较大的下降。

你可以与[testing-library](https://testing-library.com/docs/react-testing-library/intro)整合来进行组件与hook的单元测试。

**`enzyme`当前并没有针对`react@17`的适配，但我们发现大部分的单元测试也跑得起来。**
