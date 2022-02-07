# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.1](https://github.com/ecomfe/reskript/compare/v4.0.0...v4.0.1) (2022-02-07)


### Bug Fixes

* **settings:** 调用插件时增加当前命令行的输入参数 ([#247](https://github.com/ecomfe/reskript/issues/247)) ([ca05e41](https://github.com/ecomfe/reskript/commit/ca05e419cb079f2f44a088957dea828134543c99))





# [4.0.0](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.2...v4.0.0) (2022-02-03)

**Note:** Version bump only for package @reskript/cli-babel





# [4.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-02-02)

**Note:** Version bump only for package @reskript/cli-babel





# [4.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2022-02-01)


### Features

* **build:** 支持各个loader的ESM化 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([d7451e5](https://github.com/ecomfe/reskript/commit/d7451e5fd6c88aed0bcfdd11e807948a824ce2f3))





# [4.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v3.0.6...v4.0.0-beta.0) (2022-01-30)


### Code Refactoring

* 核心部分迁移到纯ESM包格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([f9d06b0](https://github.com/ecomfe/reskript/commit/f9d06b0fd802caa002707686d004ca8683f7002f))


### Features

* **build:** 各个插件转为ESM格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([1950ace](https://github.com/ecomfe/reskript/commit/1950ace8c05d317b855a7f01b4680e54a011d61f))
* **settings:** 支持且仅支持.mjs和.ts类型的项目配置 ([#225](https://github.com/ecomfe/reskript/issues/225)) ([5a9586b](https://github.com/ecomfe/reskript/commit/5a9586b053f16d89a7b87b22dd6a4ca84d96edd2))


### BREAKING CHANGES

* **settings:** 项目配置必须为`reskript.config.{mjs|ts}`，且格式为ESM
* **settings:** 应用入口配置必须为`xxx.config.{mjs|ts}`，且格式为ESM
* 发布的包为纯ESM格式，无法通过CommonJS的`require`引入。参考[sinderesorhus的建议](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)





## [3.0.6](https://github.com/ecomfe/reskript/compare/v3.0.5...v3.0.6) (2022-01-21)

**Note:** Version bump only for package @reskript/cli-babel





## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)


### Bug Fixes

* **core:** 使用fs.stat判断文件和目录 ([#241](https://github.com/ecomfe/reskript/issues/241)) ([7f18310](https://github.com/ecomfe/reskript/commit/7f183103c320b9cccbaea8c79daa985f962af265))
* **core:** 修复globby在Windows下跨盘使用的问题 ([#239](https://github.com/ecomfe/reskript/issues/239)) ([c59ccf2](https://github.com/ecomfe/reskript/commit/c59ccf25fa97f129c3a3686e7450453ecff7eead))





## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

**Note:** Version bump only for package @reskript/cli-babel





## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)


### Bug Fixes

* **core:** 所有globby调用兼容Windows系统 ([#239](https://github.com/ecomfe/reskript/issues/239)) ([ae4c142](https://github.com/ecomfe/reskript/commit/ae4c142c39a2932a00f41e0b41abbde011044c6c))





## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

**Note:** Version bump only for package @reskript/cli-babel





## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)

**Note:** Version bump only for package @reskript/cli-babel





# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package @reskript/cli-babel





# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)

**Note:** Version bump only for package @reskript/cli-babel





# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)


### Features

* 支持eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))


### BREAKING CHANGES

* 需要`eslint`升级至`8.x`





## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)


### Bug Fixes

* **babel:** cli-babel禁用客户端的babel配置 ([#224](https://github.com/ecomfe/reskript/issues/224)) ([3c2265b](https://github.com/ecomfe/reskript/commit/3c2265bed7c2c8df6dd41fa2d8b1709c0dd829d2))





## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

**Note:** Version bump only for package @reskript/cli-babel





## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)

**Note:** Version bump only for package @reskript/cli-babel





# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)

**Note:** Version bump only for package @reskript/cli-babel





# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)

**Note:** Version bump only for package @reskript/cli-babel





# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)

**Note:** Version bump only for package @reskript/cli-babel





## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/cli-babel





## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/cli-babel





# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)

**Note:** Version bump only for package @reskript/cli-babel





# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)

**Note:** Version bump only for package @reskript/cli-babel





# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

**Note:** Version bump only for package @reskript/cli-babel





# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)


### Bug Fixes

* **deps:** 几个CLI包增加对core-js的peer依赖 ([#154](https://github.com/ecomfe/reskript/issues/154)) ([fc6f8a1](https://github.com/ecomfe/reskript/commit/fc6f8a172954574a83792cd7d7fce7a3261a3240))





# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)

**Note:** Version bump only for package @reskript/cli-babel





# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

**Note:** Version bump only for package @reskript/cli-babel





# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)

**Note:** Version bump only for package @reskript/cli-babel





# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)


* feat(dev)!: 支持webpack-dev-server 4版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
* feat!: 对外暴露的API转为异步 (#130) ([f423d55](https://github.com/ecomfe/reskript/commit/f423d55efc890abd54e8958d4005c0285c91252d)), closes [#130](https://github.com/ecomfe/reskript/issues/130)
* feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)


### BREAKING CHANGES

* `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
* `devServer.hot`的类型修改为`boolean`
* `config-babel`的`hot`配置类型修改为`boolean`
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

**Note:** Version bump only for package @reskript/cli-babel





## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/cli-babel





# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)

**Note:** Version bump only for package @reskript/cli-babel





## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)

**Note:** Version bump only for package @reskript/cli-babel





## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

**Note:** Version bump only for package @reskript/cli-babel





# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)

**Note:** Version bump only for package @reskript/cli-babel





## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)

**Note:** Version bump only for package @reskript/cli-babel





# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)

**Note:** Version bump only for package @reskript/cli-babel





## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

**Note:** Version bump only for package @reskript/cli-babel





## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

**Note:** Version bump only for package @reskript/cli-babel





# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)

**Note:** Version bump only for package @reskript/cli-babel





## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)

**Note:** Version bump only for package @reskript/cli-babel





## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)

**Note:** Version bump only for package @reskript/cli-babel





# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)

**Note:** Version bump only for package @reskript/cli-babel





## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)

**Note:** Version bump only for package @reskript/cli-babel





## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)

**Note:** Version bump only for package @reskript/cli-babel





## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

**Note:** Version bump only for package @reskript/cli-babel





# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)

**Note:** Version bump only for package @reskript/cli-babel





# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)

**Note:** Version bump only for package @reskript/cli-babel





# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)

**Note:** Version bump only for package @reskript/cli-babel





## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

**Note:** Version bump only for package @reskript/cli-babel





# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)

**Note:** Version bump only for package @reskript/cli-babel





## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

**Note:** Version bump only for package @reskript/cli-babel





## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)

**Note:** Version bump only for package @reskript/cli-babel





# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)


### Bug Fixes

* **babel:** 输出文件时没有保留目录结构 ([#61](https://github.com/ecomfe/reskript/issues/61)) ([f219279](https://github.com/ecomfe/reskript/commit/f21927975f9da3f3eb5e1b62a51827f379197570))





# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)


### Bug Fixes

* **build:** 更新class-names-loader兼容旧版本浏览器 ([#51](https://github.com/ecomfe/reskript/issues/51)) ([abf649a](https://github.com/ecomfe/reskript/commit/abf649a0aaed2ed100bbe12aeb3e2f478b5a6b05))





# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)

**Note:** Version bump only for package @reskript/cli-babel





## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)

**Note:** Version bump only for package @reskript/cli-babel





# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)

**Note:** Version bump only for package @reskript/cli-babel





## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)

**Note:** Version bump only for package @reskript/cli-babel





# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)

**Note:** Version bump only for package @reskript/cli-babel





# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)


### Bug Fixes

* **cli:** 标准化程序的退出码 ([#30](https://github.com/ecomfe/reskript/issues/30)) ([86229a6](https://github.com/ecomfe/reskript/commit/86229a6d51cccfc2abbfaff3d6f36390f8ccf1dd))





# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)

**Note:** Version bump only for package @reskript/cli-babel





# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)


### Bug Fixes

* **babel:** skr babel不应该替换core-js的引用 ([0c24ccd](https://github.com/ecomfe/reskript/commit/0c24ccd404c806e6d49ea8b19338e32d59e1aba8))


### Features

* **babel:** 增加skr babel命令 ([#8](https://github.com/ecomfe/reskript/issues/8)) ([bf9ba53](https://github.com/ecomfe/reskript/commit/bf9ba533652c2bdd11375f2058a21e9de99c8885))
