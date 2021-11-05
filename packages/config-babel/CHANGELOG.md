# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)


### Bug Fixes

* **build:** 修复emotion插件在production环境下丢失样式的问题 ([#187](https://github.com/ecomfe/reskript/issues/187)) ([1635511](https://github.com/ecomfe/reskript/commit/1635511937df849b8acb7538c58990b52b90c1a8))
* **deps:** 解决各种peer依赖的问题 ([#190](https://github.com/ecomfe/reskript/issues/190)) ([6821454](https://github.com/ecomfe/reskript/commit/6821454217d9888c02b6f7b65f9d5e9666688244))





## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/config-babel





## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/config-babel





# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)

**Note:** Version bump only for package @reskript/config-babel





# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)

**Note:** Version bump only for package @reskript/config-babel





# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

**Note:** Version bump only for package @reskript/config-babel





# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)

**Note:** Version bump only for package @reskript/config-babel





# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)

**Note:** Version bump only for package @reskript/config-babel





# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

**Note:** Version bump only for package @reskript/config-babel





# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)

**Note:** Version bump only for package @reskript/config-babel





# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)


* feat(dev)!: 支持webpack-dev-server 4版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
* fix(build)!: 由用户自行安装core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)
* feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)


### BREAKING CHANGES

* `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
* `devServer.hot`的类型修改为`boolean`
* `config-babel`的`hot`配置类型修改为`boolean`
* 不再处理`core-js`的引入，用户必须在项目中自行安装`core-js@3`
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

**Note:** Version bump only for package @reskript/config-babel





## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/config-babel





# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)


### Features

* **flags:** 支持SKR_FLAGS设置遇到废弃配置直接退出 ([#124](https://github.com/ecomfe/reskript/issues/124)) ([7f2658a](https://github.com/ecomfe/reskript/commit/7f2658a890a1f714d1a003aeff44dcd446d447b1))





## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)

**Note:** Version bump only for package @reskript/config-babel





## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

**Note:** Version bump only for package @reskript/config-babel





# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)

**Note:** Version bump only for package @reskript/config-babel





## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)

**Note:** Version bump only for package @reskript/config-babel





# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)


### Features

* **babel:** 增加对reflect-metadata的支持 ([#106](https://github.com/ecomfe/reskript/issues/106)) ([8d0f36b](https://github.com/ecomfe/reskript/commit/8d0f36b7957a0a7efd9ded92b4b6a259ddeb984d))





## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

**Note:** Version bump only for package @reskript/config-babel





## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

**Note:** Version bump only for package @reskript/config-babel





# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)

**Note:** Version bump only for package @reskript/config-babel





## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)

**Note:** Version bump only for package @reskript/config-babel





## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)

**Note:** Version bump only for package @reskript/config-babel





# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)

**Note:** Version bump only for package @reskript/config-babel





## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)

**Note:** Version bump only for package @reskript/config-babel





## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)


### Bug Fixes

* **babel:** 调整babel插件的顺序避免代码转换出错 ([#97](https://github.com/ecomfe/reskript/issues/97)) ([f9d6f97](https://github.com/ecomfe/reskript/commit/f9d6f979da88fe75f0029b519e416b090cb85f73))





## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

**Note:** Version bump only for package @reskript/config-babel





# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)


### Features

* **dev:** 增加一个babel插件为React组件注入对应源码路径 ([#91](https://github.com/ecomfe/reskript/issues/91)) ([fb0132d](https://github.com/ecomfe/reskript/commit/fb0132d31dc83128b8373da7b38ca0c3d32b4a9c))





# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)

**Note:** Version bump only for package @reskript/config-babel





# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)


### Features

* **build:** 增加配置支持使用方选择性引入第三方库的专项优化 ([#79](https://github.com/ecomfe/reskript/issues/79)) ([f8ea13d](https://github.com/ecomfe/reskript/commit/f8ea13d2c16b11dae1a42d78cfa98d097350ef56))
* **build:** 支持emotion管理样式 ([#78](https://github.com/ecomfe/reskript/issues/78)) ([e13e9a5](https://github.com/ecomfe/reskript/commit/e13e9a5a4c323c8690be674523041d4a607df9f8))





## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

**Note:** Version bump only for package @reskript/config-babel





# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)

**Note:** Version bump only for package @reskript/config-babel





## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

**Note:** Version bump only for package @reskript/config-babel





## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)

**Note:** Version bump only for package @reskript/config-babel





# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)

**Note:** Version bump only for package @reskript/config-babel





# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)


### Bug Fixes

* **build:** 更新class-names-loader兼容旧版本浏览器 ([#51](https://github.com/ecomfe/reskript/issues/51)) ([abf649a](https://github.com/ecomfe/reskript/commit/abf649a0aaed2ed100bbe12aeb3e2f478b5a6b05))





# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)

**Note:** Version bump only for package @reskript/config-babel





## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)

**Note:** Version bump only for package @reskript/config-babel





# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)

**Note:** Version bump only for package @reskript/config-babel





## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)

**Note:** Version bump only for package @reskript/config-babel





# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)


### Features

* 支持关闭自动生成displayName的功能 ([#34](https://github.com/ecomfe/reskript/issues/34)) ([938f121](https://github.com/ecomfe/reskript/commit/938f12141511eb5b131d8e8d7ee636ff33c6859e))





# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)

**Note:** Version bump only for package @reskript/config-babel





# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)


### chore

* **build:** 更新less到4.x版本 ([48a9c00](https://github.com/ecomfe/reskript/commit/48a9c00345f09cbefdb51dd6474f3ab2925c6760))


### BREAKING CHANGES

* **build:** 具体变更参考[less 4.x的说明](https://github.com/less/less.js/releases/tag/v4.0.0)





# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)

**Note:** Version bump only for package @reskript/config-babel





# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

**Note:** Version bump only for package @reskript/config-babel





# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)

**Note:** Version bump only for package @reskript/config-babel





# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)

**Note:** Version bump only for package @reskript/config-babel





# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)

**Note:** Version bump only for package @reskript/config-babel





# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)

**Note:** Version bump only for package @reskript/config-babel





# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)


### Bug Fixes

* **babel:** 仅用来转义的babel配置不应该替换core-js ([e94c38c](https://github.com/ecomfe/reskript/commit/e94c38c19f31ab120d61bb5bca7e9f5237b62fb8))





# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)

**Note:** Version bump only for package @reskript/config-babel





# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)

**Note:** Version bump only for package @reskript/config-babel





# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)


### Bug Fixes

* **babel:** skr babel不应该替换core-js的引用 ([0c24ccd](https://github.com/ecomfe/reskript/commit/0c24ccd404c806e6d49ea8b19338e32d59e1aba8))





# [1.0.0-beta.27](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2021-01-28)

**Note:** Version bump only for package @reskript/config-babel





# 1.0.0-beta.26 (2021-01-27)

**Note:** Version bump only for package @reskript/config-babel
