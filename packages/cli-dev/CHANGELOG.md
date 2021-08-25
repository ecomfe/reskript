# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)


* feat(dev)!: 支持webpack-dev-server 4版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
* fix(build)!: 由用户自行安装core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)
* feat!: 对外暴露的API转为异步 (#130) ([f423d55](https://github.com/ecomfe/reskript/commit/f423d55efc890abd54e8958d4005c0285c91252d)), closes [#130](https://github.com/ecomfe/reskript/issues/130)
* feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)


### Features

* **build:** 增加严格模式开关 ([#54](https://github.com/ecomfe/reskript/issues/54)) ([3e00afc](https://github.com/ecomfe/reskript/commit/3e00afc503371412a30260c5a836935b47b7eb60))


### BREAKING CHANGES

* `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
* `devServer.hot`的类型修改为`boolean`
* `config-babel`的`hot`配置类型修改为`boolean`
* 不再处理`core-js`的引入，用户必须在项目中自行安装`core-js@3`
* `settings`、`core`、`config-webpack`和`config-webpack-dev-server`的接口均变为异步函数
* `BuildContext`的`cache`属性由`boolean`变为`persist` | `transient` | `off`
* NodeJS最低版本要求为14.14.0
* 配置中的`build.defaultImportOptimization`选项已经移除，用`uses: ['antd', 'lodash']`代替
* `config-babel`中的`defaultImportOptimization`参数，用`uses: ['antd', 'lodash']`代替
* `skr build`的`--src`参数已经移除，用`--src-dir`参数代替
* `skr dev`的`--src`参数已经移除，用`--src-dir`参数代替
* `skr dev`的`--open`参数已经移除，用`--host`参数代替
* `est-compat`的功能已经移除，LESS的编译不再包含任何内置的mixin
* 配置中的`play.wrapper`选项已经移除，使用`defaultGlobalSetup`选项代替
* 配置中的`play.injectResources`选项已经移除，使用`defaultGlobalSetup`选项代替
* `svg-mixed-loader`包已废弃，用`xxx.svg?react`的方式导入SVG为React组件
* `config-webpack/loaders`中的`svg`和`url`已经移除
* `cli-babel`的`--out`参数已经移除，用`--out-dir`参数代替





## [1.15.2](https://github.com/ecomfe/reskript/compare/v1.15.1...v1.15.2) (2021-08-24)

**Note:** Version bump only for package @reskript/cli-dev





## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/cli-dev





# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)


### Features

* **flags:** 支持SKR_FLAGS设置遇到废弃配置直接退出 ([#124](https://github.com/ecomfe/reskript/issues/124)) ([7f2658a](https://github.com/ecomfe/reskript/commit/7f2658a890a1f714d1a003aeff44dcd446d447b1))





## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)

**Note:** Version bump only for package @reskript/cli-dev





## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

**Note:** Version bump only for package @reskript/cli-dev





# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)

**Note:** Version bump only for package @reskript/cli-dev





## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)

**Note:** Version bump only for package @reskript/cli-dev





# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)

**Note:** Version bump only for package @reskript/cli-dev





## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

**Note:** Version bump only for package @reskript/cli-dev





## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

**Note:** Version bump only for package @reskript/cli-dev





# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)

**Note:** Version bump only for package @reskript/cli-dev





## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)

**Note:** Version bump only for package @reskript/cli-dev





## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)

**Note:** Version bump only for package @reskript/cli-dev





# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)


### Features

* **build:** 管理和读取各类.env文件 ([#74](https://github.com/ecomfe/reskript/issues/74)) ([83c9699](https://github.com/ecomfe/reskript/commit/83c96994c4cb5eb98978345f109c03f3901cefd2))





## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)

**Note:** Version bump only for package @reskript/cli-dev





## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)

**Note:** Version bump only for package @reskript/cli-dev





## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

**Note:** Version bump only for package @reskript/cli-dev





# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)

**Note:** Version bump only for package @reskript/cli-dev





# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)

**Note:** Version bump only for package @reskript/cli-dev





# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)


### Features

* **build:** 增加配置支持使用方选择性引入第三方库的专项优化 ([#79](https://github.com/ecomfe/reskript/issues/79)) ([f8ea13d](https://github.com/ecomfe/reskript/commit/f8ea13d2c16b11dae1a42d78cfa98d097350ef56))





## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

**Note:** Version bump only for package @reskript/cli-dev





# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)

**Note:** Version bump only for package @reskript/cli-dev





## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

**Note:** Version bump only for package @reskript/cli-dev





## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)


### Bug Fixes

* **dev:** 调试时指定的host应该同时影响HMR的配置 ([#62](https://github.com/ecomfe/reskript/issues/62)) ([20beb9e](https://github.com/ecomfe/reskript/commit/20beb9eacc8cd249278a94163b60deaeffaa8c45))





# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)


### Features

* **build:** 支持--entries-dir参数指定入口目录 ([#36](https://github.com/ecomfe/reskript/issues/36)) ([dec298d](https://github.com/ecomfe/reskript/commit/dec298d9384849bfd14beaf2ca850b42362cd850))
* **dev:** 在dev命令中用--src-dir参数替换原有--src参数 ([#65](https://github.com/ecomfe/reskript/issues/65)) ([03b654d](https://github.com/ecomfe/reskript/commit/03b654d3553a6914d75402c1af9f5983773bb962))
* **dev:** 增加--host参数指定调试服务器默认地址，自动生成完整的publicPath ([#62](https://github.com/ecomfe/reskript/issues/62)) ([71b7d6d](https://github.com/ecomfe/reskript/commit/71b7d6db0cce7da200b0c9b154b30dde2c529dc7))





# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)

**Note:** Version bump only for package @reskript/cli-dev





# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)

**Note:** Version bump only for package @reskript/cli-dev





## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)

**Note:** Version bump only for package @reskript/cli-dev





# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)

**Note:** Version bump only for package @reskript/cli-dev





## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)

**Note:** Version bump only for package @reskript/cli-dev





# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)

**Note:** Version bump only for package @reskript/cli-dev





# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)

**Note:** Version bump only for package @reskript/cli-dev





# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)


### Bug Fixes

* **cli:** 标准化程序的退出码 ([#30](https://github.com/ecomfe/reskript/issues/30)) ([86229a6](https://github.com/ecomfe/reskript/commit/86229a6d51cccfc2abbfaff3d6f36390f8ccf1dd))





# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)


### Features

* **dev:** 支持指定入口进行调试 ([#28](https://github.com/ecomfe/reskript/issues/28)) ([284f141](https://github.com/ecomfe/reskript/commit/284f141d6f023336c51dc51f4b804d2970cda2a6))





# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

**Note:** Version bump only for package @reskript/cli-dev





# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)

**Note:** Version bump only for package @reskript/cli-dev





# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)


### Bug Fixes

* **dev:** 当调试服务器启动出错时报告给用户并退出程序 ([#24](https://github.com/ecomfe/reskript/issues/24)) ([9fc7f5d](https://github.com/ecomfe/reskript/commit/9fc7f5dd494e38cae9e55708cacad1d3a2c73290))





# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)

**Note:** Version bump only for package @reskript/cli-dev





# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)

**Note:** Version bump only for package @reskript/cli-dev





# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)

**Note:** Version bump only for package @reskript/cli-dev





# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)

**Note:** Version bump only for package @reskript/cli-dev





# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)

**Note:** Version bump only for package @reskript/cli-dev





# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)

**Note:** Version bump only for package @reskript/cli-dev





# [1.0.0-beta.27](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2021-01-28)

**Note:** Version bump only for package @reskript/cli-dev





# 1.0.0-beta.26 (2021-01-27)


### Features

* 修改配置文件名 ([22555e4](https://github.com/ecomfe/reskript/commit/22555e4cc14467543669e5f8b85d5bb7b627f9e7))
* 增加对finalize的返回值的校验 ([#10](https://github.com/ecomfe/reskript/issues/10)) ([a81a043](https://github.com/ecomfe/reskript/commit/a81a0436aa62f36483bfe930915cc33943ddc931))


### BREAKING CHANGES

* 配置文件名从`settings.js`改为了`reskript.config.js`
