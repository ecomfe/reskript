# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.1...v6.0.0-beta.2) (2023-01-18)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html





# [6.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.0...v6.0.0-beta.1) (2023-01-17)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html





# [6.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0-beta.0) (2023-01-17)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html





## [5.7.4](https://github.com/ecomfe/reskript/compare/v5.7.3...v5.7.4) (2023-01-10)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [5.7.3](https://github.com/ecomfe/reskript/compare/v5.7.2...v5.7.3) (2022-11-30)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [5.7.2](https://github.com/ecomfe/reskript/compare/v5.7.1...v5.7.2) (2022-10-12)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [5.7.1](https://github.com/ecomfe/reskript/compare/v5.7.0...v5.7.1) (2022-10-10)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.7.0](https://github.com/ecomfe/reskript/compare/v5.7.0-beta.0...v5.7.0) (2022-10-10)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.7.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.6.1...v5.7.0-beta.0) (2022-10-05)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [5.6.1](https://github.com/ecomfe/reskript/compare/v5.6.0...v5.6.1) (2022-10-04)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.6.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.6.0) (2022-08-09)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.5.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.5.0) (2022-08-09)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.4.0](https://github.com/ecomfe/reskript/compare/v5.3.0...v5.4.0) (2022-07-01)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.3.0](https://github.com/ecomfe/reskript/compare/v5.2.1...v5.3.0) (2022-05-11)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [5.2.1](https://github.com/ecomfe/reskript/compare/v5.2.0...v5.2.1) (2022-03-29)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.2.0](https://github.com/ecomfe/reskript/compare/v5.1.0...v5.2.0) (2022-03-14)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.1.0](https://github.com/ecomfe/reskript/compare/v5.0.0...v5.1.0) (2022-03-11)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.0.0](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.1...v5.0.0) (2022-03-10)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [5.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2022-03-10)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

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

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [4.2.1](https://github.com/ecomfe/reskript/compare/v4.2.0...v4.2.1) (2022-02-25)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [4.2.0](https://github.com/ecomfe/reskript/compare/v4.1.2...v4.2.0) (2022-02-25)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [4.1.2](https://github.com/ecomfe/reskript/compare/v4.1.1...v4.1.2) (2022-02-10)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [4.1.1](https://github.com/ecomfe/reskript/compare/v4.1.0...v4.1.1) (2022-02-08)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [4.1.0](https://github.com/ecomfe/reskript/compare/v4.0.1...v4.1.0) (2022-02-07)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [4.0.1](https://github.com/ecomfe/reskript/compare/v4.0.0...v4.0.1) (2022-02-07)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [4.0.0](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.2...v4.0.0) (2022-02-03)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [4.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-02-02)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

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

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)

### Features

- 支持 eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))

### BREAKING CHANGES

- 需要`eslint`升级至`8.x`

## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [1.15.2](https://github.com/ecomfe/reskript/compare/v1.15.1...v1.15.2) (2021-08-24)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)

**Note:** Version bump only for package @reskript/webpack-plugin-interpolate-html

# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)

### Features

- **build:** 管理和读取各类.env 文件 ([#74](https://github.com/ecomfe/reskript/issues/74)) ([83c9699](https://github.com/ecomfe/reskript/commit/83c96994c4cb5eb98978345f109c03f3901cefd2))
