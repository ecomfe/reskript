# @reskript/config-lint

提供eslint相关配置。

## 引用配置

如果你需要自行使用eslint，或者通过编辑器的eslint插件进行代码检查，你需要引用`@reskript/config-lint`内置的配置。

在项目的目录下，放置一个`.eslintrc.js`文件，包含以下内容：

```js
module.exports = {
    extends: require.resolve('@reskript/config-lint/config/eslint'),
    // 其它配置
};
```

因为需要通过`require.resolve`正确地找到配置的路径，所以配置文件必须使用`.js`后缀。
