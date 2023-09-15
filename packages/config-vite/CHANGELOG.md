# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.2](https://github.com/ecomfe/reskript/compare/v6.0.1...v6.0.2) (2023-09-15)


### Bug Fixes

* **dev:** 禁用Vite下自动递增端口的功能 ([2f58560](https://github.com/ecomfe/reskript/commit/2f58560f1afe1ae305662dee720e913bd7662217))





## [6.0.1](https://github.com/ecomfe/reskript/compare/v6.0.0...v6.0.1) (2023-08-17)


### Bug Fixes

* **dev:** 在Vite引擎支持public资源访问 ([cb4ae20](https://github.com/ecomfe/reskript/commit/cb4ae20f5b83cf486f05b5a121c9d9f79c5eb519))





# [6.0.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0) (2023-07-03)


### Bug Fixes

* **babel:** 修复babel转码时未完全对齐项目引入的core-js版本的问题 ([088f72d](https://github.com/ecomfe/reskript/commit/088f72dccf49f10d3f6d5c2c627188d24166a7ae))
* **build:** 修复Vite下core-js路径处理错误的问题 ([#327](https://github.com/ecomfe/reskript/issues/327)) ([7d36aad](https://github.com/ecomfe/reskript/commit/7d36aad143da9b4b6fd828af2c62b19270f6bbbb))


### Code Refactoring

* **lint:** 升级stylelint至15.x版本 ([0e9b700](https://github.com/ecomfe/reskript/commit/0e9b700f33b8acc5cc9d5969fec4d35730879bcd))


### Features

* **build:** 为Vite引擎增加legacy配置 ([51fe424](https://github.com/ecomfe/reskript/commit/51fe42421e9d763e6f6825cb31a8a4763e8b589e))
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

**Note:** Version bump only for package @reskript/config-vite





# [6.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.2...v6.0.0-beta.3) (2023-03-24)


### Bug Fixes

* **babel:** 修复babel转码时未完全对齐项目引入的core-js版本的问题 ([6aa0cd8](https://github.com/ecomfe/reskript/commit/6aa0cd87e5fdff88584106c442b0ee872bdd7baf))


### Features

* **build:** 为Vite引擎增加legacy配置 ([3bd75c5](https://github.com/ecomfe/reskript/commit/3bd75c5e51a7e6b36b1b64164904700ddea681aa))
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

**Note:** Version bump only for package @reskript/config-vite





# [6.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.0...v6.0.0-beta.1) (2023-01-17)

**Note:** Version bump only for package @reskript/config-vite





# [6.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0-beta.0) (2023-01-17)

**Note:** Version bump only for package @reskript/config-vite





## [5.7.4](https://github.com/ecomfe/reskript/compare/v5.7.3...v5.7.4) (2023-01-10)

**Note:** Version bump only for package @reskript/config-vite

## [5.7.3](https://github.com/ecomfe/reskript/compare/v5.7.2...v5.7.3) (2022-11-30)

**Note:** Version bump only for package @reskript/config-vite

## [5.7.2](https://github.com/ecomfe/reskript/compare/v5.7.1...v5.7.2) (2022-10-12)

**Note:** Version bump only for package @reskript/config-vite

## [5.7.1](https://github.com/ecomfe/reskript/compare/v5.7.0...v5.7.1) (2022-10-10)

**Note:** Version bump only for package @reskript/config-vite

# [5.7.0](https://github.com/ecomfe/reskript/compare/v5.7.0-beta.0...v5.7.0) (2022-10-10)

**Note:** Version bump only for package @reskript/config-vite

# [5.7.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.6.1...v5.7.0-beta.0) (2022-10-05)

**Note:** Version bump only for package @reskript/config-vite

## [5.6.1](https://github.com/ecomfe/reskript/compare/v5.6.0...v5.6.1) (2022-10-04)

**Note:** Version bump only for package @reskript/config-vite

# [5.6.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.6.0) (2022-08-09)

**Note:** Version bump only for package @reskript/config-vite

# [5.5.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.5.0) (2022-08-09)

**Note:** Version bump only for package @reskript/config-vite

# [5.4.0](https://github.com/ecomfe/reskript/compare/v5.3.0...v5.4.0) (2022-07-01)

### Features

- **build:** 默认的 HTML 模板增加 dir 属性 ([#299](https://github.com/ecomfe/reskript/issues/299)) ([37bcf0e](https://github.com/ecomfe/reskript/commit/37bcf0e9bc25429fb686063611606e6937529f4a))

# [5.3.0](https://github.com/ecomfe/reskript/compare/v5.2.1...v5.3.0) (2022-05-11)

**Note:** Version bump only for package @reskript/config-vite

## [5.2.1](https://github.com/ecomfe/reskript/compare/v5.2.0...v5.2.1) (2022-03-29)

### Bug Fixes

- **play:** 修复 Vite 下 play 不能运行的问题 ([#282](https://github.com/ecomfe/reskript/issues/282)) ([2c6cc83](https://github.com/ecomfe/reskript/commit/2c6cc83144faf90f6462c58b45612d4a0a5e361f))
- **play:** 处理 emotion 无法被 optimizeDeps 优化的问题 ([#284](https://github.com/ecomfe/reskript/issues/284)) ([c2f9a3b](https://github.com/ecomfe/reskript/commit/c2f9a3b7a23b4525457231e7bc5b280c0c6ed23e))

# [5.2.0](https://github.com/ecomfe/reskript/compare/v5.1.0...v5.2.0) (2022-03-14)

### Bug Fixes

- **build:** 修复\*.var.less 未自动注入的问题 ([#279](https://github.com/ecomfe/reskript/issues/279)) ([65db818](https://github.com/ecomfe/reskript/commit/65db818545b8366450612a48abbf14201f9ea6c2))

# [5.1.0](https://github.com/ecomfe/reskript/compare/v5.0.0...v5.1.0) (2022-03-11)

### Bug Fixes

- **build:** 修复对 core-js 的预处理逻辑 ([#277](https://github.com/ecomfe/reskript/issues/277)) ([f82c6a0](https://github.com/ecomfe/reskript/commit/f82c6a0b5a15516be149104c62177b1fd22e169c))

# [5.0.0](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.1...v5.0.0) (2022-03-10)

### Bug Fixes

- **config-vite:** 修复调用 core-js-compat 的错误 ([72e0b3b](https://github.com/ecomfe/reskript/commit/72e0b3bb4e0dc2ece71e65d1213184a6aff286d5))

# [5.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2022-03-10)

### Performance Improvements

- **build:** 预处理 antd 和 core-js 的打包 ([0559a6e](https://github.com/ecomfe/reskript/commit/0559a6e42b3c50fc3445cb91224a531c25d9c31d))

# [5.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v4.3.0...v5.0.0-beta.0) (2022-03-03)

### Features

- **build:** 在 Vite 引擎中支持 publicPath ([#200](https://github.com/ecomfe/reskript/issues/200)) ([c4da054](https://github.com/ecomfe/reskript/commit/c4da054ed4e2a3c704c2d54dc3777801b343167e))
- **build:** 支持 Vite 的 build 命令 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([4294acf](https://github.com/ecomfe/reskript/commit/4294acf3da0346760313d1a89db3ca4fb93c45c8))
- **build:** 支持 Vite 的 finalize 配置 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([33ab5b6](https://github.com/ecomfe/reskript/commit/33ab5b65fa91b4843e1c5a5b488054796ed8d830))
- **build:** 支持 Vite 的 service worker 生成 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([47600c0](https://github.com/ecomfe/reskript/commit/47600c0cb20276bf72e4d81be7071929816c6d1f))
- **build:** 支持双引擎的 HTML 修改功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([41d9521](https://github.com/ecomfe/reskript/commit/41d9521225ff4b5bcb43614d82f9eec87bcd638d))
- **config-vite:** 增加 css 相关的处理插件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([3e0e65b](https://github.com/ecomfe/reskript/commit/3e0e65b75c72d3fa308563595254248f5848e392))
- **config-vite:** 实现 SVG 转 React 组件的插件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([056c06a](https://github.com/ecomfe/reskript/commit/056c06aaf799ad76ca2271c990411d18786ad3b4))
- **dev:** 在 Vite 引擎中支持 customizeMiddleware ([#200](https://github.com/ecomfe/reskript/issues/200)) ([f023a42](https://github.com/ecomfe/reskript/commit/f023a42b47bc41bcd6e0af7c3b3c2df2dcec5e2f))
- **dev:** 实现 Vite 的 dev 基础功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([2e46749](https://github.com/ecomfe/reskript/commit/2e46749180f47810abf9171d74d0b85820d98d55))
- **play:** 支持 Vite 引擎的 play 功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([bb7e629](https://github.com/ecomfe/reskript/commit/bb7e62936582c62098e3bea31ee93f286eaa81a6))
- **portal:** 实现 portal 模块 ([#266](https://github.com/ecomfe/reskript/issues/266)) ([2e765dc](https://github.com/ecomfe/reskript/commit/2e765dc84f7d9224b317c73bb5ceb9576a28b779))
- 使用 query 引入 worker ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ed5efd4](https://github.com/ecomfe/reskript/commit/ed5efd46a67672b14919b84fa4ea9805afd326c2))
- 实现 Vite 样式相关的配置 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ee7bab0](https://github.com/ecomfe/reskript/commit/ee7bab0c127d153ebc158e41f6be6921e108c619))
- 自动生成入口 HTML 的插件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([a1efd94](https://github.com/ecomfe/reskript/commit/a1efd94d80eda7e5758e7fb1f28c26dc104271d4))

### BREAKING CHANGES

- **build:** `@reskript/webpack-plugin-extra-script`已经废弃，使用`@reskript/plugin-inject-html`替代
- **dev:** `@reskript/config-webpack`和`build.finalize`中的`styleResources`相关的功能已经移除，由内置的 less 插件实现
- **dev:** `$features`改名为`skr.features`，`$build`改名为`skr.build`
- **dev:** 自定义 HTML 模板中，只能使用`templateData.*`获取模板数据
- **dev:** 原入口配置中的`export const html`中，用于模板数据的部分，更新为`export const templateData`
- 要将文件引入为 worker，需要使用`xxx?worker`的形式
