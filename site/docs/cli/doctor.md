---
title: 项目结构合规检查
---

## 命令

`reSKRipt`与`create-react-app`有一些区别，主要集中在对依赖、目录结构的要求上。使用`@reskript/doctor`可以检查当前目录是否符合`reSKRipt`的各项要求。

## 使用

最简单地方法是使用`npx`来调用检查：

```shell
npx @reskript/doctor
```

默认检查当前目录，当前不能指定目录。

如果当前目录是一个monorepo（有`package.json`用有`packages`目录），则会对每一个子项目进行检查。具体的子项目从`package.json`中的`workspaces`字段中获取。
