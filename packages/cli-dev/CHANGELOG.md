# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.2](https://github.com/ecomfe/reskript/compare/v6.0.1...v6.0.2) (2023-09-15)


### Bug Fixes

* **dev:** 修复webpack下--host参数失效问题 ([6ddeaed](https://github.com/ecomfe/reskript/commit/6ddeaed04bf7fb1a3c8023d94eed5b641fdcee0b))





## [6.0.1](https://github.com/ecomfe/reskript/compare/v6.0.0...v6.0.1) (2023-08-17)

**Note:** Version bump only for package @reskript/cli-dev





# [6.0.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0) (2023-07-03)


### Bug Fixes

* **dev:** 让dev时的publicPath逻辑与build相同 ([ff28747](https://github.com/ecomfe/reskript/commit/ff28747b57890c8141856c13ca3648ac5d37deb2))


### Code Refactoring

* **lint:** 升级stylelint至15.x版本 ([0e9b700](https://github.com/ecomfe/reskript/commit/0e9b700f33b8acc5cc9d5969fec4d35730879bcd))


### Features

* **test:** 升级Jest至29.x版本 ([#317](https://github.com/ecomfe/reskript/issues/317)) ([92b1e8b](https://github.com/ecomfe/reskript/commit/92b1e8bc4c4aa40862b51b1477a835218e59b11b))
* 支持Vite 4.x版本 ([2d6cbcf](https://github.com/ecomfe/reskript/commit/2d6cbcf766772e0075a286bb2a3f7709cdfebc04))


### Performance Improvements

* **build:** 移除resolve-typescript-plugin插件 ([f02ce7a](https://github.com/ecomfe/reskript/commit/f02ce7af56ba73d9c50b3e447ef00a31a590d13e))


### BREAKING CHANGES

* **lint:** 部分stylelint规则废弃，需增加`stylistic/`前缀
* **test:** `jest`版本升级为`29.x`，snapshot测试等结果可能发生变化
* **test:** 移除了对`enzyme`的使用，请使用`@testing-library/react`进行组件测试
* **test:** NodeJS版本要求`16.10`及以上
* **build:** 需要使用Webpack `5.74.0`以上版本
* 需要更新Vite至4.x版本配合使用





# [6.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.3...v6.0.0-beta.4) (2023-05-28)

**Note:** Version bump only for package @reskript/cli-dev





# [6.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.2...v6.0.0-beta.3) (2023-03-24)


### Features

* **test:** 升级Jest至29.x版本 ([601df55](https://github.com/ecomfe/reskript/commit/601df55c4f7ff063ab473ac53c4e7a943b178f40))
* 支持Vite 4.x版本 ([e772828](https://github.com/ecomfe/reskript/commit/e772828ea7b5bb569c200cb5a7977e332df4755b))


### Performance Improvements

* **build:** 移除resolve-typescript-plugin插件 ([c1956f6](https://github.com/ecomfe/reskript/commit/c1956f6cdd645d525175b41aa16a03641bd084d0))


### BREAKING CHANGES

* **test:** `jest`版本升级为`29.x`，snapshot测试等结果可能发生变化
* **test:** 移除了对`enzyme`的使用，请使用`@testing-library/react`进行组件测试
* **test:** NodeJS版本要求`16.10`及以上
* **build:** 需要使用Webpack `5.74.0`以上版本
* 需要更新Vite至4.x版本配合使用





# [6.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.1...v6.0.0-beta.2) (2023-01-18)

**Note:** Version bump only for package @reskript/cli-dev





# [6.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.0...v6.0.0-beta.1) (2023-01-17)


### Bug Fixes

* **dev:** 让dev时的publicPath逻辑与build相同 ([625576a](https://github.com/ecomfe/reskript/commit/625576a4ddf1dad7eecfb0015a830bbcc6e71ed8))





# [6.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0-beta.0) (2023-01-17)

**Note:** Version bump only for package @reskript/cli-dev





## [5.7.4](https://github.com/ecomfe/reskript/compare/v5.7.3...v5.7.4) (2023-01-10)

**Note:** Version bump only for package @reskript/cli-dev

## [5.7.3](https://github.com/ecomfe/reskript/compare/v5.7.2...v5.7.3) (2022-11-30)

**Note:** Version bump only for package @reskript/cli-dev

## [5.7.2](https://github.com/ecomfe/reskript/compare/v5.7.1...v5.7.2) (2022-10-12)

**Note:** Version bump only for package @reskript/cli-dev

## [5.7.1](https://github.com/ecomfe/reskript/compare/v5.7.0...v5.7.1) (2022-10-10)

**Note:** Version bump only for package @reskript/cli-dev

# [5.7.0](https://github.com/ecomfe/reskript/compare/v5.7.0-beta.0...v5.7.0) (2022-10-10)

**Note:** Version bump only for package @reskript/cli-dev

# [5.7.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.6.1...v5.7.0-beta.0) (2022-10-05)

**Note:** Version bump only for package @reskript/cli-dev

## [5.6.1](https://github.com/ecomfe/reskript/compare/v5.6.0...v5.6.1) (2022-10-04)

**Note:** Version bump only for package @reskript/cli-dev

# [5.6.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.6.0) (2022-08-09)

**Note:** Version bump only for package @reskript/cli-dev

# [5.5.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.5.0) (2022-08-09)

**Note:** Version bump only for package @reskript/cli-dev

# [5.4.0](https://github.com/ecomfe/reskript/compare/v5.3.0...v5.4.0) (2022-07-01)

### Bug Fixes

- **dev:** 启用 HTTPS 且有--host 参数时，publicPath 设置错误 ([#297](https://github.com/ecomfe/reskript/issues/297)) ([ed58638](https://github.com/ecomfe/reskript/commit/ed58638a5ec14387d53f96c6f3a9e42da2129bad))

# [5.3.0](https://github.com/ecomfe/reskript/compare/v5.2.1...v5.3.0) (2022-05-11)

**Note:** Version bump only for package @reskript/cli-dev

## [5.2.1](https://github.com/ecomfe/reskript/compare/v5.2.0...v5.2.1) (2022-03-29)

**Note:** Version bump only for package @reskript/cli-dev

# [5.2.0](https://github.com/ecomfe/reskript/compare/v5.1.0...v5.2.0) (2022-03-14)

**Note:** Version bump only for package @reskript/cli-dev

# [5.1.0](https://github.com/ecomfe/reskript/compare/v5.0.0...v5.1.0) (2022-03-11)

**Note:** Version bump only for package @reskript/cli-dev

# [5.0.0](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.1...v5.0.0) (2022-03-10)

**Note:** Version bump only for package @reskript/cli-dev

# [5.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2022-03-10)

**Note:** Version bump only for package @reskript/cli-dev

# [5.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v4.3.0...v5.0.0-beta.0) (2022-03-03)

### Features

- **build:** 在 Vite 引擎中支持 publicPath ([#200](https://github.com/ecomfe/reskript/issues/200)) ([c4da054](https://github.com/ecomfe/reskript/commit/c4da054ed4e2a3c704c2d54dc3777801b343167e))
- **dev:** 实现 Vite 的 dev 基础功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([2e46749](https://github.com/ecomfe/reskript/commit/2e46749180f47810abf9171d74d0b85820d98d55))
- **play:** 支持 Vite 引擎的 play 功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([bb7e629](https://github.com/ecomfe/reskript/commit/bb7e62936582c62098e3bea31ee93f286eaa81a6))
- **portal:** 实现 portal 模块 ([#266](https://github.com/ecomfe/reskript/issues/266)) ([2e765dc](https://github.com/ecomfe/reskript/commit/2e765dc84f7d9224b317c73bb5ceb9576a28b779))

### BREAKING CHANGES

- **dev:** `@reskript/config-webpack`和`build.finalize`中的`styleResources`相关的功能已经移除，由内置的 less 插件实现
- **dev:** `$features`改名为`skr.features`，`$build`改名为`skr.build`
- **dev:** 自定义 HTML 模板中，只能使用`templateData.*`获取模板数据
- **dev:** 原入口配置中的`export const html`中，用于模板数据的部分，更新为`export const templateData`

# [4.3.0](https://github.com/ecomfe/reskript/compare/v4.2.1...v4.3.0) (2022-03-03)

**Note:** Version bump only for package @reskript/cli-dev

## [4.2.1](https://github.com/ecomfe/reskript/compare/v4.2.0...v4.2.1) (2022-02-25)

**Note:** Version bump only for package @reskript/cli-dev

# [4.2.0](https://github.com/ecomfe/reskript/compare/v4.1.2...v4.2.0) (2022-02-25)

**Note:** Version bump only for package @reskript/cli-dev

## [4.1.2](https://github.com/ecomfe/reskript/compare/v4.1.1...v4.1.2) (2022-02-10)

**Note:** Version bump only for package @reskript/cli-dev

## [4.1.1](https://github.com/ecomfe/reskript/compare/v4.1.0...v4.1.1) (2022-02-08)

**Note:** Version bump only for package @reskript/cli-dev

# [4.1.0](https://github.com/ecomfe/reskript/compare/v4.0.1...v4.1.0) (2022-02-07)

**Note:** Version bump only for package @reskript/cli-dev

## [4.0.1](https://github.com/ecomfe/reskript/compare/v4.0.0...v4.0.1) (2022-02-07)

### Bug Fixes

- **settings:** 调用插件时增加当前命令行的输入参数 ([#247](https://github.com/ecomfe/reskript/issues/247)) ([ca05e41](https://github.com/ecomfe/reskript/commit/ca05e419cb079f2f44a088957dea828134543c99))

# [4.0.0](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.2...v4.0.0) (2022-02-03)

**Note:** Version bump only for package @reskript/cli-dev

# [4.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-02-02)

**Note:** Version bump only for package @reskript/cli-dev

# [4.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2022-02-01)

### Features

- **build:** 支持各个 loader 的 ESM 化 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([d7451e5](https://github.com/ecomfe/reskript/commit/d7451e5fd6c88aed0bcfdd11e807948a824ce2f3))

# [4.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v3.0.6...v4.0.0-beta.0) (2022-01-30)

### Code Refactoring

- 核心部分迁移到纯 ESM 包格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([f9d06b0](https://github.com/ecomfe/reskript/commit/f9d06b0fd802caa002707686d004ca8683f7002f))

### Features

- **build:** 各个插件转为 ESM 格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([1950ace](https://github.com/ecomfe/reskript/commit/1950ace8c05d317b855a7f01b4680e54a011d61f))
- **settings:** 支持且仅支持.mjs 和.ts 类型的项目配置 ([#225](https://github.com/ecomfe/reskript/issues/225)) ([5a9586b](https://github.com/ecomfe/reskript/commit/5a9586b053f16d89a7b87b22dd6a4ca84d96edd2))
- **settings:** 支持自定义配置文件路径 ([#230](https://github.com/ecomfe/reskript/issues/230)) ([2a4ca98](https://github.com/ecomfe/reskript/commit/2a4ca987ae7e193916ed8c7972dbcbff521b4863))

### BREAKING CHANGES

- **settings:** 项目配置必须为`reskript.config.{mjs|ts}`，且格式为 ESM
- **settings:** 应用入口配置必须为`xxx.config.{mjs|ts}`，且格式为 ESM
- 发布的包为纯 ESM 格式，无法通过 CommonJS 的`require`引入。参考[sinderesorhus 的建议](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## [3.0.6](https://github.com/ecomfe/reskript/compare/v3.0.5...v3.0.6) (2022-01-21)

**Note:** Version bump only for package @reskript/cli-dev

## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)

**Note:** Version bump only for package @reskript/cli-dev

## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

**Note:** Version bump only for package @reskript/cli-dev

## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)

**Note:** Version bump only for package @reskript/cli-dev

## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

**Note:** Version bump only for package @reskript/cli-dev

## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)

**Note:** Version bump only for package @reskript/cli-dev

# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package @reskript/cli-dev

# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)

**Note:** Version bump only for package @reskript/cli-dev

# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)

### Features

- **dev:** 废弃 https 配置的 boolean 值 ([#223](https://github.com/ecomfe/reskript/issues/223)) ([ed58ffb](https://github.com/ecomfe/reskript/commit/ed58ffb93ed1621522c4bec98191d5dc308eadea))
- 支持 eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))
- 支持 stylelint 14 ([#186](https://github.com/ecomfe/reskript/issues/186)) ([05e24c0](https://github.com/ecomfe/reskript/commit/05e24c0e8f004e7c342c138e00d1b73724545aa3))

### BREAKING CHANGES

- **dev:** `devServer.https: true`已经废弃，使用`devServer.https: {proxy: true}`代替
- 需要`eslint`升级至`8.x`
- 需要`stylelint`升级至`14.x`

## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)

**Note:** Version bump only for package @reskript/cli-dev

## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

**Note:** Version bump only for package @reskript/cli-dev

## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)

**Note:** Version bump only for package @reskript/cli-dev

# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)

### Features

- **dev:** 支持 HTTPS 协议启动调试服务器 ([#217](https://github.com/ecomfe/reskript/issues/217)) ([4646f77](https://github.com/ecomfe/reskript/commit/4646f77e30dd28f8e3f6b408ef81f325dcf1fd37))

# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)

**Note:** Version bump only for package @reskript/cli-dev

# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)

**Note:** Version bump only for package @reskript/cli-dev

## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/cli-dev

## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/cli-dev

# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)

**Note:** Version bump only for package @reskript/cli-dev

# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)

### Features

- **dev:** 增加--no-open 参数禁用打开浏览器功能 ([#160](https://github.com/ecomfe/reskript/issues/160)) ([525f69a](https://github.com/ecomfe/reskript/commit/525f69ab3408c739a3ff67590ae9867489e169db))

# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

### Features

- **build:** 在严格模式下增加类型检查 ([#147](https://github.com/ecomfe/reskript/issues/147)) ([a2d293f](https://github.com/ecomfe/reskript/commit/a2d293f69a60aaf7e672de66f88014fc13b6748d))

# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)

### Bug Fixes

- **deps:** 几个 CLI 包增加对 core-js 的 peer 依赖 ([#154](https://github.com/ecomfe/reskript/issues/154)) ([fc6f8a1](https://github.com/ecomfe/reskript/commit/fc6f8a172954574a83792cd7d7fce7a3261a3240))

# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)

**Note:** Version bump only for package @reskript/cli-dev

# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

**Note:** Version bump only for package @reskript/cli-dev

# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)

**Note:** Version bump only for package @reskript/cli-dev

# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)

- feat(dev)!: 支持 webpack-dev-server 4 版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
- fix(build)!: 由用户自行安装 core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)
- feat!: 对外暴露的 API 转为异步 (#130) ([f423d55](https://github.com/ecomfe/reskript/commit/f423d55efc890abd54e8958d4005c0285c91252d)), closes [#130](https://github.com/ecomfe/reskript/issues/130)
- feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)

### Features

- **build:** 增加严格模式开关 ([#54](https://github.com/ecomfe/reskript/issues/54)) ([3e00afc](https://github.com/ecomfe/reskript/commit/3e00afc503371412a30260c5a836935b47b7eb60))

### BREAKING CHANGES

- `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
- `devServer.hot`的类型修改为`boolean`
- `config-babel`的`hot`配置类型修改为`boolean`
- 不再处理`core-js`的引入，用户必须在项目中自行安装`core-js@3`
- `settings`、`core`、`config-webpack`和`config-webpack-dev-server`的接口均变为异步函数
- `BuildContext`的`cache`属性由`boolean`变为`persist` | `transient` | `off`
- NodeJS 最低版本要求为 14.14.0
- 配置中的`build.defaultImportOptimization`选项已经移除，用`uses: ['antd', 'lodash']`代替
- `config-babel`中的`defaultImportOptimization`参数，用`uses: ['antd', 'lodash']`代替
- `skr build`的`--src`参数已经移除，用`--src-dir`参数代替
- `skr dev`的`--src`参数已经移除，用`--src-dir`参数代替
- `skr dev`的`--open`参数已经移除，用`--host`参数代替
- `est-compat`的功能已经移除，LESS 的编译不再包含任何内置的 mixin
- 配置中的`play.wrapper`选项已经移除，使用`defaultGlobalSetup`选项代替
- 配置中的`play.injectResources`选项已经移除，使用`defaultGlobalSetup`选项代替
- `svg-mixed-loader`包已废弃，用`xxx.svg?react`的方式导入 SVG 为 React 组件
- `config-webpack/loaders`中的`svg`和`url`已经移除
- `cli-babel`的`--out`参数已经移除，用`--out-dir`参数代替

## [1.15.2](https://github.com/ecomfe/reskript/compare/v1.15.1...v1.15.2) (2021-08-24)

**Note:** Version bump only for package @reskript/cli-dev

## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/cli-dev

# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)

### Features

- **flags:** 支持 SKR_FLAGS 设置遇到废弃配置直接退出 ([#124](https://github.com/ecomfe/reskript/issues/124)) ([7f2658a](https://github.com/ecomfe/reskript/commit/7f2658a890a1f714d1a003aeff44dcd446d447b1))

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

- **build:** 管理和读取各类.env 文件 ([#74](https://github.com/ecomfe/reskript/issues/74)) ([83c9699](https://github.com/ecomfe/reskript/commit/83c96994c4cb5eb98978345f109c03f3901cefd2))

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

- **build:** 增加配置支持使用方选择性引入第三方库的专项优化 ([#79](https://github.com/ecomfe/reskript/issues/79)) ([f8ea13d](https://github.com/ecomfe/reskript/commit/f8ea13d2c16b11dae1a42d78cfa98d097350ef56))

## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

**Note:** Version bump only for package @reskript/cli-dev

# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)

**Note:** Version bump only for package @reskript/cli-dev

## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

**Note:** Version bump only for package @reskript/cli-dev

## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)

### Bug Fixes

- **dev:** 调试时指定的 host 应该同时影响 HMR 的配置 ([#62](https://github.com/ecomfe/reskript/issues/62)) ([20beb9e](https://github.com/ecomfe/reskript/commit/20beb9eacc8cd249278a94163b60deaeffaa8c45))

# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)

### Features

- **build:** 支持--entries-dir 参数指定入口目录 ([#36](https://github.com/ecomfe/reskript/issues/36)) ([dec298d](https://github.com/ecomfe/reskript/commit/dec298d9384849bfd14beaf2ca850b42362cd850))
- **dev:** 在 dev 命令中用--src-dir 参数替换原有--src 参数 ([#65](https://github.com/ecomfe/reskript/issues/65)) ([03b654d](https://github.com/ecomfe/reskript/commit/03b654d3553a6914d75402c1af9f5983773bb962))
- **dev:** 增加--host 参数指定调试服务器默认地址，自动生成完整的 publicPath ([#62](https://github.com/ecomfe/reskript/issues/62)) ([71b7d6d](https://github.com/ecomfe/reskript/commit/71b7d6db0cce7da200b0c9b154b30dde2c529dc7))

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

- **cli:** 标准化程序的退出码 ([#30](https://github.com/ecomfe/reskript/issues/30)) ([86229a6](https://github.com/ecomfe/reskript/commit/86229a6d51cccfc2abbfaff3d6f36390f8ccf1dd))

# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)

### Features

- **dev:** 支持指定入口进行调试 ([#28](https://github.com/ecomfe/reskript/issues/28)) ([284f141](https://github.com/ecomfe/reskript/commit/284f141d6f023336c51dc51f4b804d2970cda2a6))

# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

**Note:** Version bump only for package @reskript/cli-dev

# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)

**Note:** Version bump only for package @reskript/cli-dev

# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)

### Bug Fixes

- **dev:** 当调试服务器启动出错时报告给用户并退出程序 ([#24](https://github.com/ecomfe/reskript/issues/24)) ([9fc7f5d](https://github.com/ecomfe/reskript/commit/9fc7f5dd494e38cae9e55708cacad1d3a2c73290))

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

- 修改配置文件名 ([22555e4](https://github.com/ecomfe/reskript/commit/22555e4cc14467543669e5f8b85d5bb7b627f9e7))
- 增加对 finalize 的返回值的校验 ([#10](https://github.com/ecomfe/reskript/issues/10)) ([a81a043](https://github.com/ecomfe/reskript/commit/a81a0436aa62f36483bfe930915cc33943ddc931))

### BREAKING CHANGES

- 配置文件名从`settings.js`改为了`reskript.config.js`
