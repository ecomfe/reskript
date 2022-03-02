---
title: 向HTML注入内容
---

## 插件说明

本插件可以向构建生成的HTML中在指定位置注入标签。

## 使用

### 安装

```shell
npm i -D @reskript/plugin-inject-plugin
```

### 增加插件

```ts
// reskript.config.ts
import {configure} from '@reskript/settings';
import injectHtml = require('@reskript/plugin-inject-html');

export default configure(
    'webpack',
    {
        plugins: [
            injectHtml({/* 配置 */}),
        ],
    }
);
```

### 配置

```ts
export interface TagDescription {
    tag: string;
    attributes?: Record<string, string | true | undefined>;
    void?: boolean;
    children?: string;
}

export interface Options {
    headStart?: TagDescription[];
    headEnd?: TagDescription[];
    bodyStart?: TagDescription[];
    bodyEnd?: TagDescription[];
}

function injectHtml(options?: Options): SettingsPlugin;
```

配置可以在`<head>`标签和`<body>`标签的头部或尾部插入指定的标签，每一个标签通过`TagDescription`声明。

例如，想插入一个`echarts`的脚本，可以这样写：

```ts
// reskript.config.ts
import {configure} from '@reskript/settings';
import injectHtml = require('@reskript/plugin-inject-html');

const injectOptions = {
    headEnd: [
        {
            tag: 'script',
            attributes: {
                src: 'https://cdn.jsdelivr.net/npm/echarts@4.2.1/dist/echarts.min.js',
            },
        },
    ],
};

export default configure(
    'webpack',
    {
        plugins: [
            injectHtml(injectOptions),
        ],
    }
);
```

在构建后，入口的HTML中会出现`<script src="https://cdn.jsdelivr.net/npm/echarts@4.2.1/dist/echarts.min.js"></script>`标签。
