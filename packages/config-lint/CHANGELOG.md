# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0-beta.0) (2023-01-17)

**Note:** Version bump only for package @reskript/config-lint





## [5.7.4](https://github.com/ecomfe/reskript/compare/v5.7.3...v5.7.4) (2023-01-10)

**Note:** Version bump only for package @reskript/config-lint

## [5.7.3](https://github.com/ecomfe/reskript/compare/v5.7.2...v5.7.3) (2022-11-30)

**Note:** Version bump only for package @reskript/config-lint

## [5.7.2](https://github.com/ecomfe/reskript/compare/v5.7.1...v5.7.2) (2022-10-12)

**Note:** Version bump only for package @reskript/config-lint

## [5.7.1](https://github.com/ecomfe/reskript/compare/v5.7.0...v5.7.1) (2022-10-10)

**Note:** Version bump only for package @reskript/config-lint

# [5.7.0](https://github.com/ecomfe/reskript/compare/v5.7.0-beta.0...v5.7.0) (2022-10-10)

**Note:** Version bump only for package @reskript/config-lint

# [5.7.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.6.1...v5.7.0-beta.0) (2022-10-05)

**Note:** Version bump only for package @reskript/config-lint

## [5.6.1](https://github.com/ecomfe/reskript/compare/v5.6.0...v5.6.1) (2022-10-04)

**Note:** Version bump only for package @reskript/config-lint

# [5.6.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.6.0) (2022-08-09)

**Note:** Version bump only for package @reskript/config-lint

# [5.5.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.5.0) (2022-08-09)

**Note:** Version bump only for package @reskript/config-lint

# [5.4.0](https://github.com/ecomfe/reskript/compare/v5.3.0...v5.4.0) (2022-07-01)

**Note:** Version bump only for package @reskript/config-lint

# [5.3.0](https://github.com/ecomfe/reskript/compare/v5.2.1...v5.3.0) (2022-05-11)

**Note:** Version bump only for package @reskript/config-lint

## [5.2.1](https://github.com/ecomfe/reskript/compare/v5.2.0...v5.2.1) (2022-03-29)

**Note:** Version bump only for package @reskript/config-lint

# [5.2.0](https://github.com/ecomfe/reskript/compare/v5.1.0...v5.2.0) (2022-03-14)

**Note:** Version bump only for package @reskript/config-lint

# [5.1.0](https://github.com/ecomfe/reskript/compare/v5.0.0...v5.1.0) (2022-03-11)

**Note:** Version bump only for package @reskript/config-lint

# [5.0.0](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.1...v5.0.0) (2022-03-10)

**Note:** Version bump only for package @reskript/config-lint

# [5.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2022-03-10)

**Note:** Version bump only for package @reskript/config-lint

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

**Note:** Version bump only for package @reskript/config-lint

## [4.2.1](https://github.com/ecomfe/reskript/compare/v4.2.0...v4.2.1) (2022-02-25)

**Note:** Version bump only for package @reskript/config-lint

# [4.2.0](https://github.com/ecomfe/reskript/compare/v4.1.2...v4.2.0) (2022-02-25)

**Note:** Version bump only for package @reskript/config-lint

## [4.1.2](https://github.com/ecomfe/reskript/compare/v4.1.1...v4.1.2) (2022-02-10)

**Note:** Version bump only for package @reskript/config-lint

## [4.1.1](https://github.com/ecomfe/reskript/compare/v4.1.0...v4.1.1) (2022-02-08)

**Note:** Version bump only for package @reskript/config-lint

# [4.1.0](https://github.com/ecomfe/reskript/compare/v4.0.1...v4.1.0) (2022-02-07)

### Features

