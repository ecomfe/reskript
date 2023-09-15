# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.2](https://github.com/ecomfe/reskript/compare/v6.0.1...v6.0.2) (2023-09-15)

**Note:** Version bump only for package @reskript/showcase-todo





## [6.0.1](https://github.com/ecomfe/reskript/compare/v6.0.0...v6.0.1) (2023-08-17)


### Bug Fixes

* **dev:** 在Vite引擎支持public资源访问 ([cb4ae20](https://github.com/ecomfe/reskript/commit/cb4ae20f5b83cf486f05b5a121c9d9f79c5eb519))





# [6.0.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0) (2023-07-03)


### Bug Fixes

* **babel:** 修复babel转码时未完全对齐项目引入的core-js版本的问题 ([088f72d](https://github.com/ecomfe/reskript/commit/088f72dccf49f10d3f6d5c2c627188d24166a7ae))
* **build:** 修正Webpack的产出生成规则 ([6ed07e5](https://github.com/ecomfe/reskript/commit/6ed07e53835b6fb49130a3efaa718c40ffd3c893))
* **dev:** 修复historyApiFallback路径错误 ([200b673](https://github.com/ecomfe/reskript/commit/200b67380518533d77e9cf6eb4ee5e7af25ed511))


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
* **build:** 如果有使用自定义`{entry}.config.mjs`并配置了`filename`选项，产出结构会发生变化。可在`filename`的值前缀加上`assets/`来修复。
* **build:** 如果配置中有自定义的`publicPath`，需要去掉配置值最后的`assets/`部分。





# [6.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.3...v6.0.0-beta.4) (2023-05-28)

**Note:** Version bump only for package @reskript/showcase-todo





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


### Bug Fixes

* **dev:** 修复historyApiFallback路径错误 ([34d8e1a](https://github.com/ecomfe/reskript/commit/34d8e1a6905a133c4573868f8928799fda15af68))





# [6.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.0...v6.0.0-beta.1) (2023-01-17)

**Note:** Version bump only for package @reskript/showcase-todo





# [6.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0-beta.0) (2023-01-17)


### Bug Fixes

* **build:** 修正Webpack的产出生成规则 ([c8812f3](https://github.com/ecomfe/reskript/commit/c8812f3cad751b49ca214376dfeee9ecd24c50d2))


### BREAKING CHANGES

* **build:** 如果有使用自定义`{entry}.config.mjs`并配置了`filename`选项，产出结构会发生变化。可在`filename`的值前缀加上`assets/`来修复。
* **build:** 如果配置中有自定义的`publicPath`，需要去掉配置值最后的`assets/`部分。





## [5.7.4](https://github.com/ecomfe/reskript/compare/v5.7.3...v5.7.4) (2023-01-10)

**Note:** Version bump only for package @reskript/showcase-todo

## [5.7.3](https://github.com/ecomfe/reskript/compare/v5.7.2...v5.7.3) (2022-11-30)

### Bug Fixes

- **build:** 修复 webpack 对入口配置的检验问题 ([#320](https://github.com/ecomfe/reskript/issues/320)) ([6a1394f](https://github.com/ecomfe/reskript/commit/6a1394ff03e2376236f151bcbe97e5982f2ae058))

## [5.7.2](https://github.com/ecomfe/reskript/compare/v5.7.1...v5.7.2) (2022-10-12)

### Bug Fixes

- **plugin-experimental:** 处理 antd 组件时自动生成文件增加后缀 ([9c62dce](https://github.com/ecomfe/reskript/commit/9c62dcec8fd887b986d4d4b1cea3cb52ddecee23))

## [5.7.1](https://github.com/ecomfe/reskript/compare/v5.7.0...v5.7.1) (2022-10-10)

**Note:** Version bump only for package @reskript/showcase-todo

# [5.7.0](https://github.com/ecomfe/reskript/compare/v5.7.0-beta.0...v5.7.0) (2022-10-10)

**Note:** Version bump only for package @reskript/showcase-todo

# [5.7.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.6.1...v5.7.0-beta.0) (2022-10-05)

### Features

- **plugin-experimental:** 实现 swc 插件 ([51edf79](https://github.com/ecomfe/reskript/commit/51edf79120b76a0675dc590f5a4e0e02bf435b81))

## [5.6.1](https://github.com/ecomfe/reskript/compare/v5.6.0...v5.6.1) (2022-10-04)

**Note:** Version bump only for package @reskript/showcase-todo

# [5.6.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.6.0) (2022-08-09)

**Note:** Version bump only for package @reskript/showcase-todo

# [5.5.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.5.0) (2022-08-09)

**Note:** Version bump only for package @reskript/showcase-todo

# [5.4.0](https://github.com/ecomfe/reskript/compare/v5.3.0...v5.4.0) (2022-07-01)

### Features

- **build:** 默认的 HTML 模板增加 dir 属性 ([#299](https://github.com/ecomfe/reskript/issues/299)) ([37bcf0e](https://github.com/ecomfe/reskript/commit/37bcf0e9bc25429fb686063611606e6937529f4a))

# [5.3.0](https://github.com/ecomfe/reskript/compare/v5.2.1...v5.3.0) (2022-05-11)

### Features

- **babel:** 支持 skr babel 调用时传递--uses 参数 ([#285](https://github.com/ecomfe/reskript/issues/285)) ([3dc2407](https://github.com/ecomfe/reskript/commit/3dc2407e8005293abfb9868ac46081288a8a1e20))

## [5.2.1](https://github.com/ecomfe/reskript/compare/v5.2.0...v5.2.1) (2022-03-29)

**Note:** Version bump only for package @reskript/showcase-todo

# [5.2.0](https://github.com/ecomfe/reskript/compare/v5.1.0...v5.2.0) (2022-03-14)

### Bug Fixes

- **build:** 修复\*.var.less 未自动注入的问题 ([#279](https://github.com/ecomfe/reskript/issues/279)) ([65db818](https://github.com/ecomfe/reskript/commit/65db818545b8366450612a48abbf14201f9ea6c2))

# [5.1.0](https://github.com/ecomfe/reskript/compare/v5.0.0...v5.1.0) (2022-03-11)

**Note:** Version bump only for package @reskript/showcase-todo

# [5.0.0](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.1...v5.0.0) (2022-03-10)

**Note:** Version bump only for package @reskript/showcase-todo

# [5.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2022-03-10)

### Features

- **plugin-inject-html:** 支持 plugin-inject-plugin 仅在指定的命令下启用 ([9e9ab97](https://github.com/ecomfe/reskript/commit/9e9ab97358ad0339d76d54d8c5ab1b8c30492774))
- **plugin-utils:** 增加插件相关的工具包 ([#275](https://github.com/ecomfe/reskript/issues/275)) ([5b82848](https://github.com/ecomfe/reskript/commit/5b828489c2ee96a612f8faecfb18a4d34fb14228))

### Performance Improvements

- **build:** 预处理 antd 和 core-js 的打包 ([0559a6e](https://github.com/ecomfe/reskript/commit/0559a6e42b3c50fc3445cb91224a531c25d9c31d))

# [5.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v4.3.0...v5.0.0-beta.0) (2022-03-03)

### Features

- **build:** 在 Vite 引擎中支持 publicPath ([#200](https://github.com/ecomfe/reskript/issues/200)) ([c4da054](https://github.com/ecomfe/reskript/commit/c4da054ed4e2a3c704c2d54dc3777801b343167e))
- **build:** 支持 Vite 的 build 命令 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([4294acf](https://github.com/ecomfe/reskript/commit/4294acf3da0346760313d1a89db3ca4fb93c45c8))
- **build:** 支持 Vite 的 service worker 生成 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([47600c0](https://github.com/ecomfe/reskript/commit/47600c0cb20276bf72e4d81be7071929816c6d1f))
- **build:** 支持双引擎的 HTML 修改功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([41d9521](https://github.com/ecomfe/reskript/commit/41d9521225ff4b5bcb43614d82f9eec87bcd638d))
- **dev:** 在 Vite 引擎中支持 customizeMiddleware ([#200](https://github.com/ecomfe/reskript/issues/200)) ([f023a42](https://github.com/ecomfe/reskript/commit/f023a42b47bc41bcd6e0af7c3b3c2df2dcec5e2f))
- **dev:** 实现 Vite 的 dev 基础功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([2e46749](https://github.com/ecomfe/reskript/commit/2e46749180f47810abf9171d74d0b85820d98d55))
- **play:** 支持 Vite 引擎的 play 功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([bb7e629](https://github.com/ecomfe/reskript/commit/bb7e62936582c62098e3bea31ee93f286eaa81a6))
- **portal:** 实现 portal 模块 ([#266](https://github.com/ecomfe/reskript/issues/266)) ([2e765dc](https://github.com/ecomfe/reskript/commit/2e765dc84f7d9224b317c73bb5ceb9576a28b779))
- 使用 query 引入 worker ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ed5efd4](https://github.com/ecomfe/reskript/commit/ed5efd46a67672b14919b84fa4ea9805afd326c2))
- 实现 Vite 样式相关的配置 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ee7bab0](https://github.com/ecomfe/reskript/commit/ee7bab0c127d153ebc158e41f6be6921e108c619))

### BREAKING CHANGES

- **build:** `@reskript/webpack-plugin-extra-script`已经废弃，使用`@reskript/plugin-inject-html`替代
- **dev:** `@reskript/config-webpack`和`build.finalize`中的`styleResources`相关的功能已经移除，由内置的 less 插件实现
- **dev:** `$features`改名为`skr.features`，`$build`改名为`skr.build`
- **dev:** 自定义 HTML 模板中，只能使用`templateData.*`获取模板数据
- **dev:** 原入口配置中的`export const html`中，用于模板数据的部分，更新为`export const templateData`
- 要将文件引入为 worker，需要使用`xxx?worker`的形式

# [4.3.0](https://github.com/ecomfe/reskript/compare/v4.2.1...v4.3.0) (2022-03-03)

### Features

- **settings:** 提供客户端常用类型 ([#270](https://github.com/ecomfe/reskript/issues/270)) ([84994c1](https://github.com/ecomfe/reskript/commit/84994c1cf74c093b72ebde2cf1f05b6637131554))

## [4.2.1](https://github.com/ecomfe/reskript/compare/v4.2.0...v4.2.1) (2022-02-25)

**Note:** Version bump only for package @reskript/showcase-todo

# [4.2.0](https://github.com/ecomfe/reskript/compare/v4.1.2...v4.2.0) (2022-02-25)

**Note:** Version bump only for package @reskript/showcase-todo

## [4.1.2](https://github.com/ecomfe/reskript/compare/v4.1.1...v4.1.2) (2022-02-10)

**Note:** Version bump only for package @reskript/showcase-todo

## [4.1.1](https://github.com/ecomfe/reskript/compare/v4.1.0...v4.1.1) (2022-02-08)

**Note:** Version bump only for package @reskript/showcase-todo

# [4.1.0](https://github.com/ecomfe/reskript/compare/v4.0.1...v4.1.0) (2022-02-07)

**Note:** Version bump only for package @reskript/showcase-todo

## [4.0.1](https://github.com/ecomfe/reskript/compare/v4.0.0...v4.0.1) (2022-02-07)

**Note:** Version bump only for package @reskript/showcase-todo

# [4.0.0](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.2...v4.0.0) (2022-02-03)

### Features

- 优化 build.finalize 的参数类型 ([#244](https://github.com/ecomfe/reskript/issues/244)) ([4fe2677](https://github.com/ecomfe/reskript/commit/4fe267765d6d63d1021cb2956fc8d5721e2568b6))
- 支持插件配置的值为空值或数组 ([#245](https://github.com/ecomfe/reskript/issues/245)) ([b98c2c8](https://github.com/ecomfe/reskript/commit/b98c2c8df7cd141963690ae53320e2a4ad2e6539))

### BREAKING CHANGES

- `plugins`配置为函数时的`commandName`参数增加了`"play"`的可能性，原版本在使用`skr play`时的该参数值为`"dev"`

# [4.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-02-02)

### Bug Fixes

- **build:** 修复 loader-of-loader 会无视前置 loader 的问题 ([400ee50](https://github.com/ecomfe/reskript/commit/400ee50c691d029d4d6a128454436a7a102f69a8))

# [4.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2022-02-01)

### Features

- **build:** 支持各个 loader 的 ESM 化 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([d7451e5](https://github.com/ecomfe/reskript/commit/d7451e5fd6c88aed0bcfdd11e807948a824ce2f3))

# [4.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v3.0.6...v4.0.0-beta.0) (2022-01-30)

### Code Refactoring

- 核心部分迁移到纯 ESM 包格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([f9d06b0](https://github.com/ecomfe/reskript/commit/f9d06b0fd802caa002707686d004ca8683f7002f))

### Features

- **build:** 各个插件转为 ESM 格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([1950ace](https://github.com/ecomfe/reskript/commit/1950ace8c05d317b855a7f01b4680e54a011d61f))
- **play:** 支持 play 的组件配置为 ts 等扩展名 ([#231](https://github.com/ecomfe/reskript/issues/231)) ([ae72706](https://github.com/ecomfe/reskript/commit/ae72706b2c870c8f519cacf88f43075df9a2179d))
- **settings:** 支持且仅支持.mjs 和.ts 类型的项目配置 ([#225](https://github.com/ecomfe/reskript/issues/225)) ([5a9586b](https://github.com/ecomfe/reskript/commit/5a9586b053f16d89a7b87b22dd6a4ca84d96edd2))
- **settings:** 支持自定义配置文件路径 ([#230](https://github.com/ecomfe/reskript/issues/230)) ([2a4ca98](https://github.com/ecomfe/reskript/commit/2a4ca987ae7e193916ed8c7972dbcbff521b4863))

### Performance Improvements

- **build:** 异步检索 loader 路径优化性能 ([#234](https://github.com/ecomfe/reskript/issues/234)) ([3ace896](https://github.com/ecomfe/reskript/commit/3ace89660fac60986b5daa9c8a07d9cf4a6248c8))

### BREAKING CHANGES

- **settings:** 项目配置必须为`reskript.config.{mjs|ts}`，且格式为 ESM
- **settings:** 应用入口配置必须为`xxx.config.{mjs|ts}`，且格式为 ESM
- 发布的包为纯 ESM 格式，无法通过 CommonJS 的`require`引入。参考[sinderesorhus 的建议](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## [3.0.6](https://github.com/ecomfe/reskript/compare/v3.0.5...v3.0.6) (2022-01-21)

**Note:** Version bump only for package @reskript/showcase-todo

## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)

**Note:** Version bump only for package @reskript/showcase-todo

## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

**Note:** Version bump only for package @reskript/showcase-todo

## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)

### Bug Fixes

- **lint:** 样式文件的 lint 问题可以被自动修复 ([#232](https://github.com/ecomfe/reskript/issues/232)) ([a154f31](https://github.com/ecomfe/reskript/commit/a154f317d519e366b875534639c13a7b3306f4e9))

## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

**Note:** Version bump only for package @reskript/showcase-todo

## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)

**Note:** Version bump only for package @reskript/showcase-todo

# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package @reskript/showcase-todo

# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)

**Note:** Version bump only for package @reskript/showcase-todo

# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)

### Features

- 支持 eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))
- 支持 stylelint 14 ([#186](https://github.com/ecomfe/reskript/issues/186)) ([05e24c0](https://github.com/ecomfe/reskript/commit/05e24c0e8f004e7c342c138e00d1b73724545aa3))

### BREAKING CHANGES

- 需要`eslint`升级至`8.x`
- 需要`stylelint`升级至`14.x`

## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)

**Note:** Version bump only for package @reskript/showcase-todo

## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

**Note:** Version bump only for package @reskript/showcase-todo

## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)

### Bug Fixes

- **build:** 支持 import 的时候使用.js 但指向.ts 或.tsx ([#219](https://github.com/ecomfe/reskript/issues/219)) ([4bad498](https://github.com/ecomfe/reskript/commit/4bad49865cd55aa44e5bf41e72436ec91284c822))
- **build:** 支持项目使用纯 ESM 格式，配置文件使用 cjs ([#218](https://github.com/ecomfe/reskript/issues/218)) ([2646bac](https://github.com/ecomfe/reskript/commit/2646bac2f50e1ff52a0a7a4b088a7b282d6cf614))

# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)

### Bug Fixes

- **build:** 在 build 时也同样读用户自定义的 lint 配置 ([#211](https://github.com/ecomfe/reskript/issues/211)) ([e580bce](https://github.com/ecomfe/reskript/commit/e580bce69a0d1a7f2714409d9611a50688020291))

### Features

- **dev:** 支持 HTTPS 协议启动调试服务器 ([#217](https://github.com/ecomfe/reskript/issues/217)) ([4646f77](https://github.com/ecomfe/reskript/commit/4646f77e30dd28f8e3f6b408ef81f325dcf1fd37))

# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)

### Features

- **build:** 引入 psotcss-preset-env ([#204](https://github.com/ecomfe/reskript/issues/204)) ([f910249](https://github.com/ecomfe/reskript/commit/f9102496978c2fbaf2049c18cc0a5250b03daba1))

# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)

### Bug Fixes

- **build:** 读取.env 顺序修复 ([#174](https://github.com/ecomfe/reskript/issues/174)) ([132f01f](https://github.com/ecomfe/reskript/commit/132f01f9166f96e2046b935ee08132e15444ee51))

## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

**Note:** Version bump only for package @reskript/showcase-todo

## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

**Note:** Version bump only for package @reskript/showcase-todo

# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)

### Features

- **build:** 增加一个产出检查项，确保产出的 HTML 适用于微前端 ([#163](https://github.com/ecomfe/reskript/issues/163)) ([5f6b252](https://github.com/ecomfe/reskript/commit/5f6b2524d89f8787c7a45ae4765928bc41535ef4))

# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)

### Bug Fixes

- **build:** 把 SVG 转为组件时保留 ref ([#159](https://github.com/ecomfe/reskript/issues/159)) ([863f582](https://github.com/ecomfe/reskript/commit/863f58254eb8bc3ee1e04eb04187b5381f570b5f))

# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

**Note:** Version bump only for package @reskript/showcase-todo

# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)

**Note:** Version bump only for package @reskript/showcase-todo

# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)

### Bug Fixes

- **build:** 修复读取入口配置时的逻辑错误 ([#149](https://github.com/ecomfe/reskript/issues/149)) ([0ce0026](https://github.com/ecomfe/reskript/commit/0ce00269216bb5c419467ad7b91ff2f40e295f39))

# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

**Note:** Version bump only for package @reskript/showcase-todo

# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)

**Note:** Version bump only for package @reskript/showcase-todo

# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)

- feat(dev)!: 支持 webpack-dev-server 4 版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
- fix(build)!: 由用户自行安装 core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)

### Features

- **build:** 增加严格模式开关 ([#54](https://github.com/ecomfe/reskript/issues/54)) ([3e00afc](https://github.com/ecomfe/reskript/commit/3e00afc503371412a30260c5a836935b47b7eb60))
- 支持 tailwind ([#119](https://github.com/ecomfe/reskript/issues/119)) ([d636c80](https://github.com/ecomfe/reskript/commit/d636c804ddfbaae00674682a86cec5ec32ff9265))

### BREAKING CHANGES

- `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
- `devServer.hot`的类型修改为`boolean`
- `config-babel`的`hot`配置类型修改为`boolean`
- 不再处理`core-js`的引入，用户必须在项目中自行安装`core-js@3`

## [1.15.2](https://github.com/ecomfe/reskript/compare/v1.15.1...v1.15.2) (2021-08-24)

**Note:** Version bump only for package @reskript/showcase-todo
