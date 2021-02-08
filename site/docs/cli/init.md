---
title: 初始化项目
---

## 使用

你可以使用`npx`来执行`@reskript/init`并在指定目录初始化一个项目。

```shell
npx @reskript/init [dir]
```

如果未指定`dir`参数，则在当前目录下执行。

在初始化过程中，会安装一系列的依赖，这个过程会需要你较长时间的等待。

## 自定义NPM镜像

如果你希望通过自定义的镜像来安装依赖，如`https://registry.npm.taobao.org`，你可以在目标目录下事先创建`.npmrc`文件并设置镜像。
