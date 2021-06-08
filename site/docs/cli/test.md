---
title: 执行单元测试
---

## 命令

使用`skr test`可以使用`jest`执行单元测试。

## 参数

```
--cwd [value]                  指定当前工作目录，默认为当前目录
--coverage                     输出覆盖率数据
--watch                        启用监听模式，文件变更后会自动运行单元测试
--target [value]               指定单测的运行时环境，可以为react或node，默认是node
--changed-since [value]        只检查指定的提交后有变更的部分，可以是一个分支名或一个git提交的id
--collect-coverage-from [glob] 在指定的文件范围内收集覆盖率信息
-h, --help              显示帮助信息
```

在`skr test`可以输入一系列的路径指定测试范围，如`skr test src/utils`表示仅运行`src/utils`下的单元测试。即便指定了测试范围，依然会全局收集覆盖率信息，如果希望覆盖率也仅从指定范围中统计，你需要同时使用`--collect-coverage-from`参数。

现在`skr test`的功能还不够成熟，仅支持最基本的功能，并封装了组件测试的能力。

## 测试组件

如果要对组件测试，你需要使用`skr test --target=react`来跑。在这个模式下，会引入[enzyme](https://www.npmjs.com/package/enzyme)，并且会切换到`jsdom`作为运行时，执行的性能会有比较大的下降。

你可以与[testing-library](https://testing-library.com/docs/react-testing-library/intro)整合来进行组件与hook的单元测试。

**`enzyme`当前并没有针对`react@17`的适配，但我们发现大部分的单元测试也跑得起来。**
