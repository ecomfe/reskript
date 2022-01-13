---
title: 插件配置
---

## 插件定义

在`reSKRipt`中，插件是一个“增加当前`reskript.config.{mjs|ts}`配置的函数”。一个单独的插件从类型上可以描述为：

```ts
interface ProjectAware {
    readonly cwd: string;
}

type SettingsPlugin = (settings: ProjectSettings, cmd: ProjectAware) => ProjectSettings;
```

其中`ProjectSettings`包含了`build`、`devServer`、`featureMatrix`等部分，但不包含`plugins`本身，即你不可能“用一个插件去控制另一个插件”。

而`reskript.config.{mjs|ts}`中的`plugins`是一系列的插件的声明，也可以是一个返回插件集合的函数：

```ts
type Plugins = SettingsPlugin[] | ((commandName: string) => SettingsPlugin[]);
```

当`plugins`为一个函数时，它的参数是当前的子命令，如`skr build`的子命令就是`build`。

## 使用注意点

### 配置不可变

在实现一个插件时，注意不要直接修改输入的`settings`参数，使用不可变的对象更新方法去修改它，比如你希望实现一个“根据当前开发者调整代理API目标”的插件时，可以这样写：

```ts
import username from 'username';
import {configure, SettingsPlugin} from '@reskript/settings';

const dynamicProxyTarget = (template: string): SettingsPlugin => settings => {
    // 这里使用不可变的更新方法，不直接覆盖
    return {
        ...settings,
        devServer: {
            ...settings.devServer,
            defaultProxyDomain: template.replace('{username}', username.sync()),
        },
    };
};

export default configure(
    'webpack',
    {
        plugins: [
            dynamicProxyTarget('{username}.my-app.dev:8788'),
        ],
    }
);
```

如果你觉得不可变的更新过于麻烦，也可以使用[immer](https://github.com/immerjs/immer)这样的工具来协助。

### 不支持异步

当前插件不支持异步地更新配置，所以一切依赖异步才能调整配置的逻辑都无法实现。例如你希望实现“找到没被占用的端口打开调试服务器”，但限于判断端口可用的NodeJS API本身就是异步的，所以这个功能当前是无法实现的。
