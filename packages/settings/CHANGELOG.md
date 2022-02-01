# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2022-02-01)


### Features

* **build:** 支持各个loader的ESM化 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([d7451e5](https://github.com/ecomfe/reskript/commit/d7451e5fd6c88aed0bcfdd11e807948a824ce2f3))





# [4.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v3.0.6...v4.0.0-beta.0) (2022-01-30)


### Code Refactoring

* 核心部分迁移到纯ESM包格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([f9d06b0](https://github.com/ecomfe/reskript/commit/f9d06b0fd802caa002707686d004ca8683f7002f))


### Features

* **settings:** 支持且仅支持.mjs和.ts类型的项目配置 ([#225](https://github.com/ecomfe/reskript/issues/225)) ([5a9586b](https://github.com/ecomfe/reskript/commit/5a9586b053f16d89a7b87b22dd6a4ca84d96edd2))
* **settings:** 支持异步的finalize函数 ([#233](https://github.com/ecomfe/reskript/issues/233)) ([ce84916](https://github.com/ecomfe/reskript/commit/ce84916af43c8cfb5e547788bf5dea0a8786a344))
* **settings:** 支持自定义配置文件路径 ([#230](https://github.com/ecomfe/reskript/issues/230)) ([2a4ca98](https://github.com/ecomfe/reskript/commit/2a4ca987ae7e193916ed8c7972dbcbff521b4863))


### Performance Improvements

* **build:** 异步检索loader路径优化性能 ([#234](https://github.com/ecomfe/reskript/issues/234)) ([3ace896](https://github.com/ecomfe/reskript/commit/3ace89660fac60986b5daa9c8a07d9cf4a6248c8))


### BREAKING CHANGES

* **settings:** 配置中的`build.scripts.finalize`调整为异步函数
* **settings:** 配置中的`build.finalize`调整为异步函数
* **settings:** 配置中的`devServer.finalize`调整为异步函数
* **settings:** 配置中的`build.scripts.finalize`的`internals`参数中的`loaders`和`rules`均调整为异步函数
* **settings:** `@reskript/config-webpack`不再导出`loaders`和`rules`，对应为`@reskript/config-webpack/loaders`和`@reskript/config-webpack/rules`
* **settings:** `loaders.postCSS`重命名为`loaders.postcss`
* **settings:** `loaders.postCSSModules`已经移除，功能与`loaders.postcss`完全一致
* **settings:** 项目配置必须为`reskript.config.{mjs|ts}`，且格式为ESM
* **settings:** 应用入口配置必须为`xxx.config.{mjs|ts}`，且格式为ESM
* 发布的包为纯ESM格式，无法通过CommonJS的`require`引入。参考[sinderesorhus的建议](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)





## [3.0.6](https://github.com/ecomfe/reskript/compare/v3.0.5...v3.0.6) (2022-01-21)

**Note:** Version bump only for package @reskript/settings





## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)

**Note:** Version bump only for package @reskript/settings





## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

**Note:** Version bump only for package @reskript/settings





## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)

**Note:** Version bump only for package @reskript/settings





## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

**Note:** Version bump only for package @reskript/settings





## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)

**Note:** Version bump only for package @reskript/settings





# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package @reskript/settings





# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)

**Note:** Version bump only for package @reskript/settings





# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)


### Features

* **dev:** 废弃https配置的boolean值 ([#223](https://github.com/ecomfe/reskript/issues/223)) ([ed58ffb](https://github.com/ecomfe/reskript/commit/ed58ffb93ed1621522c4bec98191d5dc308eadea))
* 支持eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))


### BREAKING CHANGES

* **dev:** `devServer.https: true`已经废弃，使用`devServer.https: {proxy: true}`代替
* 需要`eslint`升级至`8.x`





## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)

**Note:** Version bump only for package @reskript/settings





## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

**Note:** Version bump only for package @reskript/settings





## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)


### Bug Fixes

* **build:** 支持项目使用纯ESM格式，配置文件使用cjs ([#218](https://github.com/ecomfe/reskript/issues/218)) ([2646bac](https://github.com/ecomfe/reskript/commit/2646bac2f50e1ff52a0a7a4b088a7b282d6cf614))





# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)


### Features

* **dev:** 支持HTTPS协议启动调试服务器 ([#217](https://github.com/ecomfe/reskript/issues/217)) ([4646f77](https://github.com/ecomfe/reskript/commit/4646f77e30dd28f8e3f6b408ef81f325dcf1fd37))





# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)

**Note:** Version bump only for package @reskript/settings





# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)

**Note:** Version bump only for package @reskript/settings





## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/settings





## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/settings





# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)


### Features

* **build:** 增加一个产出检查项，确保产出的HTML适用于微前端 ([#163](https://github.com/ecomfe/reskript/issues/163)) ([5f6b252](https://github.com/ecomfe/reskript/commit/5f6b2524d89f8787c7a45ae4765928bc41535ef4))
* **cli:** 增加调试输出 ([#166](https://github.com/ecomfe/reskript/issues/166)) ([ca78e43](https://github.com/ecomfe/reskript/commit/ca78e438e6f667c76cd2fa63194a93c4ccac167d))





# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)

**Note:** Version bump only for package @reskript/settings





# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

**Note:** Version bump only for package @reskript/settings





# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)

**Note:** Version bump only for package @reskript/settings





# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)

**Note:** Version bump only for package @reskript/settings





# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

**Note:** Version bump only for package @reskript/settings





# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)


### Features

* **build:** 增加一些供插件开发者使用的类型 ([#142](https://github.com/ecomfe/reskript/issues/142)) ([1efd6a0](https://github.com/ecomfe/reskript/commit/1efd6a0899ceb594b15cf5462f33dac89b5220b1))





# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)


* feat(dev)!: 支持webpack-dev-server 4版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
* fix(build)!: 由用户自行安装core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)
* feat!: 对外暴露的API转为异步 (#130) ([f423d55](https://github.com/ecomfe/reskript/commit/f423d55efc890abd54e8958d4005c0285c91252d)), closes [#130](https://github.com/ecomfe/reskript/issues/130)
* feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)


### Features

* 支持tailwind ([#119](https://github.com/ecomfe/reskript/issues/119)) ([d636c80](https://github.com/ecomfe/reskript/commit/d636c804ddfbaae00674682a86cec5ec32ff9265))


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

**Note:** Version bump only for package @reskript/settings





## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/settings





# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)


### Features

* **flags:** 支持SKR_FLAGS设置遇到废弃配置直接退出 ([#124](https://github.com/ecomfe/reskript/issues/124)) ([7f2658a](https://github.com/ecomfe/reskript/commit/7f2658a890a1f714d1a003aeff44dcd446d447b1))
* **play:** 支持全局的组件调试配置 ([#120](https://github.com/ecomfe/reskript/issues/120)) ([4c4f068](https://github.com/ecomfe/reskript/commit/4c4f068ef6e58744d889823c379e10ced02e22a8))
* **play:** 让play支持React 18和并发模式 ([#122](https://github.com/ecomfe/reskript/issues/122)) ([31ec53e](https://github.com/ecomfe/reskript/commit/31ec53e502f3c85357ade52d78cc493d66145cd9))





## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)

**Note:** Version bump only for package @reskript/settings





## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

**Note:** Version bump only for package @reskript/settings





# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)

**Note:** Version bump only for package @reskript/settings





## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)

**Note:** Version bump only for package @reskript/settings





# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)


### Features

* **babel:** 增加对reflect-metadata的支持 ([#106](https://github.com/ecomfe/reskript/issues/106)) ([8d0f36b](https://github.com/ecomfe/reskript/commit/8d0f36b7957a0a7efd9ded92b4b6a259ddeb984d))
* **build:** 调整对svg文件的导入规则 ([#105](https://github.com/ecomfe/reskript/issues/105)) ([be7accc](https://github.com/ecomfe/reskript/commit/be7accc50f0a1fdb6698622ad110fd0cacb515cc))





## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

**Note:** Version bump only for package @reskript/settings





## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

**Note:** Version bump only for package @reskript/settings





# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)

**Note:** Version bump only for package @reskript/settings





## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)

**Note:** Version bump only for package @reskript/settings





## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)

**Note:** Version bump only for package @reskript/settings





# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)

**Note:** Version bump only for package @reskript/settings





## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)

**Note:** Version bump only for package @reskript/settings





## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)

**Note:** Version bump only for package @reskript/settings





## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

**Note:** Version bump only for package @reskript/settings





# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)


### Bug Fixes

* **play:** 使用play.wrapper配置时显示警告 ([#87](https://github.com/ecomfe/reskript/issues/87)) ([8cfe3f2](https://github.com/ecomfe/reskript/commit/8cfe3f25944a2289ffbf6595a69784f70d33f42f))





# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)


### Features

* **build:** 支持指定cache目录 ([#84](https://github.com/ecomfe/reskript/issues/84)) ([000efd1](https://github.com/ecomfe/reskript/commit/000efd1ee4b3f03c0d714513c9f21cf2da7b3960))
* **play:** 支持调试组件时自定义配置关联依赖注入和自定义布局 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([44d82c6](https://github.com/ecomfe/reskript/commit/44d82c6e564563f435327f926aa28c9e84256999))





# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)


### Features

* **build:** 为build.finalize提供内置的loader ([#70](https://github.com/ecomfe/reskript/issues/70)) ([8fc92dc](https://github.com/ecomfe/reskript/commit/8fc92dcb30603873474183d4e45af93133e4a66d))
* **build:** 增加配置支持使用方选择性引入第三方库的专项优化 ([#79](https://github.com/ecomfe/reskript/issues/79)) ([f8ea13d](https://github.com/ecomfe/reskript/commit/f8ea13d2c16b11dae1a42d78cfa98d097350ef56))
* **build:** 支持emotion管理样式 ([#78](https://github.com/ecomfe/reskript/issues/78)) ([e13e9a5](https://github.com/ecomfe/reskript/commit/e13e9a5a4c323c8690be674523041d4a607df9f8))





## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

**Note:** Version bump only for package @reskript/settings





# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)

**Note:** Version bump only for package @reskript/settings





## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

**Note:** Version bump only for package @reskript/settings





## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)

**Note:** Version bump only for package @reskript/settings





# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)

**Note:** Version bump only for package @reskript/settings





# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)


### Features

* **build:** 自动构建service worker ([#53](https://github.com/ecomfe/reskript/issues/53)) ([f1e42c5](https://github.com/ecomfe/reskript/commit/f1e42c5df7cf3b2fe1951f087530fe93096b3baf))





# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)


### Features

* **build:** 增加配置支持生成HTML时注入应用容器div ([#50](https://github.com/ecomfe/reskript/issues/50)) ([49633c5](https://github.com/ecomfe/reskript/commit/49633c5d1d19d5882b91750bf99c0077ff72d941))





## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)

**Note:** Version bump only for package @reskript/settings





# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)

**Note:** Version bump only for package @reskript/settings





## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)

**Note:** Version bump only for package @reskript/settings





# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)


### Features

* 支持关闭自动生成displayName的功能 ([#34](https://github.com/ecomfe/reskript/issues/34)) ([938f121](https://github.com/ecomfe/reskript/commit/938f12141511eb5b131d8e8d7ee636ff33c6859e))
* 给build.finalize传递rules对象 ([#23](https://github.com/ecomfe/reskript/issues/23)) ([e5f94e1](https://github.com/ecomfe/reskript/commit/e5f94e17bb6e4d24d61ca35550198aede09a443e))
* **build:** 分析产出中重复引入的依赖包 ([#15](https://github.com/ecomfe/reskript/issues/15)) ([9e01f1e](https://github.com/ecomfe/reskript/commit/9e01f1eea1a2373b329edf544fefe25f95fa68b3))





# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)


### Bug Fixes

* **settings:** 配置的校验里缺失publicPath字段 ([b0aea2a](https://github.com/ecomfe/reskript/commit/b0aea2ab47b9d70ef6819929e04ceab175a7daa7))


### Features

* **dev:** 支持proxyRewrite配置多API代理目标 ([#32](https://github.com/ecomfe/reskript/issues/32)) ([8f63fc1](https://github.com/ecomfe/reskript/commit/8f63fc1a27adab38437b3c2be63425a0e7ca281a))





# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)


### Bug Fixes

* **cli:** 标准化程序的退出码 ([#30](https://github.com/ecomfe/reskript/issues/30)) ([86229a6](https://github.com/ecomfe/reskript/commit/86229a6d51cccfc2abbfaff3d6f36390f8ccf1dd))


### chore

* **build:** 更新less到4.x版本 ([48a9c00](https://github.com/ecomfe/reskript/commit/48a9c00345f09cbefdb51dd6474f3ab2925c6760))


### Features

* **build:** 分析构建产出的初始加载资源 ([#15](https://github.com/ecomfe/reskript/issues/15)) ([28a9009](https://github.com/ecomfe/reskript/commit/28a900963962680ea57bf9c50e20533d4880340d))
* **build:** 支持构建产物中初始资源的全部检查规则 ([#15](https://github.com/ecomfe/reskript/issues/15)) ([5d22227](https://github.com/ecomfe/reskript/commit/5d2222735fa3bd666b1d5f7675d723a07822723d))


### BREAKING CHANGES

* **build:** 具体变更参考[less 4.x的说明](https://github.com/less/less.js/releases/tag/v4.0.0)





# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)

**Note:** Version bump only for package @reskript/settings





# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

**Note:** Version bump only for package @reskript/settings





# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)

**Note:** Version bump only for package @reskript/settings





# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)


### Features

* 增加publicPath配置 ([#20](https://github.com/ecomfe/reskript/issues/20)) ([6c292a7](https://github.com/ecomfe/reskript/commit/6c292a78163c6d3e9fdf1fa6147e177d495aa35b))





# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)

**Note:** Version bump only for package @reskript/settings





# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)

**Note:** Version bump only for package @reskript/settings





# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)

**Note:** Version bump only for package @reskript/settings





# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)


### Features

* **play:** skr play支持自定义组件外层布局 ([#16](https://github.com/ecomfe/reskript/issues/16)) ([8813e40](https://github.com/ecomfe/reskript/commit/8813e40898945a0196ee136a5c935e32243f765a))





# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)

**Note:** Version bump only for package @reskript/settings





# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)

**Note:** Version bump only for package @reskript/settings





# [1.0.0-beta.27](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2021-01-28)


### Features

* **play:** skr play功能 ([#11](https://github.com/ecomfe/reskript/issues/11)) ([5a2e7ea](https://github.com/ecomfe/reskript/commit/5a2e7eaf6bbe84c9f1ec2cb8dc4e41bdd5388419))





# 1.0.0-beta.26 (2021-01-27)


### Features

* 修改配置文件名 ([22555e4](https://github.com/ecomfe/reskript/commit/22555e4cc14467543669e5f8b85d5bb7b627f9e7))
* 增加对finalize的返回值的校验 ([#10](https://github.com/ecomfe/reskript/issues/10)) ([a81a043](https://github.com/ecomfe/reskript/commit/a81a0436aa62f36483bfe930915cc33943ddc931))


### BREAKING CHANGES

* 配置文件名从`settings.js`改为了`reskript.config.js`
