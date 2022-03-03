# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.3.0](https://github.com/ecomfe/reskript/compare/v4.2.1...v4.3.0) (2022-03-03)


### Bug Fixes

* **test:** 不要把d.ts文件作为可执行文件处理 ([#269](https://github.com/ecomfe/reskript/issues/269)) ([047e6fc](https://github.com/ecomfe/reskript/commit/047e6fc97d9f6534be0b6baa838385c2df560fb8))





## [4.2.1](https://github.com/ecomfe/reskript/compare/v4.2.0...v4.2.1) (2022-02-25)


### Bug Fixes

* **core:** 修复Windows下异步import的问题 ([#265](https://github.com/ecomfe/reskript/issues/265)) ([e8dac12](https://github.com/ecomfe/reskript/commit/e8dac128b2fccaf23804f343f7f22b5a07b273be))





# [4.2.0](https://github.com/ecomfe/reskript/compare/v4.1.2...v4.2.0) (2022-02-25)

**Note:** Version bump only for package @reskript/config-webpack





## [4.1.2](https://github.com/ecomfe/reskript/compare/v4.1.1...v4.1.2) (2022-02-10)


### Bug Fixes

* **build:** 转用less插件解决calc安全替换的问题 ([#258](https://github.com/ecomfe/reskript/issues/258)) ([bb23c35](https://github.com/ecomfe/reskript/commit/bb23c35e08a4d200c738106d984816079a01ea4d))
* **settings:** 调整配置文件校验逻辑，移除devServer.https的boolean值 ([#259](https://github.com/ecomfe/reskript/issues/259)) ([b2c2a45](https://github.com/ecomfe/reskript/commit/b2c2a45a928fc6312cd66078f172dd1a9ef15abf))





## [4.1.1](https://github.com/ecomfe/reskript/compare/v4.1.0...v4.1.1) (2022-02-08)

**Note:** Version bump only for package @reskript/config-webpack





# [4.1.0](https://github.com/ecomfe/reskript/compare/v4.0.1...v4.1.0) (2022-02-07)


### Bug Fixes

* **build:** 修复webpack的alias里，regenerator路径错误的问题 ([#251](https://github.com/ecomfe/reskript/issues/251)) ([b828e32](https://github.com/ecomfe/reskript/commit/b828e32348f4dccc2f76f4ea42a4f80022e5ae46))





## [4.0.1](https://github.com/ecomfe/reskript/compare/v4.0.0...v4.0.1) (2022-02-07)

**Note:** Version bump only for package @reskript/config-webpack





# [4.0.0](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.2...v4.0.0) (2022-02-03)


### Features

* 优化build.finalize的参数类型 ([#244](https://github.com/ecomfe/reskript/issues/244)) ([4fe2677](https://github.com/ecomfe/reskript/commit/4fe267765d6d63d1021cb2956fc8d5721e2568b6))





# [4.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-02-02)


### Bug Fixes

* **build:** 修复loader-of-loader会无视前置loader的问题 ([400ee50](https://github.com/ecomfe/reskript/commit/400ee50c691d029d4d6a128454436a7a102f69a8))
* **build:** 把loader-of-loader移到dependencies中 ([02c0a1d](https://github.com/ecomfe/reskript/commit/02c0a1d4faed9c4130840c02b796ea2011cb7f1a))





# [4.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2022-02-01)


### Features

* **build:** 支持各个loader的ESM化 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([d7451e5](https://github.com/ecomfe/reskript/commit/d7451e5fd6c88aed0bcfdd11e807948a824ce2f3))





# [4.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v3.0.6...v4.0.0-beta.0) (2022-01-30)


### Code Refactoring

* 核心部分迁移到纯ESM包格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([f9d06b0](https://github.com/ecomfe/reskript/commit/f9d06b0fd802caa002707686d004ca8683f7002f))


### Features

* **build:** 各个插件转为ESM格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([1950ace](https://github.com/ecomfe/reskript/commit/1950ace8c05d317b855a7f01b4680e54a011d61f))
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

**Note:** Version bump only for package @reskript/config-webpack





## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)

**Note:** Version bump only for package @reskript/config-webpack





## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

**Note:** Version bump only for package @reskript/config-webpack





## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)


### Bug Fixes

* **build:** 在svg生成组件后经过babel处理 ([#237](https://github.com/ecomfe/reskript/issues/237)) ([5ea17c3](https://github.com/ecomfe/reskript/commit/5ea17c380440e91e73584a9c871bbedb8d430e33))





## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

**Note:** Version bump only for package @reskript/config-webpack





## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)

**Note:** Version bump only for package @reskript/config-webpack





# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package @reskript/config-webpack





# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)


### Features

* **init:** init命令支持V3版本 ([45e6929](https://github.com/ecomfe/reskript/commit/45e692954fe52202b42495b3ed3c5c0288571934))





# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)


### Features

* 支持eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))
* 支持stylelint 14 ([#186](https://github.com/ecomfe/reskript/issues/186)) ([05e24c0](https://github.com/ecomfe/reskript/commit/05e24c0e8f004e7c342c138e00d1b73724545aa3))


### BREAKING CHANGES

* 需要`eslint`升级至`8.x`
* 需要`stylelint`升级至`14.x`





## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)

**Note:** Version bump only for package @reskript/config-webpack





## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

**Note:** Version bump only for package @reskript/config-webpack





## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)


### Bug Fixes

* **build:** 支持import的时候使用.js但指向.ts或.tsx ([#219](https://github.com/ecomfe/reskript/issues/219)) ([4bad498](https://github.com/ecomfe/reskript/commit/4bad49865cd55aa44e5bf41e72436ec91284c822))
* **build:** 支持项目使用纯ESM格式，配置文件使用cjs ([#218](https://github.com/ecomfe/reskript/issues/218)) ([2646bac](https://github.com/ecomfe/reskript/commit/2646bac2f50e1ff52a0a7a4b088a7b282d6cf614))





# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)


### Bug Fixes

* **build:** babel-loader不读取项目中的babel配置 ([#212](https://github.com/ecomfe/reskript/issues/212)) ([b9ea9a3](https://github.com/ecomfe/reskript/commit/b9ea9a3dd1f3b40b26ff40963b1b7e97a2a7617a))
* **build:** 在build时也同样读用户自定义的lint配置 ([#211](https://github.com/ecomfe/reskript/issues/211)) ([e580bce](https://github.com/ecomfe/reskript/commit/e580bce69a0d1a7f2714409d9611a50688020291))
* **build:** 处理SVG时转换class到className ([#216](https://github.com/ecomfe/reskript/issues/216)) ([37e7a4b](https://github.com/ecomfe/reskript/commit/37e7a4baadb54320b826423ac33354a10220f488))





# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)


### Features

* **build:** 引入psotcss-preset-env ([#204](https://github.com/ecomfe/reskript/issues/204)) ([f910249](https://github.com/ecomfe/reskript/commit/f9102496978c2fbaf2049c18cc0a5250b03daba1))
* **dev:** 支持组件源码文件调用编辑器打开 ([#201](https://github.com/ecomfe/reskript/issues/201)) ([bd743a6](https://github.com/ecomfe/reskript/commit/bd743a690990f20bd0f8b0edb5da949b82a92adc))





# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)


### Features

* 支持在修复代码风格后自动add文件 ([#177](https://github.com/ecomfe/reskript/issues/177)) ([27b423f](https://github.com/ecomfe/reskript/commit/27b423f4becff5391a3a1f5054317049f3c34bc5))





## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/config-webpack





## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/config-webpack





# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)


### Bug Fixes

* **build:** 为postcss指定具体实现 ([#165](https://github.com/ecomfe/reskript/issues/165)) ([8c06339](https://github.com/ecomfe/reskript/commit/8c063393d1b247a2575a05d1470ac07a35646392))
* **build:** 使生成的HTML方便被各种编辑器格式化后排查问题 ([#164](https://github.com/ecomfe/reskript/issues/164)) ([41f90e1](https://github.com/ecomfe/reskript/commit/41f90e1dcbef2d18f5cd491e2896d3a8c3983ce1))
* **build:** 修复strict模式设置require相关配置相反的问题 ([#161](https://github.com/ecomfe/reskript/issues/161)) ([92dab1b](https://github.com/ecomfe/reskript/commit/92dab1b521e661dbf1ea289842ddd63f574b3e6e))





# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)

**Note:** Version bump only for package @reskript/config-webpack





# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)


### Features

* **build:** 在严格模式下增加类型检查 ([#147](https://github.com/ecomfe/reskript/issues/147)) ([a2d293f](https://github.com/ecomfe/reskript/commit/a2d293f69a60aaf7e672de66f88014fc13b6748d))





# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)

**Note:** Version bump only for package @reskript/config-webpack





# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)


### Bug Fixes

* **build:** 修复读取入口配置时的逻辑错误 ([#149](https://github.com/ecomfe/reskript/issues/149)) ([0ce0026](https://github.com/ecomfe/reskript/commit/0ce00269216bb5c419467ad7b91ff2f40e295f39))


### Features

* **build:** 读取入口配置文件时增加校验 ([#150](https://github.com/ecomfe/reskript/issues/150)) ([fb24371](https://github.com/ecomfe/reskript/commit/fb2437133027b5750c60b313f2216f0cf7e4ab6b))





# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

**Note:** Version bump only for package @reskript/config-webpack





# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)


### Bug Fixes

* **build:** 修复对husky钩子检测的逻辑错误 ([#141](https://github.com/ecomfe/reskript/issues/141)) ([8b67c48](https://github.com/ecomfe/reskript/commit/8b67c4842e27bf5e54fb50cfebc9e2d5591a6d40))





# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)


* feat(dev)!: 支持webpack-dev-server 4版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
* feat(build)!: 废弃旧版本的入口配置文件格式 (#80) ([41ac823](https://github.com/ecomfe/reskript/commit/41ac823fa6ae482fea339c2f5e000e4a2fb83be3)), closes [#80](https://github.com/ecomfe/reskript/issues/80)
* fix(build)!: 由用户自行安装core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)
* feat!: 对外暴露的API转为异步 (#130) ([f423d55](https://github.com/ecomfe/reskript/commit/f423d55efc890abd54e8958d4005c0285c91252d)), closes [#130](https://github.com/ecomfe/reskript/issues/130)
* feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)


### Features

* **build:** 增加严格模式开关 ([#54](https://github.com/ecomfe/reskript/issues/54)) ([3e00afc](https://github.com/ecomfe/reskript/commit/3e00afc503371412a30260c5a836935b47b7eb60))
* 支持tailwind ([#119](https://github.com/ecomfe/reskript/issues/119)) ([d636c80](https://github.com/ecomfe/reskript/commit/d636c804ddfbaae00674682a86cec5ec32ff9265))


### BREAKING CHANGES

* `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
* `devServer.hot`的类型修改为`boolean`
* `config-babel`的`hot`配置类型修改为`boolean`
* 入口配置`entries/xxx.config.js`必须符合新格式，仅支持`entry`和`html`两个导出，原有配置均放进`html`中
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

**Note:** Version bump only for package @reskript/config-webpack





## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/config-webpack





# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)


### Features

* **flags:** 支持SKR_FLAGS设置遇到废弃配置直接退出 ([#124](https://github.com/ecomfe/reskript/issues/124)) ([7f2658a](https://github.com/ecomfe/reskript/commit/7f2658a890a1f714d1a003aeff44dcd446d447b1))





## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)

**Note:** Version bump only for package @reskript/config-webpack





## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

**Note:** Version bump only for package @reskript/config-webpack





# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)

**Note:** Version bump only for package @reskript/config-webpack





## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)

**Note:** Version bump only for package @reskript/config-webpack





# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)


### Features

* **build:** 调整对svg文件的导入规则 ([#105](https://github.com/ecomfe/reskript/issues/105)) ([be7accc](https://github.com/ecomfe/reskript/commit/be7accc50f0a1fdb6698622ad110fd0cacb515cc))





## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

**Note:** Version bump only for package @reskript/config-webpack





## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

**Note:** Version bump only for package @reskript/config-webpack





# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)


### Features

* **plugin-workspace-no-build:** 一个能在monorepo下直接依赖其它子包的源码的插件 ([#103](https://github.com/ecomfe/reskript/issues/103)) ([81ab9e1](https://github.com/ecomfe/reskript/commit/81ab9e12c49661907362587f92b5fdf7f780d9f5))





## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)


### Bug Fixes

* **build:** 用asset module代替url-loader ([#101](https://github.com/ecomfe/reskript/issues/101)) ([e40aeb7](https://github.com/ecomfe/reskript/commit/e40aeb74ab6127bdfe4a0bcabb0f692514c2bc60))





## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)

**Note:** Version bump only for package @reskript/config-webpack





# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)


### Features

* **build:** 管理和读取各类.env文件 ([#74](https://github.com/ecomfe/reskript/issues/74)) ([83c9699](https://github.com/ecomfe/reskript/commit/83c96994c4cb5eb98978345f109c03f3901cefd2))





## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)

**Note:** Version bump only for package @reskript/config-webpack





## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)

**Note:** Version bump only for package @reskript/config-webpack





## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

**Note:** Version bump only for package @reskript/config-webpack





# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)


### Bug Fixes

* **build:** 缓存标识增加pnpm-lock的内容 ([9214254](https://github.com/ecomfe/reskript/commit/9214254b3c5141afbf3e84e7d225a9b72fce1208))


### Features

* **dev:** 增加一个babel插件为React组件注入对应源码路径 ([#91](https://github.com/ecomfe/reskript/issues/91)) ([fb0132d](https://github.com/ecomfe/reskript/commit/fb0132d31dc83128b8373da7b38ca0c3d32b4a9c))





# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)


### Features

* **build:** 支持指定cache目录 ([#84](https://github.com/ecomfe/reskript/issues/84)) ([000efd1](https://github.com/ecomfe/reskript/commit/000efd1ee4b3f03c0d714513c9f21cf2da7b3960))





# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)


### Features

* **build:** 为build.finalize提供内置的loader ([#70](https://github.com/ecomfe/reskript/issues/70)) ([8fc92dc](https://github.com/ecomfe/reskript/commit/8fc92dcb30603873474183d4e45af93133e4a66d))
* **build:** 增加配置支持使用方选择性引入第三方库的专项优化 ([#79](https://github.com/ecomfe/reskript/issues/79)) ([f8ea13d](https://github.com/ecomfe/reskript/commit/f8ea13d2c16b11dae1a42d78cfa98d097350ef56))





## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

**Note:** Version bump only for package @reskript/config-webpack





# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)


### Bug Fixes

* **build:** monorepo下检测husky错误 ([#72](https://github.com/ecomfe/reskript/issues/72)) ([b86687a](https://github.com/ecomfe/reskript/commit/b86687a7712e4336e98c23457d9bae08a2e49688))





## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

**Note:** Version bump only for package @reskript/config-webpack





## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)

**Note:** Version bump only for package @reskript/config-webpack





# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)


### Features

* **build:** 支持--entries-dir参数指定入口目录 ([#36](https://github.com/ecomfe/reskript/issues/36)) ([dec298d](https://github.com/ecomfe/reskript/commit/dec298d9384849bfd14beaf2ca850b42362cd850))





# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)


### Bug Fixes

* **build:** 更新class-names-loader兼容旧版本浏览器 ([#51](https://github.com/ecomfe/reskript/issues/51)) ([abf649a](https://github.com/ecomfe/reskript/commit/abf649a0aaed2ed100bbe12aeb3e2f478b5a6b05))


### Features

* **build:** 支持自定义入口配置，如指定输出文件名 ([#56](https://github.com/ecomfe/reskript/issues/56)) ([84fa53b](https://github.com/ecomfe/reskript/commit/84fa53b72fedb041db77cf7f3b1c209823b185fb))
* **build:** 自动构建service worker ([#53](https://github.com/ecomfe/reskript/issues/53)) ([f1e42c5](https://github.com/ecomfe/reskript/commit/f1e42c5df7cf3b2fe1951f087530fe93096b3baf))





# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)


### Features

* **build:** 增加配置支持生成HTML时注入应用容器div ([#50](https://github.com/ecomfe/reskript/issues/50)) ([49633c5](https://github.com/ecomfe/reskript/commit/49633c5d1d19d5882b91750bf99c0077ff72d941))





## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)

**Note:** Version bump only for package @reskript/config-webpack





# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)

**Note:** Version bump only for package @reskript/config-webpack





## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)


### Bug Fixes

* config-webpack需要less-safe-loader的依赖 ([4ae2928](https://github.com/ecomfe/reskript/commit/4ae29282c18bdde075949d170eb599fdf6baa8b3))





# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)


### Features

* 在引入less时将不安全的calc自动修复 ([#35](https://github.com/ecomfe/reskript/issues/35)) ([92359f3](https://github.com/ecomfe/reskript/commit/92359f3545e8265cef6c85632456cc5969a8b139))
* 支持关闭自动生成displayName的功能 ([#34](https://github.com/ecomfe/reskript/issues/34)) ([938f121](https://github.com/ecomfe/reskript/commit/938f12141511eb5b131d8e8d7ee636ff33c6859e))
* 给build.finalize传递rules对象 ([#23](https://github.com/ecomfe/reskript/issues/23)) ([e5f94e1](https://github.com/ecomfe/reskript/commit/e5f94e17bb6e4d24d61ca35550198aede09a443e))





# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)

**Note:** Version bump only for package @reskript/config-webpack





# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)


### Bug Fixes

* **build:** less编译打开math兼容模式 ([721a992](https://github.com/ecomfe/reskript/commit/721a9929de232acffbee80109465622a887534e5))
* **cli:** 标准化程序的退出码 ([#30](https://github.com/ecomfe/reskript/issues/30)) ([86229a6](https://github.com/ecomfe/reskript/commit/86229a6d51cccfc2abbfaff3d6f36390f8ccf1dd))


### chore

* **build:** 更新less到4.x版本 ([48a9c00](https://github.com/ecomfe/reskript/commit/48a9c00345f09cbefdb51dd6474f3ab2925c6760))


### BREAKING CHANGES

* **build:** 具体变更参考[less 4.x的说明](https://github.com/less/less.js/releases/tag/v4.0.0)





# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)

**Note:** Version bump only for package @reskript/config-webpack





# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

**Note:** Version bump only for package @reskript/config-webpack





# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)


### Features

* **build:** 增加--entries-only参数指定构建的入口 ([#27](https://github.com/ecomfe/reskript/issues/27)) ([7496abc](https://github.com/ecomfe/reskript/commit/7496abc88fdb663bc559c7cfae12177cc14317d3))
* 支持husky 5.x ([#26](https://github.com/ecomfe/reskript/issues/26)) ([6dd40f2](https://github.com/ecomfe/reskript/commit/6dd40f27aad406d61d4fa8eb517fc9d6e30edfbf))





# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)


### Bug Fixes

* finalize部分属性强制有值 ([#21](https://github.com/ecomfe/reskript/issues/21)) ([bba9837](https://github.com/ecomfe/reskript/commit/bba9837691f36286979d5163cabd8496b59fcfec))


### Features

* 增加publicPath配置 ([#20](https://github.com/ecomfe/reskript/issues/20)) ([6c292a7](https://github.com/ecomfe/reskript/commit/6c292a78163c6d3e9fdf1fa6147e177d495aa35b))





# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)

**Note:** Version bump only for package @reskript/config-webpack





# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)

**Note:** Version bump only for package @reskript/config-webpack





# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)

**Note:** Version bump only for package @reskript/config-webpack





# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)

**Note:** Version bump only for package @reskript/config-webpack





# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)

**Note:** Version bump only for package @reskript/config-webpack





# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)

**Note:** Version bump only for package @reskript/config-webpack





# [1.0.0-beta.27](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2021-01-28)

**Note:** Version bump only for package @reskript/config-webpack





# 1.0.0-beta.26 (2021-01-27)


### Bug Fixes

* 使用contenthash代替已经过时的hash ([39959a0](https://github.com/ecomfe/reskript/commit/39959a0f2f8c38cb08086ab0cdda5e7404bd89e2))
* 修复UT在GitHub Actions上不能跑的问题 ([a05c1fd](https://github.com/ecomfe/reskript/commit/a05c1fd72d095d2776372e4097055d5f74492657))


### Features

* 修改配置文件名 ([22555e4](https://github.com/ecomfe/reskript/commit/22555e4cc14467543669e5f8b85d5bb7b627f9e7))
* 增加对finalize的返回值的校验 ([#10](https://github.com/ecomfe/reskript/issues/10)) ([a81a043](https://github.com/ecomfe/reskript/commit/a81a0436aa62f36483bfe930915cc33943ddc931))


### BREAKING CHANGES

* 配置文件名从`settings.js`改为了`reskript.config.js`
