---
title: 检查代码规范
---

## 命令

使用`skr lint`可以检查本地的项目源码规范。

## 参数

```
--changed                    仅检查在git中有变更的文件
--staged                     仅检查在git中有变更且已经通过git add的文件
--allow-unsafe-react-method  允许React组件中有UNSAFE_*的方法，用于版本过渡
--fix                        自动修复可以修复的编码问题
-h, --help                   显示帮助信息
```

在`skr lint`后还可以输入需要检查的路径，如果路径为文件夹则会进一步检查里面的所有文件。默认会检查`.js`、`.jsx`、`.ts`、`.tsx`、`.less`、`.css`的代码。

路径默认是`src`下的所有文件（带递归），以及当前目录下的文件（不带递归），即仅检查项目中开发者手写的代码。如果在`src`以外你还有其它的文件需要检查，则需要手动指定：

```shell
skr lint src demo *.js
```

## 自定义配置

`skr lint`实际上是对[eslint](https://eslint.org/)与[stylelint](https://stylelint.io/)的一个封装，用它们分别检查不同类型的文件，再抹平错误信息的结构。在内部，使用了[@ecomfe/eslint-config](https://github.com/ecomfe/eslint-config)和[@ecomfe/stylelint-config](https://github.com/ecomfe/stylelint-config)作为基础配置，额外增加了一些更严格的规则。

当然`skr lint`也尊重你在本地配置的规则，其行为与`eslint`和`stylelint`一致，也就是说你可以在本地不同的目录下放置`.eslintrc.*`和`.stylelintrc.*`文件来自定义配置。

我们希望你将`@reskript/config-lint`提供的规则作为基础配置，在此基础上做局部的调整。

首先，你要安装配置的包：

```shell
npm install --save-dev @reskript/config-lint
```

你的`.eslintrc.js`中应该是以下的内容：

```js
module.exports = {
    extends: require.resolve('@reskript/config-lint/config/eslint'),
    rules: {
        // 其它规则的覆盖
    },
};
```

对应`stylelint.config.js`也是类似：

```js
module.exports = {
    extends: require.resolve('@reskript/config-lint/config/stylelint'),
};
```

在项目中放置这些配置文件的另一个好处是可以与编辑器的插件友好整合，带来编码过程中的检查能力，所以我们非常推荐你生成这几个配置文件。

## 提交前检查

我们推荐你通过[husky](https://www.npmjs.com/package/husky)在代码提交前做好编码规范的检查。首先安装之：

```shell
npm install --save-dev husky
```

随后执行以下命令增加钩子：

```shell
npx --no-install husky install \
  && npx --no-install husky add .husky/pre-commit "npx --no-install skr lint --staged"
```

当然你也可以使用[lint-staged](https://www.npmjs.com/package/lint-staged)来实现类似的能力，此时`package.json`中的配置大致是：

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,less,css}": "skr lint"
  }
}
```

对应初始化钩子的命令是：

```shell
npx --no-install husky add .husky/pre-commit "npx --no-install lint-staged"
```
