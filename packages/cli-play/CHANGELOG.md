# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/cli-play





## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/cli-play





# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)

**Note:** Version bump only for package @reskript/cli-play





# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)


### Bug Fixes

* **build:** 把SVG转为组件时保留ref ([#159](https://github.com/ecomfe/reskript/issues/159)) ([863f582](https://github.com/ecomfe/reskript/commit/863f58254eb8bc3ee1e04eb04187b5381f570b5f))





# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

**Note:** Version bump only for package @reskript/cli-play





# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)


### Bug Fixes

* **deps:** 几个CLI包增加对core-js的peer依赖 ([#154](https://github.com/ecomfe/reskript/issues/154)) ([fc6f8a1](https://github.com/ecomfe/reskript/commit/fc6f8a172954574a83792cd7d7fce7a3261a3240))





# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)


### Bug Fixes

* **play:** 不应该让cli-play直接依赖react ([#152](https://github.com/ecomfe/reskript/issues/152)) ([0fa7bcf](https://github.com/ecomfe/reskript/commit/0fa7bcf78053544c3aecc2b3921a9d94ca5faf63))





# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)


### Bug Fixes

* **play:** 修复一些接口没有异步调用的问题 ([#145](https://github.com/ecomfe/reskript/issues/145)) ([5fd503a](https://github.com/ecomfe/reskript/commit/5fd503a414bc19d6e1a704e8da74731a0b9138e2))
* **play:** 在play命令启动时增加是否安装core-js的检测 ([#144](https://github.com/ecomfe/reskript/issues/144)) ([7ad0678](https://github.com/ecomfe/reskript/commit/7ad067804041c459ad6caeedc52ba47fda5214e5))





# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)

**Note:** Version bump only for package @reskript/cli-play





# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)


* feat(dev)!: 支持webpack-dev-server 4版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
* feat!: 对外暴露的API转为异步 (#130) ([f423d55](https://github.com/ecomfe/reskript/commit/f423d55efc890abd54e8958d4005c0285c91252d)), closes [#130](https://github.com/ecomfe/reskript/issues/130)
* feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)


### Features

* **build:** 增加严格模式开关 ([#54](https://github.com/ecomfe/reskript/issues/54)) ([3e00afc](https://github.com/ecomfe/reskript/commit/3e00afc503371412a30260c5a836935b47b7eb60))


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


### Bug Fixes

* **play:** 删除源码中多出来的dist文件 ([31d7375](https://github.com/ecomfe/reskript/commit/31d7375258e2faa87fbce97b7af26d418ac7003c))





## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/cli-play





# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)


### Features

* **play:** 支持全局的组件调试配置 ([#120](https://github.com/ecomfe/reskript/issues/120)) ([4c4f068](https://github.com/ecomfe/reskript/commit/4c4f068ef6e58744d889823c379e10ced02e22a8))
* **play:** 让play支持React 18和并发模式 ([#122](https://github.com/ecomfe/reskript/issues/122)) ([31ec53e](https://github.com/ecomfe/reskript/commit/31ec53e502f3c85357ade52d78cc493d66145cd9))





## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)


### Bug Fixes

* **init:** 导入SVG组件的类型声明优化 ([#117](https://github.com/ecomfe/reskript/issues/117)) ([cbd5981](https://github.com/ecomfe/reskript/commit/cbd598169260ecbeb6ac827b2f2efe91eb7edb20))





## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

**Note:** Version bump only for package @reskript/cli-play





# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)


### Bug Fixes

* **play:** 升级monaco-editor兼容play的版本 ([#111](https://github.com/ecomfe/reskript/issues/111)) ([77fd26e](https://github.com/ecomfe/reskript/commit/77fd26ee787f3c4bcfacf1ccb26b6c595f93d073))





## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)


### Bug Fixes

* **play:** 在PlayGround使用新的方式引入SVG图标 ([#108](https://github.com/ecomfe/reskript/issues/108)) ([28d10bc](https://github.com/ecomfe/reskript/commit/28d10bcd88504091905b276781fbf9c0ab74ab3c))
* **play:** 在play中开启StrictMode ([#109](https://github.com/ecomfe/reskript/issues/109)) ([28c8464](https://github.com/ecomfe/reskript/commit/28c8464bd6dcb33c7e13e6bdf33a812458354704))





# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)

**Note:** Version bump only for package @reskript/cli-play





## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

**Note:** Version bump only for package @reskript/cli-play





## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

**Note:** Version bump only for package @reskript/cli-play





# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)

**Note:** Version bump only for package @reskript/cli-play





## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)

**Note:** Version bump only for package @reskript/cli-play





## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)


### Bug Fixes

* **play:** 格式化时间逻辑错误 ([73e4893](https://github.com/ecomfe/reskript/commit/73e4893773fd6bc3cab71dcda65babb545823db7))





# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)


### Features

* **build:** 管理和读取各类.env文件 ([#74](https://github.com/ecomfe/reskript/issues/74)) ([83c9699](https://github.com/ecomfe/reskript/commit/83c96994c4cb5eb98978345f109c03f3901cefd2))
* **play:** 支持--host参数指定打开页面的主机名 ([#100](https://github.com/ecomfe/reskript/issues/100)) ([86b9b82](https://github.com/ecomfe/reskript/commit/86b9b82ffd3d333388d34d31e2af5ab1bb7c6630))
* **play:** 支持自定义端口 ([#99](https://github.com/ecomfe/reskript/issues/99)) ([ba1def2](https://github.com/ecomfe/reskript/commit/ba1def2ed35fe04b74c1fc6c8697e1ff3fcd37ff))





## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)

**Note:** Version bump only for package @reskript/cli-play





## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)

**Note:** Version bump only for package @reskript/cli-play





## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

**Note:** Version bump only for package @reskript/cli-play





# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)


### Features

* **play:** 在选择用例时更新用例的最后执行时间 ([#89](https://github.com/ecomfe/reskript/issues/89)) ([15b2513](https://github.com/ecomfe/reskript/commit/15b251390eb0aa282174d0109deaf22922745f4d))
* **play:** 支持显示用例说明和帮助信息 ([#88](https://github.com/ecomfe/reskript/issues/88)) ([6484c77](https://github.com/ecomfe/reskript/commit/6484c77b470c2eb1ebe8f16a8d5974b55b661320))





# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)


### Features

* **play:** 使用WebSocket实时推送用例文件的修改 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([fa2990b](https://github.com/ecomfe/reskript/commit/fa2990b04bb1f38f9c0aed3429baba03ae7c5576))
* **play:** 支持将调试中的代码保存为用例 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([429d0a6](https://github.com/ecomfe/reskript/commit/429d0a66f13a9b61850ea6a295149cc4d149bdd3))
* **play:** 支持自定义调试用例 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([8021d98](https://github.com/ecomfe/reskript/commit/8021d9824149163144105242fa265e259cd7ffad))
* **play:** 支持调试组件时自定义配置关联依赖注入和自定义布局 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([44d82c6](https://github.com/ecomfe/reskript/commit/44d82c6e564563f435327f926aa28c9e84256999))
* **play:** 更新当前用例功能 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([cfda004](https://github.com/ecomfe/reskript/commit/cfda004103384728a4e6c9e215497585ae631550))





# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)

**Note:** Version bump only for package @reskript/cli-play





## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

**Note:** Version bump only for package @reskript/cli-play





# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)

**Note:** Version bump only for package @reskript/cli-play





## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

**Note:** Version bump only for package @reskript/cli-play





## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)

**Note:** Version bump only for package @reskript/cli-play





# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)

**Note:** Version bump only for package @reskript/cli-play





# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)


### Features

* **build:** 支持自定义入口配置，如指定输出文件名 ([#56](https://github.com/ecomfe/reskript/issues/56)) ([84fa53b](https://github.com/ecomfe/reskript/commit/84fa53b72fedb041db77cf7f3b1c209823b185fb))
* **build:** 自动构建service worker ([#53](https://github.com/ecomfe/reskript/issues/53)) ([f1e42c5](https://github.com/ecomfe/reskript/commit/f1e42c5df7cf3b2fe1951f087530fe93096b3baf))





# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)

**Note:** Version bump only for package @reskript/cli-play





## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)

**Note:** Version bump only for package @reskript/cli-play





# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)

**Note:** Version bump only for package @reskript/cli-play





## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)

**Note:** Version bump only for package @reskript/cli-play





# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)

**Note:** Version bump only for package @reskript/cli-play





# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)

**Note:** Version bump only for package @reskript/cli-play





# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)

**Note:** Version bump only for package @reskript/cli-play





# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)


### Features

* **dev:** 支持指定入口进行调试 ([#28](https://github.com/ecomfe/reskript/issues/28)) ([284f141](https://github.com/ecomfe/reskript/commit/284f141d6f023336c51dc51f4b804d2970cda2a6))





# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

**Note:** Version bump only for package @reskript/cli-play





# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)

**Note:** Version bump only for package @reskript/cli-play





# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)

**Note:** Version bump only for package @reskript/cli-play





# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)

**Note:** Version bump only for package @reskript/cli-play





# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)

**Note:** Version bump only for package @reskript/cli-play





# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)

**Note:** Version bump only for package @reskript/cli-play





# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)


### Bug Fixes

* **play:** Monaco的配置错误导致没有代码高亮 ([4185ab8](https://github.com/ecomfe/reskript/commit/4185ab854f6386d7e42d08a91b19e74c3c0be8bc))


### Features

* **play:** skr play支持自定义组件外层布局 ([#16](https://github.com/ecomfe/reskript/issues/16)) ([8813e40](https://github.com/ecomfe/reskript/commit/8813e40898945a0196ee136a5c935e32243f765a))





# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)


### Bug Fixes

* **play:** skr-play配置错误 ([2bcebea](https://github.com/ecomfe/reskript/commit/2bcebea99e76d3cb943e5c4537c8fd1983fa90d8))





# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)


### Bug Fixes

* **play:** 入口文件路径错误 ([a320b22](https://github.com/ecomfe/reskript/commit/a320b226fd2a7c17fbbbdf97d1c84b5f2de6b427))





# [1.0.0-beta.27](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2021-01-28)


### Features

* **play:** skr play功能 ([#11](https://github.com/ecomfe/reskript/issues/11)) ([5a2e7ea](https://github.com/ecomfe/reskript/commit/5a2e7eaf6bbe84c9f1ec2cb8dc4e41bdd5388419))
