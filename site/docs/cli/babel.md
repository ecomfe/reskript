---
title: 单独编译JavaScript
---

## 命令

使用`skr babel`可以指定单个文件或目录进行编译。

## 参数

```
--mode [value]         设置构建的环境模式，可以为development或production，默认为production
--no-polyfill          在编译时不引入core-js的polyfill
--out-dir [directory]  输出的目录，只能指定目录，编译的文件按目录结构输出到目标内
--clean                在编译前删除目标目录中的全部内容
--copy                 将非JavaScript和TypeScript的文件原样复制到输出目录中
-h, --help             显示帮助信息
```

## 调试文件编译

有时候在开发中遇到一个文件源码看上去没问题，但在编译后就有问题，就会想调试一下`babel`的输出。此时可以直接用`skr babel`指定单个文件，且不传递`--out`参数：

```shell
skr babel some/file.js
```

文件会在编译后输出到命令行，且在命令行中的输出带有语法高亮。

## 编译整个目录

在`skr babel`的输入指定为一个目录时，将会把目录下所有的`.js`、`.jsx`、`.ts`、`.tsx`文件进行编译，并**保留目录结构**地输出到`--out`参数指定的目录中。

你同样可以增加`--copy`参数，这样就会把其它类型的文件（如`.css`、`.png`等）原样复制到输出目录中。

一般编译一个工具库，可用的命令如下：

```shell
skr babel src --out=dist --copy --clean
```
