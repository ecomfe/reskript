# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.1](https://github.com/ecomfe/reskript/compare/v4.0.0...v4.0.1) (2022-02-07)


### Bug Fixes

* **settings:** 调用插件时增加当前命令行的输入参数 ([#247](https://github.com/ecomfe/reskript/issues/247)) ([ca05e41](https://github.com/ecomfe/reskript/commit/ca05e419cb079f2f44a088957dea828134543c99))





# [4.0.0](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.2...v4.0.0) (2022-02-03)

**Note:** Version bump only for package @reskript/doctor





# [4.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-02-02)

**Note:** Version bump only for package @reskript/doctor





# [4.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2022-02-01)


### Bug Fixes

* **doctor:** 解决V4升级检查的部分错误 ([18ec902](https://github.com/ecomfe/reskript/commit/18ec90268880359b7e7e3f9f9083197f113ca996))
* **doctor:** 额外检查配置文件中一些CommonJS专用函数和变量的使用 ([341190f](https://github.com/ecomfe/reskript/commit/341190f965b002335c61fb63550a029499c6cbe6))


### Features

* **build:** 支持各个loader的ESM化 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([d7451e5](https://github.com/ecomfe/reskript/commit/d7451e5fd6c88aed0bcfdd11e807948a824ce2f3))





# [4.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v3.0.6...v4.0.0-beta.0) (2022-01-30)


### Code Refactoring

* 核心部分迁移到纯ESM包格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([f9d06b0](https://github.com/ecomfe/reskript/commit/f9d06b0fd802caa002707686d004ca8683f7002f))


### Features

* **doctor:** 增加V4迁移文档和检测 ([fa1e55b](https://github.com/ecomfe/reskript/commit/fa1e55bc7d80c18a33998b36328661b4f1a516a9))
* **settings:** 支持且仅支持.mjs和.ts类型的项目配置 ([#225](https://github.com/ecomfe/reskript/issues/225)) ([5a9586b](https://github.com/ecomfe/reskript/commit/5a9586b053f16d89a7b87b22dd6a4ca84d96edd2))
* **settings:** 支持自定义配置文件路径 ([#230](https://github.com/ecomfe/reskript/issues/230)) ([2a4ca98](https://github.com/ecomfe/reskript/commit/2a4ca987ae7e193916ed8c7972dbcbff521b4863))


### BREAKING CHANGES

* **settings:** 项目配置必须为`reskript.config.{mjs|ts}`，且格式为ESM
* **settings:** 应用入口配置必须为`xxx.config.{mjs|ts}`，且格式为ESM
* 发布的包为纯ESM格式，无法通过CommonJS的`require`引入。参考[sinderesorhus的建议](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)





## [3.0.6](https://github.com/ecomfe/reskript/compare/v3.0.5...v3.0.6) (2022-01-21)

**Note:** Version bump only for package @reskript/doctor





## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)


### Bug Fixes

* **core:** 修复globby在Windows下跨盘使用的问题 ([#239](https://github.com/ecomfe/reskript/issues/239)) ([c59ccf2](https://github.com/ecomfe/reskript/commit/c59ccf25fa97f129c3a3686e7450453ecff7eead))





## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

**Note:** Version bump only for package @reskript/doctor





## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)


### Bug Fixes

* **core:** 所有globby调用兼容Windows系统 ([#239](https://github.com/ecomfe/reskript/issues/239)) ([ae4c142](https://github.com/ecomfe/reskript/commit/ae4c142c39a2932a00f41e0b41abbde011044c6c))





## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

**Note:** Version bump only for package @reskript/doctor





## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)


### Bug Fixes

* **doctor:** 迁移V3的检查包含对配置文件的检查 ([#226](https://github.com/ecomfe/reskript/issues/226)) ([0d97d20](https://github.com/ecomfe/reskript/commit/0d97d207723b90cf45df84daff23a5a31eb3614d))





# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package @reskript/doctor





# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)


### Bug Fixes

* **doctor:** 修复migrate命令 ([b9f0ba7](https://github.com/ecomfe/reskript/commit/b9f0ba79f575a3fd8ba093120095cea3782e8f92))





# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)


### Features

* **doctor:** 更新migrate支持V3 ([49f3098](https://github.com/ecomfe/reskript/commit/49f30987f7f475fc8ded557f4a82b28e3cbab1fa))
* 支持eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))


### BREAKING CHANGES

* 需要`eslint`升级至`8.x`





## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)

**Note:** Version bump only for package @reskript/doctor





## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

**Note:** Version bump only for package @reskript/doctor





## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)

**Note:** Version bump only for package @reskript/doctor





# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)

**Note:** Version bump only for package @reskript/doctor





# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)

**Note:** Version bump only for package @reskript/doctor





# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)

**Note:** Version bump only for package @reskript/doctor





## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/doctor





## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/doctor





# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)

**Note:** Version bump only for package @reskript/doctor





# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)


### Bug Fixes

* **doctor:** 加载入口配置时未转换成绝对路径 ([#157](https://github.com/ecomfe/reskript/issues/157)) ([fc689fa](https://github.com/ecomfe/reskript/commit/fc689fa0f11f0457486c8ace00143e064ff5e22c))





# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

**Note:** Version bump only for package @reskript/doctor





# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)


### Features

* **doctor:** 增加V2版本迁移的自动化检测 ([#151](https://github.com/ecomfe/reskript/issues/151)) ([650e343](https://github.com/ecomfe/reskript/commit/650e343f1c03f227b0ae439b11f347fdecd3c3e6))





# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)

**Note:** Version bump only for package @reskript/doctor





# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

**Note:** Version bump only for package @reskript/doctor





# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)

**Note:** Version bump only for package @reskript/doctor





# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)


* feat!: 对外暴露的API转为异步 (#130) ([f423d55](https://github.com/ecomfe/reskript/commit/f423d55efc890abd54e8958d4005c0285c91252d)), closes [#130](https://github.com/ecomfe/reskript/issues/130)


### BREAKING CHANGES

* `settings`、`core`、`config-webpack`和`config-webpack-dev-server`的接口均变为异步函数
* `BuildContext`的`cache`属性由`boolean`变为`persist` | `transient` | `off`
* NodeJS最低版本要求为14.14.0





## [1.15.2](https://github.com/ecomfe/reskript/compare/v1.15.1...v1.15.2) (2021-08-24)

**Note:** Version bump only for package @reskript/doctor





## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/doctor





# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)

**Note:** Version bump only for package @reskript/doctor





## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)

**Note:** Version bump only for package @reskript/doctor





## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

**Note:** Version bump only for package @reskript/doctor





# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)

**Note:** Version bump only for package @reskript/doctor





## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)

**Note:** Version bump only for package @reskript/doctor





# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)

**Note:** Version bump only for package @reskript/doctor





## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

**Note:** Version bump only for package @reskript/doctor





## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

**Note:** Version bump only for package @reskript/doctor





# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)


### Features

* **plugin-workspace-no-build:** 一个能在monorepo下直接依赖其它子包的源码的插件 ([#103](https://github.com/ecomfe/reskript/issues/103)) ([81ab9e1](https://github.com/ecomfe/reskript/commit/81ab9e12c49661907362587f92b5fdf7f780d9f5))





## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)

**Note:** Version bump only for package @reskript/doctor





## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)

**Note:** Version bump only for package @reskript/doctor





# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)

**Note:** Version bump only for package @reskript/doctor





## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)

**Note:** Version bump only for package @reskript/doctor





## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)

**Note:** Version bump only for package @reskript/doctor





## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

**Note:** Version bump only for package @reskript/doctor





# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)

**Note:** Version bump only for package @reskript/doctor





# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)

**Note:** Version bump only for package @reskript/doctor





# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)

**Note:** Version bump only for package @reskript/doctor





## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

**Note:** Version bump only for package @reskript/doctor





# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)

**Note:** Version bump only for package @reskript/doctor





## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

**Note:** Version bump only for package @reskript/doctor





## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)

**Note:** Version bump only for package @reskript/doctor





# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)

**Note:** Version bump only for package @reskript/doctor





# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)

**Note:** Version bump only for package @reskript/doctor





# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)

**Note:** Version bump only for package @reskript/doctor





## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)

**Note:** Version bump only for package @reskript/doctor





# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)

**Note:** Version bump only for package @reskript/doctor





## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)

**Note:** Version bump only for package @reskript/doctor





# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)

**Note:** Version bump only for package @reskript/doctor





# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)

**Note:** Version bump only for package @reskript/doctor





# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)


### chore

* **build:** 更新less到4.x版本 ([48a9c00](https://github.com/ecomfe/reskript/commit/48a9c00345f09cbefdb51dd6474f3ab2925c6760))


### BREAKING CHANGES

* **build:** 具体变更参考[less 4.x的说明](https://github.com/less/less.js/releases/tag/v4.0.0)





# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)

**Note:** Version bump only for package @reskript/doctor





# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

**Note:** Version bump only for package @reskript/doctor





# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)

**Note:** Version bump only for package @reskript/doctor





# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)

**Note:** Version bump only for package @reskript/doctor





# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)


### Bug Fixes

* **doctor:** 标记为公开包 ([21c47a1](https://github.com/ecomfe/reskript/commit/21c47a1b2ea3be54ea1ca75cff7e726d4d613e65))





# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)


### Bug Fixes

* **doctor:** 标记为公开包 ([21c47a1](https://github.com/ecomfe/reskript/commit/21c47a1b2ea3be54ea1ca75cff7e726d4d613e65))





# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)


### Bug Fixes

* **doctor:** 拼写错误 ([00be463](https://github.com/ecomfe/reskript/commit/00be46369826b6c6957e93ed3678c854d341a04d))


### Features

* **doctor:** 增加检查项目合规的功能 ([#19](https://github.com/ecomfe/reskript/issues/19)) ([4cba664](https://github.com/ecomfe/reskript/commit/4cba6641fe30bd2f46dab9d2d4bfecaf74a67a1b))
