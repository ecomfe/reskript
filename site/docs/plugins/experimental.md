---
title: 实验性功能
---

## 插件说明

本插件会包含一系列实验性的能力，来优化构建速度、提供更丰富的产出分析等。

:::caution
本插件并不遵循Semver规范，在任意版本中都可能产生不兼容的变化，如需使用请务必保持好心态。
:::

## 使用

### 安装

```shell
npm i -D @reskript/plugin-experimental
```

### 构建提速

:::note
仅在`5.7.0`后版本中提供，当前仅支持Webpack引擎。
:::

`buildFast`插件将提供一系列的构建提速能力，包括：

- 使用SWC代替Babel进行文件的编译。
- 使用SWC来压缩文件。

简单地引入并加在`plugins`中即可启用：

```ts
// reskript.config.ts
import {configure} from '@reskript/settings';
import {buildFast} from '@reskript/plugin-experimental';

export default configure(
    'webpack',
    {
        plugins: [
            buildFast(),
        ],
    }
);
```

在引入`buildFast`插件后，虽然构建速度能得到提升，但会有如下的代价：

- 因为SWC并非纯JavaScript实现，它的安装依赖于操作系统、内核等，在部分环境下可能出现安装失败的问题。
- 你无法使用由`reSKRipt`提供的特有Babel能力，包括React组件自动添加`displayName`、在Devtool中组件与代码文件关联功能。
- 你**不能使用**`styled-components`，建议使用`emotion`替代。
- 不再有诸如移除`propTypes`、提升React常量元素等细节优化。
- 在使用`antd`的过程中可能出现问题,见下文。
- 其它SWC与Babel的差异点。

如果你使用`antd`作为组件库，为了保持原有的组件按需引入的能力，`reSKRipt`会对你的`antd`导入做一些特殊的处理，详细来说，诸如以下的代码：

```ts
import {Button, Select} from 'antd';
```

会被处理成：

```ts
import Button from 'some/reskript/internal/path/Button';
import Select from 'some/reskript/internal/path/Select';
```

其中如`some/reskript/internal/path/Button`这一模块的内容大致是这样的：

```js
import 'antd/es/button/style';
export {default} from 'antd/es/button';
```

通常情况下，这一处理并不会导致你的构建出现问题，如果遇到情况，可以向我们反馈。
