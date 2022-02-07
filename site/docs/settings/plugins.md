---
title: 插件配置
---

## 插件定义

在`reSKRipt`中，插件是一个“增加当前[项目配置文件](../settings#配置文件路径)配置的函数”。一个单独的插件从类型上可以描述为：

```ts
export interface PluginOptions {
    cwd: string;
    command: string;
}

type SettingsPluginReturn = ProjectSettings | Promise<ProjectSettings>;

export type SettingsPluginItem = (current: ProjectSettings, cmd: PluginOptions) => SettingsPluginReturn;

export type MayBeSettingsPlugin = SettingsPluginItem | null | undefined | false;

export type SettingsPlugin = MayBeSettingsPlugin | MayBeSettingsPlugin[];

```

其中`ProjectSettings`包含了`build`、`devServer`、`featureMatrix`等部分，但不包含`plugins`本身，即你不可能“用一个插件去控制另一个插件”。

而[项目配置文件](../settings#配置文件路径)中的`plugins`是一系列的插件的声明，也可以是一个返回插件集合的函数：

```ts
type Plugins = SettingsPlugin[] | ((commandName: string) => SettingsPlugin[]);
```

当`plugins`为一个函数时，它的参数是当前的子命令，如`skr build`的子命令就是`build`。

## 使用注意点

### 配置不可变

在实现一个插件时，建议不要直接修改输入的`settings`参数，使用不可变的对象更新方法去修改它，比如你希望实现一个“根据当前开发者调整代理API目标”的插件时，可以这样写：

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