- **lint:** 添加 useless-memoized-hooks 检查规则 ([#192](https://github.com/ecomfe/reskript/issues/192)) ([28d2eb4](https://github.com/ecomfe/reskript/commit/28d2eb4b2325e753eeb5a9e1dba0a65debe20b11))

## [4.0.1](https://github.com/ecomfe/reskript/compare/v4.0.0...v4.0.1) (2022-02-07)

**Note:** Version bump only for package @reskript/config-lint

# [4.0.0](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.2...v4.0.0) (2022-02-03)

**Note:** Version bump only for package @reskript/config-lint

# [4.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-02-02)

**Note:** Version bump only for package @reskript/config-lint

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

**Note:** Version bump only for package @reskript/config-lint

## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)

**Note:** Version bump only for package @reskript/config-lint

## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

**Note:** Version bump only for package @reskript/config-lint

## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)

**Note:** Version bump only for package @reskript/config-lint

## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

**Note:** Version bump only for package @reskript/config-lint

## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)

**Note:** Version bump only for package @reskript/config-lint

# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package @reskript/config-lint

# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)

**Note:** Version bump only for package @reskript/config-lint

# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)

### Bug Fixes

- **lint:** 移除 Sentry 全局变量 ([b30dcb0](https://github.com/ecomfe/reskript/commit/b30dcb082e16de49aff513e5965df1014e161dd0))

### Features

- 支持 eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))
- 支持 stylelint 14 ([#186](https://github.com/ecomfe/reskript/issues/186)) ([05e24c0](https://github.com/ecomfe/reskript/commit/05e24c0e8f004e7c342c138e00d1b73724545aa3))

### BREAKING CHANGES

- **lint:** `lint`不再默认配置`Sentry`全局变量，需要用户自行配置
- 需要`eslint`升级至`8.x`
- 需要`stylelint`升级至`14.x`

## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)

**Note:** Version bump only for package @reskript/config-lint

## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

**Note:** Version bump only for package @reskript/config-lint

## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)

### Bug Fixes

- **build:** 支持项目使用纯 ESM 格式，配置文件使用 cjs ([#218](https://github.com/ecomfe/reskript/issues/218)) ([2646bac](https://github.com/ecomfe/reskript/commit/2646bac2f50e1ff52a0a7a4b088a7b282d6cf614))

# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)

### Bug Fixes

- **build:** 在 build 时也同样读用户自定义的 lint 配置 ([#211](https://github.com/ecomfe/reskript/issues/211)) ([e580bce](https://github.com/ecomfe/reskript/commit/e580bce69a0d1a7f2714409d9611a50688020291))

# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)

**Note:** Version bump only for package @reskript/config-lint

# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)

### Bug Fixes

- **deps:** 解决各种 peer 依赖的问题 ([#190](https://github.com/ecomfe/reskript/issues/190)) ([6821454](https://github.com/ecomfe/reskript/commit/6821454217d9888c02b6f7b65f9d5e9666688244))

### Features

- **lint:** 添加 spell-check 检查规则 ([#181](https://github.com/ecomfe/reskript/issues/181)) ([efb3458](https://github.com/ecomfe/reskript/commit/efb345823afa46dcab1c6054567bb26db464e1b2))

## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/config-lint

## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/config-lint

# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)

**Note:** Version bump only for package @reskript/config-lint

# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)

**Note:** Version bump only for package @reskript/config-lint

# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

**Note:** Version bump only for package @reskript/config-lint

# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)

**Note:** Version bump only for package @reskript/config-lint

# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)

**Note:** Version bump only for package @reskript/config-lint

# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

**Note:** Version bump only for package @reskript/config-lint

# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)

**Note:** Version bump only for package @reskript/config-lint

# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)

**Note:** Version bump only for package @reskript/config-lint

## [1.15.2](https://github.com/ecomfe/reskript/compare/v1.15.1...v1.15.2) (2021-08-24)

**Note:** Version bump only for package @reskript/config-lint

## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

**Note:** Version bump only for package @reskript/config-lint

# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)

**Note:** Version bump only for package @reskript/config-lint

## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)

**Note:** Version bump only for package @reskript/config-lint

## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

**Note:** Version bump only for package @reskript/config-lint

# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)

**Note:** Version bump only for package @reskript/config-lint

## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)

**Note:** Version bump only for package @reskript/config-lint

# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)

**Note:** Version bump only for package @reskript/config-lint

## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

**Note:** Version bump only for package @reskript/config-lint

## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

**Note:** Version bump only for package @reskript/config-lint

# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)

**Note:** Version bump only for package @reskript/config-lint

## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)

**Note:** Version bump only for package @reskript/config-lint

## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)

**Note:** Version bump only for package @reskript/config-lint

# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)

**Note:** Version bump only for package @reskript/config-lint

## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)

**Note:** Version bump only for package @reskript/config-lint

## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)

**Note:** Version bump only for package @reskript/config-lint

## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

**Note:** Version bump only for package @reskript/config-lint

# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)

**Note:** Version bump only for package @reskript/config-lint

# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)

**Note:** Version bump only for package @reskript/config-lint

# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)

**Note:** Version bump only for package @reskript/config-lint

## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

**Note:** Version bump only for package @reskript/config-lint

# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)

**Note:** Version bump only for package @reskript/config-lint

## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

### Bug Fixes

- **lint:** config-lint 的 exports 有错误，会无法引用到基础配置 ([86d9c91](https://github.com/ecomfe/reskript/commit/86d9c91d62c76a2800f9163fc5bd6c8d7ab6e2de))

## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)

### Bug Fixes

- **lint:** config-lint 需要导出 stylelint 配置 ([#69](https://github.com/ecomfe/reskript/issues/69)) ([8e3ed95](https://github.com/ecomfe/reskript/commit/8e3ed954fdf0d1a154a8bf065f5fd6028075ff1a))

# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)

**Note:** Version bump only for package @reskript/config-lint

# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)

### Bug Fixes

- **build:** 更新 class-names-loader 兼容旧版本浏览器 ([#51](https://github.com/ecomfe/reskript/issues/51)) ([abf649a](https://github.com/ecomfe/reskript/commit/abf649a0aaed2ed100bbe12aeb3e2f478b5a6b05))
- **lint:** hooks-deps-new-line 规则只适用于第一个参数是函数的情况 ([#55](https://github.com/ecomfe/reskript/issues/55)) ([80377eb](https://github.com/ecomfe/reskript/commit/80377eb36f044e829701cc3034e55a6d2c92684a))

# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)

**Note:** Version bump only for package @reskript/config-lint

## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)

**Note:** Version bump only for package @reskript/config-lint

# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)

**Note:** Version bump only for package @reskript/config-lint

## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)

**Note:** Version bump only for package @reskript/config-lint

# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)

**Note:** Version bump only for package @reskript/config-lint

# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)

### Bug Fixes

- **lint:** 删除团队内部的专有规则 ([d94eb0d](https://github.com/ecomfe/reskript/commit/d94eb0d7941191e41a300fc4a0c9c4d1408ce799))

# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)

### Bug Fixes

- **config-lint:** eslint react 插件指定 17.0 作为版本 ([867bde7](https://github.com/ecomfe/reskript/commit/867bde7737ec3f726e42cc4eecd1f11ae7e99262))

# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)

**Note:** Version bump only for package @reskript/config-lint

# [1.0.0-beta.27](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2021-01-28)

**Note:** Version bump only for package @reskript/config-lint

# 1.0.0-beta.26 (2021-01-27)

**Note:** Version bump only for package @reskript/config-lint
