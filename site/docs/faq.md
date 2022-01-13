---
title: FAQ
---

## 安装相关

> 安装时报“ERESOLVE unable to resolve dependency tree”的错误。

你应该使用了NPM 7.x版本，该版本要求peer依赖完全对齐，但当前社区有部分库还无法达到这一要求。

你可以使用`npm install --legacy-peer`安装来避开这个错误。

## 构建相关

> 我的项目用`sass`作为样式语言，没办法切换到`less`。

参考[复用现有的`loader`](settings/build#复用现有的loader)章节来自定义`sass-loader`实现构建。

如果希望一个与`reSKRipt`的`less`处理一致的方案，请使用[@reskript/plugin-sass](plugins/sass)插件，具体的`.less`文件处理逻辑请参考[编写样式](app/style)章节的说明。

> 我想使用`tailwind`来写样式。

参考[settings/build#特殊第三方库的优化]章节，在`reskript.config.{mjs|ts}`中的`build.uses`配置中加上`"tailwind"`，并根据[官网文档](https://docs.tailwindchina.com/docs/installation#-1)初始化配置、引入样式即可。

> 我在项目中用多个入口文件分割子项目，希望只构建其中一个或几个并上线。

参考[仅构建指定入口](cli/build#仅构建指定入口)使用`skr build --entries-only`参数。

在调试时也可以参考[调试时指定入口](cli/dev#调试其它入口)使用`skr dev --entry`参数指定入口。

> 我发现有一个第三方包使用了新的JavaScript语法，不经过babel处理就没办法在低版本浏览器中运行。

参考[增加babel编译的文件](settings/build#增加babel编译的文件)一章，通过`reskript.config.{mjs|ts}`中的`build.script.finalize`配置让babel处理第三方包。

> 我希望某个入口构建产出的文件没有哈希，用于给他人直接引用。

参考[自定义入口配置](advanced/multiple-entry#自定义入口配置)，使用`src/entries/*.config.{mjs|ts}`中的`entry`导出配置`filename`实现。

> 我修改了项目中的`webpack.config.js`但没有效果。

项目根目录下的`webpack.config.js`仅用于部分IDE识别`import`的别名，本身不参与任何构建。如果需要对构建进行自定义调整，请修改`reskript.config.{mjs|ts}`，具体参考：

- [调整webpack配置](settings/build#自定义调整webpack配置)。
- [调整webpack-dev-server配置](settings/dev-server#扩展配置)。
- [调整babel配置](settings/build#扩展babel配置)。

> 我想用`emotion`管理样式，但构建会报错。

参考[特殊第三方库的优化](settings/build#特殊第三方库的优化)使用`build.uses`配置打开相应的功能。

> 我想在CI环境中保留缓存，多次构建利用缓存提速。

参考[skr build命令参数](cli/build#参数)中的`--cache-dir`指定一个目录存放缓存，并在CI配置中将该目录设定为持久化。

## 本地调试相关

> 我在远程IDE上开发，启动服务后打开的页面是`localhost`，本机无法访问。

参考[dev命令](cli/dev)与[play命令](cli/play)的文档，其中`--host`参数可以指定绑定的主机名，使用`--host=ip`可显示为远程机器的IP地址。

## 代码检查相关

> 我在运行`eslint`时出现`ESLint couldn't find the plugin "xxx".`这样的错误。

在你的`.eslintrc.js`中增加一行代码：

```javascript
require('@reskript/config-lint/patch');
```

具体参考[Lint配置](cli/lint#自定义配置)。
