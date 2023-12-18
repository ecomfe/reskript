---
title: 执行单元测试
---

## 命令

使用`skr test`可以使用`jest`执行单元测试。

## 参数

```
--cwd [value]     指定当前工作目录，默认为当前目录
--config [value]  使用指定的配置文件，默认查找reskript.config.{ts,mjs}
--env-file [value...]       提供一个或多个自定义的环境变量（.env）文件
--target [value]  指定单测的运行时环境，可以为react或node，默认是node
-h, --help        显示帮助信息
```

在`skr test`可以输入一系列的路径指定测试范围，如`skr test src/utils`表示仅运行`src/utils`下的单元测试。

在实现上，`skr test`使用了`jest`作为测试框架，你可以传递任何`jest`可接受的参数，这些参数必须放置在`--`之后，如：

```shell
skr test --target=react src/components -- --coverage --maxWorkers=3 --maxConcurrency 2
```

注意一定要把传给`jest`的参数放在`--`后面。如果你使用`npm run test`来启动`skr test`，则需要再多写一个`--`，像这样子：

```shell
# 注意有连续的2个"--"
npm run test --target=react src/components -- -- --coverage --maxWorkers=3 --maxConcurrency 2
```

## 测试组件

如果要对组件测试，你需要使用`skr test --target=react`来跑。在这个模式下，会切换到`jsdom`作为运行时，执行的性能会有比较大的下降。

你可以与[testing-library](https://testing-library.com/docs/react-testing-library/intro)整合来进行组件与hook的单元测试。
