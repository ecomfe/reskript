---
title: 支持SASS样式
---

## 插件说明

增加对`SASS`文件的处理能力。

这个插件会做以下几件事：

1. 通过`sass-loader`处理`.sass`、`.scss`文件。
2. 支持CSS Modules、样式提取为单独`.css`文件等功能。

## 使用

### 安装

```shell
npm i -D @reskript/plugin-sass
```

### 增加插件

```ts
// reskript.config.ts
import {configure} from '@reskript/settings';
import sass = require('@reskript/plugin-sass');


export default configure(
    'webpack',
    {
        plugins: [
            sass({/* 配置 */}),
        ],
    }
);
```

### 配置

```ts
interface SassLoaderOptions {
    implementation?: unknown;
    sassOptions?: Record<string, unknown>;
    additionalData?: string | ((content: string, loaderContext: unknown) => string);
}

function sass(options?: SassLoaderOptions): SettingsPlugin;
```

配置的各个选项请参考[sass-loader的说明](https://github.com/webpack-contrib/sass-loader#options)。仅支持上述的3个配置，其余配置不支持自定义。

### 样式处理逻辑

默认处理`.sass`和`.scss`文件，且按以下逻辑处理：

1. 在项目的源码（通常为`src`目录）下后缀为`.s[ac]ss`的，启用CSS Modules，且启用[样式函数功能](../app/style/#了解样式函数)。
2. 后缀为`.global.s[ac]ss`的，不启用CSS Modules。
3. 第三方（`externals`和`node_modules`下）的，不启用CSS Modules。

以下参数会影响到默认行为：

- `build.style.module`：设置启用CSS Modules的文件规则。
- `build.style.extract`：控制是否抽取为独立的`.css`文件。

具体请参阅[构建配置](../settings/build)章节了解这些配置的具体作用。
