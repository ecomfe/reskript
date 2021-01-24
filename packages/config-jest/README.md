# @reskript/config-jest

提供jest相关的基础配置。

## 扩展配置

如果你希望自定义jest配置，可在项目目录下放置`jest.config.js`，并在里面包含以下内容：

```js
module.exports = {
    // 或者对应非react的测试，修改为`jest-node.js`
    preset: require.resolve('@reskript/config-jest/config/jest-react.js'),
};
```
