# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.2](https://github.com/ecomfe/reskript/compare/v6.0.1...v6.0.2) (2023-09-15)

**Note:** Version bump only for package @reskript/build-utils





## [6.0.1](https://github.com/ecomfe/reskript/compare/v6.0.0...v6.0.1) (2023-08-17)

**Note:** Version bump only for package @reskript/build-utils





# [6.0.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0) (2023-07-03)


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

**Note:** Version bump only for package @reskript/build-utils





# [6.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.2...v6.0.0-beta.3) (2023-03-24)


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

**Note:** Version bump only for package @reskript/build-utils





# [6.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.0...v6.0.0-beta.1) (2023-01-17)

**Note:** Version bump only for package @reskript/build-utils





# [6.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0-beta.0) (2023-01-17)

**Note:** Version bump only for package @reskript/build-utils





## [5.7.4](https://github.com/ecomfe/reskript/compare/v5.7.3...v5.7.4) (2023-01-10)

**Note:** Version bump only for package @reskript/build-utils

## [5.7.3](https://github.com/ecomfe/reskript/compare/v5.7.2...v5.7.3) (2022-11-30)

**Note:** Version bump only for package @reskript/build-utils

## [5.7.2](https://github.com/ecomfe/reskript/compare/v5.7.1...v5.7.2) (2022-10-12)

**Note:** Version bump only for package @reskript/build-utils

## [5.7.1](https://github.com/ecomfe/reskript/compare/v5.7.0...v5.7.1) (2022-10-10)

**Note:** Version bump only for package @reskript/build-utils

# [5.7.0](https://github.com/ecomfe/reskript/compare/v5.7.0-beta.0...v5.7.0) (2022-10-10)

**Note:** Version bump only for package @reskript/build-utils

# [5.7.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.6.1...v5.7.0-beta.0) (2022-10-05)

**Note:** Version bump only for package @reskript/build-utils

## [5.6.1](https://github.com/ecomfe/reskript/compare/v5.6.0...v5.6.1) (2022-10-04)

### Bug Fixes

- **build:** 修复处理 less 的 calc 表达式时有空格的情况 ([#309](https://github.com/ecomfe/reskript/issues/309)) ([05ced9e](https://github.com/ecomfe/reskript/commit/05ced9e1ec08fbd44b7bb06d1cd5536919161b31))

# [5.6.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.6.0) (2022-08-09)

### Features

- **dev:** proxyRewrite 配置支持直接指定协议 ([#306](https://github.com/ecomfe/reskript/issues/306)) ([aae8cb9](https://github.com/ecomfe/reskript/commit/aae8cb97400b2dd3f9ca45d16df0278d0de3008b))

# [5.5.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.5.0) (2022-08-09)

### Features

- **dev:** proxyRewrite 配置支持直接指定协议 ([#306](https://github.com/ecomfe/reskript/issues/306)) ([aae8cb9](https://github.com/ecomfe/reskript/commit/aae8cb97400b2dd3f9ca45d16df0278d0de3008b))

# [5.4.0](https://github.com/ecomfe/reskript/compare/v5.3.0...v5.4.0) (2022-07-01)

**Note:** Version bump only for package @reskript/build-utils

# [5.3.0](https://github.com/ecomfe/reskript/compare/v5.2.1...v5.3.0) (2022-05-11)

### Bug Fixes

- **dev:** proxy 配置兼容 Vite ([#290](https://github.com/ecomfe/reskript/issues/290)) ([0a0be8d](https://github.com/ecomfe/reskript/commit/0a0be8d3dcb34e185001a4a1d7055ac2be97a53f))

## [5.2.1](https://github.com/ecomfe/reskript/compare/v5.2.0...v5.2.1) (2022-03-29)

**Note:** Version bump only for package @reskript/build-utils

# [5.2.0](https://github.com/ecomfe/reskript/compare/v5.1.0...v5.2.0) (2022-03-14)

### Bug Fixes

- **build:** 修复\*.var.less 未自动注入的问题 ([#279](https://github.com/ecomfe/reskript/issues/279)) ([65db818](https://github.com/ecomfe/reskript/commit/65db818545b8366450612a48abbf14201f9ea6c2))

# [5.1.0](https://github.com/ecomfe/reskript/compare/v5.0.0...v5.1.0) (2022-03-11)

**Note:** Version bump only for package @reskript/build-utils

# [5.0.0](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.1...v5.0.0) (2022-03-10)

**Note:** Version bump only for package @reskript/build-utils

# [5.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2022-03-10)

**Note:** Version bump only for package @reskript/build-utils

# [5.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v4.3.0...v5.0.0-beta.0) (2022-03-03)

### Features

- **build:** 在 Vite 引擎中支持 publicPath ([#200](https://github.com/ecomfe/reskript/issues/200)) ([c4da054](https://github.com/ecomfe/reskript/commit/c4da054ed4e2a3c704c2d54dc3777801b343167e))
- **build:** 支持 Vite 的 finalize 配置 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([33ab5b6](https://github.com/ecomfe/reskript/commit/33ab5b65fa91b4843e1c5a5b488054796ed8d830))
- **build:** 支持 Vite 的 service worker 生成 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([47600c0](https://github.com/ecomfe/reskript/commit/47600c0cb20276bf72e4d81be7071929816c6d1f))
- **build:** 支持双引擎的 HTML 修改功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([41d9521](https://github.com/ecomfe/reskript/commit/41d9521225ff4b5bcb43614d82f9eec87bcd638d))
- **config-vite:** 实现 SVG 转 React 组件的插件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([056c06a](https://github.com/ecomfe/reskript/commit/056c06aaf799ad76ca2271c990411d18786ad3b4))
- **dev:** 在 Vite 引擎中支持 customizeMiddleware ([#200](https://github.com/ecomfe/reskript/issues/200)) ([f023a42](https://github.com/ecomfe/reskript/commit/f023a42b47bc41bcd6e0af7c3b3c2df2dcec5e2f))
- **dev:** 实现 Vite 的 dev 基础功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([2e46749](https://github.com/ecomfe/reskript/commit/2e46749180f47810abf9171d74d0b85820d98d55))
- **play:** 支持 Vite 引擎的 play 功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([bb7e629](https://github.com/ecomfe/reskript/commit/bb7e62936582c62098e3bea31ee93f286eaa81a6))
- **settings:** 增加一个 customizeMiddlewares 优化配置中间件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([2e458c8](https://github.com/ecomfe/reskript/commit/2e458c8db75d50df9383a7dfc56e9e841461e983))
- 使用 query 引入 worker ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ed5efd4](https://github.com/ecomfe/reskript/commit/ed5efd46a67672b14919b84fa4ea9805afd326c2))
- 实现 Vite 样式相关的配置 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ee7bab0](https://github.com/ecomfe/reskript/commit/ee7bab0c127d153ebc158e41f6be6921e108c619))

### BREAKING CHANGES

- **build:** `@reskript/webpack-plugin-extra-script`已经废弃，使用`@reskript/plugin-inject-html`替代
- **dev:** `@reskript/config-webpack`和`build.finalize`中的`styleResources`相关的功能已经移除，由内置的 less 插件实现
- **dev:** `$features`改名为`skr.features`，`$build`改名为`skr.build`
- **dev:** 自定义 HTML 模板中，只能使用`templateData.*`获取模板数据
- **dev:** 原入口配置中的`export const html`中，用于模板数据的部分，更新为`export const templateData`
- 要将文件引入为 worker，需要使用`xxx?worker`的形式
