# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.2](https://github.com/ecomfe/reskript/compare/v6.0.1...v6.0.2) (2023-09-15)

**Note:** Version bump only for package @reskript/config-babel





## [6.0.1](https://github.com/ecomfe/reskript/compare/v6.0.0...v6.0.1) (2023-08-17)

**Note:** Version bump only for package @reskript/config-babel





# [6.0.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0) (2023-07-03)


### Bug Fixes

* **babel:** 修复babel转码时未完全对齐项目引入的core-js版本的问题 ([088f72d](https://github.com/ecomfe/reskript/commit/088f72dccf49f10d3f6d5c2c627188d24166a7ae))


### Code Refactoring

* **lint:** 升级stylelint至15.x版本 ([0e9b700](https://github.com/ecomfe/reskript/commit/0e9b700f33b8acc5cc9d5969fec4d35730879bcd))


### Features

* **build:** 更新支持antd 5.x ([9b35d55](https://github.com/ecomfe/reskript/commit/9b35d55c2d619fec12c602fccf355d706cb108b1))
* **test:** 升级Jest至29.x版本 ([#317](https://github.com/ecomfe/reskript/issues/317)) ([92b1e8b](https://github.com/ecomfe/reskript/commit/92b1e8bc4c4aa40862b51b1477a835218e59b11b))
* 支持Vite 4.x版本 ([2d6cbcf](https://github.com/ecomfe/reskript/commit/2d6cbcf766772e0075a286bb2a3f7709cdfebc04))


### BREAKING CHANGES

* **lint:** 部分stylelint规则废弃，需增加`stylistic/`前缀
* **test:** `jest`版本升级为`29.x`，snapshot测试等结果可能发生变化
* **test:** 移除了对`enzyme`的使用，请使用`@testing-library/react`进行组件测试
* **test:** NodeJS版本要求`16.10`及以上
* **build:** 如需要继续使用`antd 4.x`版本，需手动指定`build.uses`加入`antd@4`值
* **build:** 移除`less-plugin-functions`的支持
* **build:** 移除原有对`.less`文件中的`calc`的特殊处理，如果有对`antd`的变量替换成CSS变量等特殊应用，会出现编译错误
* 需要更新Vite至4.x版本配合使用





# [6.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.3...v6.0.0-beta.4) (2023-05-28)

**Note:** Version bump only for package @reskript/config-babel





# [6.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.2...v6.0.0-beta.3) (2023-03-24)


### Bug Fixes

* **babel:** 修复babel转码时未完全对齐项目引入的core-js版本的问题 ([6aa0cd8](https://github.com/ecomfe/reskript/commit/6aa0cd87e5fdff88584106c442b0ee872bdd7baf))


### Features

* **build:** 更新支持antd 5.x ([f08babf](https://github.com/ecomfe/reskript/commit/f08babf051899dacfd25baec06ce932b1e6893a2))
* **test:** 升级Jest至29.x版本 ([601df55](https://github.com/ecomfe/reskript/commit/601df55c4f7ff063ab473ac53c4e7a943b178f40))
* 支持Vite 4.x版本 ([e772828](https://github.com/ecomfe/reskript/commit/e772828ea7b5bb569c200cb5a7977e332df4755b))


### BREAKING CHANGES

* **test:** `jest`版本升级为`29.x`，snapshot测试等结果可能发生变化
* **test:** 移除了对`enzyme`的使用，请使用`@testing-library/react`进行组件测试
* **test:** NodeJS版本要求`16.10`及以上
* **build:** 如需要继续使用`antd 4.x`版本，需手动指定`build.uses`加入`antd@4`值
* **build:** 移除`less-plugin-functions`的支持
* **build:** 移除原有对`.less`文件中的`calc`的特殊处理，如果有对`antd`的变量替换成CSS变量等特殊应用，会出现编译错误
* 需要更新Vite至4.x版本配合使用





# [6.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.1...v6.0.0-beta.2) (2023-01-18)

**Note:** Version bump only for package @reskript/config-babel





# [6.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.0...v6.0.0-beta.1) (2023-01-17)

**Note:** Version bump only for package @reskript/config-babel





# [6.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0-beta.0) (2023-01-17)

**Note:** Version bump only for package @reskript/config-babel





## [5.7.4](https://github.com/ecomfe/reskript/compare/v5.7.3...v5.7.4) (2023-01-10)

### Bug Fixes

- **babel:** 解决 babel 插件在 ESM 和 CJS 下的结构兼容性问题 ([ee90c47](https://github.com/ecomfe/reskript/commit/ee90c47afd61f4950c65b1675275a7b99352c54d))

## [5.7.3](https://github.com/ecomfe/reskript/compare/v5.7.2...v5.7.3) (2022-11-30)

**Note:** Version bump only for package @reskript/config-babel

## [5.7.2](https://github.com/ecomfe/reskript/compare/v5.7.1...v5.7.2) (2022-10-12)

**Note:** Version bump only for package @reskript/config-babel

## [5.7.1](https://github.com/ecomfe/reskript/compare/v5.7.0...v5.7.1) (2022-10-10)

**Note:** Version bump only for package @reskript/config-babel

# [5.7.0](https://github.com/ecomfe/reskript/compare/v5.7.0-beta.0...v5.7.0) (2022-10-10)

**Note:** Version bump only for package @reskript/config-babel

# [5.7.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.6.1...v5.7.0-beta.0) (2022-10-05)

**Note:** Version bump only for package @reskript/config-babel

## [5.6.1](https://github.com/ecomfe/reskript/compare/v5.6.0...v5.6.1) (2022-10-04)

**Note:** Version bump only for package @reskript/config-babel

# [5.6.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.6.0) (2022-08-09)

**Note:** Version bump only for package @reskript/config-babel

# [5.5.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.5.0) (2022-08-09)

**Note:** Version bump only for package @reskript/config-babel

# [5.4.0](https://github.com/ecomfe/reskript/compare/v5.3.0...v5.4.0) (2022-07-01)

**Note:** Version bump only for package @reskript/config-babel

# [5.3.0](https://github.com/ecomfe/reskript/compare/v5.2.1...v5.3.0) (2022-05-11)

**Note:** Version bump only for package @reskript/config-babel

## [5.2.1](https://github.com/ecomfe/reskript/compare/v5.2.0...v5.2.1) (2022-03-29)

**Note:** Version bump only for package @reskript/config-babel

# [5.2.0](https://github.com/ecomfe/reskript/compare/v5.1.0...v5.2.0) (2022-03-14)

**Note:** Version bump only for package @reskript/config-babel

# [5.1.0](https://github.com/ecomfe/reskript/compare/v5.0.0...v5.1.0) (2022-03-11)

**Note:** Version bump only for package @reskript/config-babel

# [5.0.0](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.1...v5.0.0) (2022-03-10)

**Note:** Version bump only for package @reskript/config-babel

# [5.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2022-03-10)

**Note:** Version bump only for package @reskript/config-babel

# [5.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v4.3.0...v5.0.0-beta.0) (2022-03-03)

### Features

- **build:** 在 Vite 引擎中支持 publicPath ([#200](https://github.com/ecomfe/reskript/issues/200)) ([c4da054](https://github.com/ecomfe/reskript/commit/c4da054ed4e2a3c704c2d54dc3777801b343167e))
- **dev:** 实现 Vite 的 dev 基础功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([2e46749](https://github.com/ecomfe/reskript/commit/2e46749180f47810abf9171d74d0b85820d98d55))
- **play:** 支持 Vite 引擎的 play 功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([bb7e629](https://github.com/ecomfe/reskript/commit/bb7e62936582c62098e3bea31ee93f286eaa81a6))

### BREAKING CHANGES

- **dev:** `@reskript/config-webpack`和`build.finalize`中的`styleResources`相关的功能已经移除，由内置的 less 插件实现
- **dev:** `$features`改名为`skr.features`，`$build`改名为`skr.build`
- **dev:** 自定义 HTML 模板中，只能使用`templateData.*`获取模板数据
- **dev:** 原入口配置中的`export const html`中，用于模板数据的部分，更新为`export const templateData`

# [4.3.0](https://github.com/ecomfe/reskript/compare/v4.2.1...v4.3.0) (2022-03-03)

**Note:** Version bump only for package @reskript/config-babel

## [4.2.1](https://github.com/ecomfe/reskript/compare/v4.2.0...v4.2.1) (2022-02-25)

**Note:** Version bump only for package @reskript/config-babel

# [4.2.0](https://github.com/ecomfe/reskript/compare/v4.1.2...v4.2.0) (2022-02-25)

### Features

- **babel:** 添加 react 代码性能优化转换 ([#261](https://github.com/ecomfe/reskript/issues/261)) ([38252e6](https://github.com/ecomfe/reskript/commit/38252e67fb20a0352a3417ffc3078b0d52ccabe4))

## [4.1.2](https://github.com/ecomfe/reskript/compare/v4.1.1...v4.1.2) (2022-02-10)

**Note:** Version bump only for package @reskript/config-babel

## [4.1.1](https://github.com/ecomfe/reskript/compare/v4.1.0...v4.1.1) (2022-02-08)

**Note:** Version bump only for package @reskript/config-babel

# [4.1.0](https://github.com/ecomfe/reskript/compare/v4.0.1...v4.1.0) (2022-02-07)

**Note:** Version bump only for package @reskript/config-babel

## [4.0.1](https://github.com/ecomfe/reskript/compare/v4.0.0...v4.0.1) (2022-02-07)

**Note:** Version bump only for package @reskript/config-babel

# [4.0.0](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.2...v4.0.0) (2022-02-03)

**Note:** Version bump only for package @reskript/config-babel

# [4.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-02-02)

**Note:** Version bump only for package @reskript/config-babel

# [4.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2022-02-01)

### Features

- **build:** 支持各个 loader 的 ESM 化 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([d7451e5](https://github.com/ecomfe/reskript/commit/d7451e5fd6c88aed0bcfdd11e807948a824ce2f3))

# [4.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v3.0.6...v4.0.0-beta.0) (2022-01-30)

### Code Refactoring

- 核心部分迁移到纯 ESM 包格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([f9d06b0](https://github.com/ecomfe/reskript/commit/f9d06b0fd802caa002707686d004ca8683f7002f))

### Features

- **build:** 各个插件转为 ESM 格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([1950ace](https://github.com/ecomfe/reskript/commit/1950ace8c05d317b855a7f01b4680e54a011d61f))
- **settings:** 支持且仅支持.mjs 和.ts 类型的项目配置 ([#225](https://github.com/ecomfe/reskript/issues/225)) ([5a9586b](https://github.com/ecomfe/reskript/commit/5a9586b053f16d89a7b87b22dd6a4ca84d96edd2))

### BREAKING CHANGES

- **settings:** 项目配置必须为`reskript.config.{mjs|ts}`，且格式为 ESM
- **settings:** 应用入口配置必须为`xxx.config.{mjs|ts}`，且格式为 ESM
- 发布的包为纯 ESM 格式，无法通过 CommonJS 的`require`引入。参考[sinderesorhus 的建议](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## [3.0.6](https://github.com/ecomfe/reskript/compare/v3.0.5...v3.0.6) (2022-01-21)

**Note:** Version bump only for package @reskript/config-babel

## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)

**Note:** Version bump only for package @reskript/config-babel

## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

**Note:** Version bump only for package @reskript/config-babel

## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)

**Note:** Version bump only for package @reskript/config-babel

## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

**Note:** Version bump only for package @reskript/config-babel

## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)

**Note:** Version bump only for package @reskript/config-babel

# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package @reskript/config-babel

# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)

**Note:** Version bump only for package @reskript/config-babel

# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)

### Features

- 支持 eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))

### BREAKING CHANGES

- 需要`eslint`升级至`8.x`

## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)

**Note:** Version bump only for package @reskript/config-babel

## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

**Note:** Version bump only for package @reskript/config-babel

## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)

**Note:** Version bump only for package @reskript/config-babel

# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)

**Note:** Version bump only for package @reskript/config-babel

# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)

### Features

- **dev:** 支持组件源码文件调用编辑器打开 ([#201](https://github.com/ecomfe/reskript/issues/201)) ([bd743a6](https://github.com/ecomfe/reskript/commit/bd743a690990f20bd0f8b0edb5da949b82a92adc))

# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)

### Bug Fixes

- **build:** 修复 emotion 插件在 production 环境下丢失样式的问题 ([#187](https://github.com/ecomfe/reskript/issues/187)) ([1635511](https://github.com/ecomfe/reskript/commit/1635511937df849b8acb7538c58990b52b90c1a8))
- **deps:** 解决各种 peer 依赖的问题 ([#190](https://github.com/ecomfe/reskript/issues/190)) ([6821454](https://github.com/ecomfe/reskript/commit/6821454217d9888c02b6f7b65f9d5e9666688244))

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

- feat(dev)!: 支持 webpack-dev-server 4 版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
- fix(build)!: 由用户自行安装 core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)
- feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)

### BREAKING CHANGES

- `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
- `devServer.hot`的类型修改为`boolean`
- `config-babel`的`hot`配置类型修改为`boolean`
- 不再处理`core-js`的引入，用户必须在项目中自行安装`core-js@3`
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

**Note:** Version bump only for package @reskript/config-babel

## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/config-babel

# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)

### Features

- **flags:** 支持 SKR_FLAGS 设置遇到废弃配置直接退出 ([#124](https://github.com/ecomfe/reskript/issues/124)) ([7f2658a](https://github.com/ecomfe/reskript/commit/7f2658a890a1f714d1a003aeff44dcd446d447b1))

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

- **babel:** 增加对 reflect-metadata 的支持 ([#106](https://github.com/ecomfe/reskript/issues/106)) ([8d0f36b](https://github.com/ecomfe/reskript/commit/8d0f36b7957a0a7efd9ded92b4b6a259ddeb984d))

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

- **babel:** 调整 babel 插件的顺序避免代码转换出错 ([#97](https://github.com/ecomfe/reskript/issues/97)) ([f9d6f97](https://github.com/ecomfe/reskript/commit/f9d6f979da88fe75f0029b519e416b090cb85f73))

## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

**Note:** Version bump only for package @reskript/config-babel

# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)

### Features

- **dev:** 增加一个 babel 插件为 React 组件注入对应源码路径 ([#91](https://github.com/ecomfe/reskript/issues/91)) ([fb0132d](https://github.com/ecomfe/reskript/commit/fb0132d31dc83128b8373da7b38ca0c3d32b4a9c))

# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)

**Note:** Version bump only for package @reskript/config-babel

# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)

### Features

- **build:** 增加配置支持使用方选择性引入第三方库的专项优化 ([#79](https://github.com/ecomfe/reskript/issues/79)) ([f8ea13d](https://github.com/ecomfe/reskript/commit/f8ea13d2c16b11dae1a42d78cfa98d097350ef56))
- **build:** 支持 emotion 管理样式 ([#78](https://github.com/ecomfe/reskript/issues/78)) ([e13e9a5](https://github.com/ecomfe/reskript/commit/e13e9a5a4c323c8690be674523041d4a607df9f8))

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

- **build:** 更新 class-names-loader 兼容旧版本浏览器 ([#51](https://github.com/ecomfe/reskript/issues/51)) ([abf649a](https://github.com/ecomfe/reskript/commit/abf649a0aaed2ed100bbe12aeb3e2f478b5a6b05))

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

- 支持关闭自动生成 displayName 的功能 ([#34](https://github.com/ecomfe/reskript/issues/34)) ([938f121](https://github.com/ecomfe/reskript/commit/938f12141511eb5b131d8e8d7ee636ff33c6859e))

# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)

**Note:** Version bump only for package @reskript/config-babel

# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)

### chore

- **build:** 更新 less 到 4.x 版本 ([48a9c00](https://github.com/ecomfe/reskript/commit/48a9c00345f09cbefdb51dd6474f3ab2925c6760))

### BREAKING CHANGES

- **build:** 具体变更参考[less 4.x 的说明](https://github.com/less/less.js/releases/tag/v4.0.0)

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

- **babel:** 仅用来转义的 babel 配置不应该替换 core-js ([e94c38c](https://github.com/ecomfe/reskript/commit/e94c38c19f31ab120d61bb5bca7e9f5237b62fb8))

# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)

**Note:** Version bump only for package @reskript/config-babel

# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)

**Note:** Version bump only for package @reskript/config-babel

# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)

### Bug Fixes

- **babel:** skr babel 不应该替换 core-js 的引用 ([0c24ccd](https://github.com/ecomfe/reskript/commit/0c24ccd404c806e6d49ea8b19338e32d59e1aba8))

# [1.0.0-beta.27](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2021-01-28)

**Note:** Version bump only for package @reskript/config-babel

# 1.0.0-beta.26 (2021-01-27)

**Note:** Version bump only for package @reskript/config-babel
