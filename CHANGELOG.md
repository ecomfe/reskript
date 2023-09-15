# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.2](https://github.com/ecomfe/reskript/compare/v6.0.1...v6.0.2) (2023-09-15)


### Bug Fixes

* **dev:** 修复webpack下--host参数失效问题 ([6ddeaed](https://github.com/ecomfe/reskript/commit/6ddeaed04bf7fb1a3c8023d94eed5b641fdcee0b))
* **dev:** 禁用Vite下自动递增端口的功能 ([2f58560](https://github.com/ecomfe/reskript/commit/2f58560f1afe1ae305662dee720e913bd7662217))





## [6.0.1](https://github.com/ecomfe/reskript/compare/v6.0.0...v6.0.1) (2023-08-17)


### Bug Fixes

* **dev:** 在Vite引擎支持public资源访问 ([cb4ae20](https://github.com/ecomfe/reskript/commit/cb4ae20f5b83cf486f05b5a121c9d9f79c5eb519))





# [6.0.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0) (2023-07-03)


### Bug Fixes

* **babel:** 修复babel转码时未完全对齐项目引入的core-js版本的问题 ([088f72d](https://github.com/ecomfe/reskript/commit/088f72dccf49f10d3f6d5c2c627188d24166a7ae))
* **build:** 修复Vite下core-js路径处理错误的问题 ([#327](https://github.com/ecomfe/reskript/issues/327)) ([7d36aad](https://github.com/ecomfe/reskript/commit/7d36aad143da9b4b6fd828af2c62b19270f6bbbb))
* **build:** 修正Webpack的产出生成规则 ([6ed07e5](https://github.com/ecomfe/reskript/commit/6ed07e53835b6fb49130a3efaa718c40ffd3c893))
* **dev:** 修复historyApiFallback路径错误 ([200b673](https://github.com/ecomfe/reskript/commit/200b67380518533d77e9cf6eb4ee5e7af25ed511))
* **dev:** 让dev时的publicPath逻辑与build相同 ([ff28747](https://github.com/ecomfe/reskript/commit/ff28747b57890c8141856c13ca3648ac5d37deb2))
* **plugin-qiankun:** 修复首页不会被插件处理的问题 ([c5fb1cc](https://github.com/ecomfe/reskript/commit/c5fb1ccc432de9205b35fa5b9e061f43d7ac3c2c))


### Code Refactoring

* **lint:** 升级stylelint至15.x版本 ([0e9b700](https://github.com/ecomfe/reskript/commit/0e9b700f33b8acc5cc9d5969fec4d35730879bcd))


### Features

* **build:** 为Vite引擎增加legacy配置 ([51fe424](https://github.com/ecomfe/reskript/commit/51fe42421e9d763e6f6825cb31a8a4763e8b589e))
* **build:** 更新支持antd 5.x ([9b35d55](https://github.com/ecomfe/reskript/commit/9b35d55c2d619fec12c602fccf355d706cb108b1))
* **doctor:** 增加V6迁移检查 ([4a0b8b1](https://github.com/ecomfe/reskript/commit/4a0b8b1c476906062f242f3717238cb714b5279c))
* **test:** 升级Jest至29.x版本 ([#317](https://github.com/ecomfe/reskript/issues/317)) ([92b1e8b](https://github.com/ecomfe/reskript/commit/92b1e8bc4c4aa40862b51b1477a835218e59b11b))
* 支持Vite 4.x版本 ([2d6cbcf](https://github.com/ecomfe/reskript/commit/2d6cbcf766772e0075a286bb2a3f7709cdfebc04))


### Performance Improvements

* **build:** 移除resolve-typescript-plugin插件 ([f02ce7a](https://github.com/ecomfe/reskript/commit/f02ce7af56ba73d9c50b3e447ef00a31a590d13e))


### BREAKING CHANGES

* **lint:** 部分stylelint规则废弃，需增加`stylistic/`前缀
* **test:** `jest`版本升级为`29.x`，snapshot测试等结果可能发生变化
* **test:** 移除了对`enzyme`的使用，请使用`@testing-library/react`进行组件测试
* **test:** NodeJS版本要求`16.10`及以上
* **build:** 如需要继续使用`antd 4.x`版本，需手动指定`build.uses`加入`antd@4`值
* **build:** 移除`less-plugin-functions`的支持
* **build:** 移除原有对`.less`文件中的`calc`的特殊处理，如果有对`antd`的变量替换成CSS变量等特殊应用，会出现编译错误
* **build:** 需要使用Webpack `5.74.0`以上版本
* 需要更新Vite至4.x版本配合使用
* **build:** 如果有使用自定义`{entry}.config.mjs`并配置了`filename`选项，产出结构会发生变化。可在`filename`的值前缀加上`assets/`来修复。
* **build:** 如果配置中有自定义的`publicPath`，需要去掉配置值最后的`assets/`部分。





# [6.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.3...v6.0.0-beta.4) (2023-05-28)

**Note:** Version bump only for package reskript





# [6.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.2...v6.0.0-beta.3) (2023-03-24)


### Bug Fixes

* **babel:** 修复babel转码时未完全对齐项目引入的core-js版本的问题 ([6aa0cd8](https://github.com/ecomfe/reskript/commit/6aa0cd87e5fdff88584106c442b0ee872bdd7baf))


### Features

* **build:** 为Vite引擎增加legacy配置 ([3bd75c5](https://github.com/ecomfe/reskript/commit/3bd75c5e51a7e6b36b1b64164904700ddea681aa))
* **build:** 更新支持antd 5.x ([f08babf](https://github.com/ecomfe/reskript/commit/f08babf051899dacfd25baec06ce932b1e6893a2))
* **doctor:** 增加V6迁移检查 ([d2d7aad](https://github.com/ecomfe/reskript/commit/d2d7aada0690ad5ba987f8591115c4760a211176))
* **test:** 升级Jest至29.x版本 ([601df55](https://github.com/ecomfe/reskript/commit/601df55c4f7ff063ab473ac53c4e7a943b178f40))
* 支持Vite 4.x版本 ([e772828](https://github.com/ecomfe/reskript/commit/e772828ea7b5bb569c200cb5a7977e332df4755b))


### Performance Improvements

* **build:** 移除resolve-typescript-plugin插件 ([c1956f6](https://github.com/ecomfe/reskript/commit/c1956f6cdd645d525175b41aa16a03641bd084d0))


### BREAKING CHANGES

* **test:** `jest`版本升级为`29.x`，snapshot测试等结果可能发生变化
* **test:** 移除了对`enzyme`的使用，请使用`@testing-library/react`进行组件测试
* **test:** NodeJS版本要求`16.10`及以上
* **build:** 如需要继续使用`antd 4.x`版本，需手动指定`build.uses`加入`antd@4`值
* **build:** 移除`less-plugin-functions`的支持
* **build:** 移除原有对`.less`文件中的`calc`的特殊处理，如果有对`antd`的变量替换成CSS变量等特殊应用，会出现编译错误
* **build:** 需要使用Webpack `5.74.0`以上版本
* 需要更新Vite至4.x版本配合使用





# [6.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.1...v6.0.0-beta.2) (2023-01-18)


### Bug Fixes

* **dev:** 修复historyApiFallback路径错误 ([34d8e1a](https://github.com/ecomfe/reskript/commit/34d8e1a6905a133c4573868f8928799fda15af68))





# [6.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v6.0.0-beta.0...v6.0.0-beta.1) (2023-01-17)


### Bug Fixes

* **dev:** 让dev时的publicPath逻辑与build相同 ([625576a](https://github.com/ecomfe/reskript/commit/625576a4ddf1dad7eecfb0015a830bbcc6e71ed8))
* **plugin-qiankun:** 修复首页不会被插件处理的问题 ([24e846e](https://github.com/ecomfe/reskript/commit/24e846ed3149a75d77197f846ea55a0bad664818))





# [6.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.7.4...v6.0.0-beta.0) (2023-01-17)


### Bug Fixes

* **build:** 修正Webpack的产出生成规则 ([c8812f3](https://github.com/ecomfe/reskript/commit/c8812f3cad751b49ca214376dfeee9ecd24c50d2))


### BREAKING CHANGES

* **build:** 如果有使用自定义`{entry}.config.mjs`并配置了`filename`选项，产出结构会发生变化。可在`filename`的值前缀加上`assets/`来修复。
* **build:** 如果配置中有自定义的`publicPath`，需要去掉配置值最后的`assets/`部分。





## [5.7.4](https://github.com/ecomfe/reskript/compare/v5.7.3...v5.7.4) (2023-01-10)

### Bug Fixes

- **babel:** 解决 babel 插件在 ESM 和 CJS 下的结构兼容性问题 ([ee90c47](https://github.com/ecomfe/reskript/commit/ee90c47afd61f4950c65b1675275a7b99352c54d))

## [5.7.3](https://github.com/ecomfe/reskript/compare/v5.7.2...v5.7.3) (2022-11-30)

### Bug Fixes

- **build:** 修复 webpack 对入口配置的检验问题 ([#320](https://github.com/ecomfe/reskript/issues/320)) ([6a1394f](https://github.com/ecomfe/reskript/commit/6a1394ff03e2376236f151bcbe97e5982f2ae058))

## [5.7.2](https://github.com/ecomfe/reskript/compare/v5.7.1...v5.7.2) (2022-10-12)

### Bug Fixes

- **plugin-experimental:** 处理 antd 组件时自动生成文件增加后缀 ([9c62dce](https://github.com/ecomfe/reskript/commit/9c62dcec8fd887b986d4d4b1cea3cb52ddecee23))

## [5.7.1](https://github.com/ecomfe/reskript/compare/v5.7.0...v5.7.1) (2022-10-10)

### Bug Fixes

- **plugin-experimental:** buildFast 插件过多地执行了用户的 finalize ([a50605c](https://github.com/ecomfe/reskript/commit/a50605c68bcfb7d5054d420674b3aaf309bee0c9))
- **plugin-experimental:** 使用 SWC 进行压缩 ([22d07d9](https://github.com/ecomfe/reskript/commit/22d07d9f787a87bfb77a6ed687abddf236da0183))

# [5.7.0](https://github.com/ecomfe/reskript/compare/v5.7.0-beta.0...v5.7.0) (2022-10-10)

**Note:** Version bump only for package reskript

# [5.7.0-beta.0](https://github.com/ecomfe/reskript/compare/v5.6.1...v5.7.0-beta.0) (2022-10-05)

### Features

- **plugin-experimental:** 使用 esbuild 压缩 ([f16010a](https://github.com/ecomfe/reskript/commit/f16010aa0f97bc442761186e76f1eb186057aaa3))
- **plugin-experimental:** 实现 swc 插件 ([51edf79](https://github.com/ecomfe/reskript/commit/51edf79120b76a0675dc590f5a4e0e02bf435b81))

## [5.6.1](https://github.com/ecomfe/reskript/compare/v5.6.0...v5.6.1) (2022-10-04)

### Bug Fixes

- **build:** 修复处理 less 的 calc 表达式时有空格的情况 ([#309](https://github.com/ecomfe/reskript/issues/309)) ([05ced9e](https://github.com/ecomfe/reskript/commit/05ced9e1ec08fbd44b7bb06d1cd5536919161b31))
- **plugin-qiankun:** 生成 HTML 增加 dir 属性 ([#314](https://github.com/ecomfe/reskript/issues/314)) ([5ee8ce4](https://github.com/ecomfe/reskript/commit/5ee8ce4c1641d9f8f51f085105c67acccb97f385))

# [5.6.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.6.0) (2022-08-09)

### Features

- **build:** 支持 watch 参数 ([#305](https://github.com/ecomfe/reskript/issues/305)) ([2648e91](https://github.com/ecomfe/reskript/commit/2648e9119712bb6c4834f97f44aaad2744c00fdb))
- **build:** 支持指定引入模块为 URL 或内容字符串 ([#303](https://github.com/ecomfe/reskript/issues/303)) ([f002bdb](https://github.com/ecomfe/reskript/commit/f002bdb41054f3e33dbde0e76e2e0414a2444609))
- **dev:** proxyRewrite 配置支持直接指定协议 ([#306](https://github.com/ecomfe/reskript/issues/306)) ([aae8cb9](https://github.com/ecomfe/reskript/commit/aae8cb97400b2dd3f9ca45d16df0278d0de3008b))

# [5.5.0](https://github.com/ecomfe/reskript/compare/v5.4.0...v5.5.0) (2022-08-09)

### Features

- **build:** 支持 watch 参数 ([#305](https://github.com/ecomfe/reskript/issues/305)) ([2648e91](https://github.com/ecomfe/reskript/commit/2648e9119712bb6c4834f97f44aaad2744c00fdb))
- **build:** 支持指定引入模块为 URL 或内容字符串 ([#303](https://github.com/ecomfe/reskript/issues/303)) ([f002bdb](https://github.com/ecomfe/reskript/commit/f002bdb41054f3e33dbde0e76e2e0414a2444609))
- **dev:** proxyRewrite 配置支持直接指定协议 ([#306](https://github.com/ecomfe/reskript/issues/306)) ([aae8cb9](https://github.com/ecomfe/reskript/commit/aae8cb97400b2dd3f9ca45d16df0278d0de3008b))

# [5.4.0](https://github.com/ecomfe/reskript/compare/v5.3.0...v5.4.0) (2022-07-01)

### Bug Fixes

- **dev:** 启用 HTTPS 且有--host 参数时，publicPath 设置错误 ([#297](https://github.com/ecomfe/reskript/issues/297)) ([ed58638](https://github.com/ecomfe/reskript/commit/ed58638a5ec14387d53f96c6f3a9e42da2129bad))

### Features

- **build:** 默认的 HTML 模板增加 dir 属性 ([#299](https://github.com/ecomfe/reskript/issues/299)) ([37bcf0e](https://github.com/ecomfe/reskript/commit/37bcf0e9bc25429fb686063611606e6937529f4a))

# [5.3.0](https://github.com/ecomfe/reskript/compare/v5.2.1...v5.3.0) (2022-05-11)

### Bug Fixes

- **dev:** proxy 配置兼容 Vite ([#290](https://github.com/ecomfe/reskript/issues/290)) ([0a0be8d](https://github.com/ecomfe/reskript/commit/0a0be8d3dcb34e185001a4a1d7055ac2be97a53f))
- **settings:** plugins 的校验定义错误 ([8cb422f](https://github.com/ecomfe/reskript/commit/8cb422fe57fc512348c530a3302825c839694e10))

### Features

- **babel:** 支持 skr babel 调用时传递--uses 参数 ([#285](https://github.com/ecomfe/reskript/issues/285)) ([3dc2407](https://github.com/ecomfe/reskript/commit/3dc2407e8005293abfb9868ac46081288a8a1e20))

## [5.2.1](https://github.com/ecomfe/reskript/compare/v5.2.0...v5.2.1) (2022-03-29)

### Bug Fixes

- **init:** 项目模板细节问题 ([#283](https://github.com/ecomfe/reskript/issues/283)) ([265f244](https://github.com/ecomfe/reskript/commit/265f244fe8ca859c3420691d448e36703d726dde))
- **play:** 修复 Vite 下 play 不能运行的问题 ([#282](https://github.com/ecomfe/reskript/issues/282)) ([2c6cc83](https://github.com/ecomfe/reskript/commit/2c6cc83144faf90f6462c58b45612d4a0a5e361f))
- **play:** 处理 emotion 无法被 optimizeDeps 优化的问题 ([#284](https://github.com/ecomfe/reskript/issues/284)) ([c2f9a3b](https://github.com/ecomfe/reskript/commit/c2f9a3b7a23b4525457231e7bc5b280c0c6ed23e))

# [5.2.0](https://github.com/ecomfe/reskript/compare/v5.1.0...v5.2.0) (2022-03-14)

### Bug Fixes

- **build:** 修复\*.var.less 未自动注入的问题 ([#279](https://github.com/ecomfe/reskript/issues/279)) ([65db818](https://github.com/ecomfe/reskript/commit/65db818545b8366450612a48abbf14201f9ea6c2))

### Features

- **init:** 初始化模板支持选择 Vite 引擎 ([#280](https://github.com/ecomfe/reskript/issues/280)) ([905bbec](https://github.com/ecomfe/reskript/commit/905bbec692db3ae04b00dbbfbf3560f6113ac30d))

# [5.1.0](https://github.com/ecomfe/reskript/compare/v5.0.0...v5.1.0) (2022-03-11)

### Bug Fixes

- **build:** 修复对 core-js 的预处理逻辑 ([#277](https://github.com/ecomfe/reskript/issues/277)) ([f82c6a0](https://github.com/ecomfe/reskript/commit/f82c6a0b5a15516be149104c62177b1fd22e169c))
- **build:** 找回 Webpack 的入口配置下的 html 导出 ([#278](https://github.com/ecomfe/reskript/issues/278)) ([303668e](https://github.com/ecomfe/reskript/commit/303668e238b053825efcc873d4939f65ca67e463))

### Features

- **doctor:** 增加 V5 迁移检查 ([c06a1f8](https://github.com/ecomfe/reskript/commit/c06a1f8fb47e9ce0f37508ba8947c29bdb6b748d))

# [5.0.0](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.1...v5.0.0) (2022-03-10)

### Bug Fixes

- **config-vite:** 修复调用 core-js-compat 的错误 ([72e0b3b](https://github.com/ecomfe/reskript/commit/72e0b3bb4e0dc2ece71e65d1213184a6aff286d5))
- **settings:** 优化 vite 引擎下的 build.finalize 类型 ([131d6fb](https://github.com/ecomfe/reskript/commit/131d6fbd2fa5ee16aac99d88ca6cf39a6601daed))

# [5.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2022-03-10)

### Features

- **plugin-inject-html:** 支持 plugin-inject-plugin 仅在指定的命令下启用 ([9e9ab97](https://github.com/ecomfe/reskript/commit/9e9ab97358ad0339d76d54d8c5ab1b8c30492774))
- **plugin-utils:** 增加插件相关的工具包 ([#275](https://github.com/ecomfe/reskript/issues/275)) ([5b82848](https://github.com/ecomfe/reskript/commit/5b828489c2ee96a612f8faecfb18a4d34fb14228))

### Performance Improvements

- **build:** 预处理 antd 和 core-js 的打包 ([0559a6e](https://github.com/ecomfe/reskript/commit/0559a6e42b3c50fc3445cb91224a531c25d9c31d))

# [5.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v4.3.0...v5.0.0-beta.0) (2022-03-03)

### Code Refactoring

- 移除 less-safe-loader ([e38994b](https://github.com/ecomfe/reskript/commit/e38994b637971fc1c4e014fbb38f0a5e407cfe66))

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
- **settings:** 增加一个 customizeMiddlewares 优化配置中间件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([2e458c8](https://github.com/ecomfe/reskript/commit/2e458c8db75d50df9383a7dfc56e9e841461e983))
- 使用 query 引入 worker ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ed5efd4](https://github.com/ecomfe/reskript/commit/ed5efd46a67672b14919b84fa4ea9805afd326c2))
- 实现 Vite 样式相关的配置 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ee7bab0](https://github.com/ecomfe/reskript/commit/ee7bab0c127d153ebc158e41f6be6921e108c619))
- 自动生成入口 HTML 的插件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([a1efd94](https://github.com/ecomfe/reskript/commit/a1efd94d80eda7e5758e7fb1f28c26dc104271d4))

### BREAKING CHANGES

- **build:** `@reskript/webpack-plugin-extra-script`已经废弃，使用`@reskript/plugin-inject-html`替代
- **dev:** `@reskript/config-webpack`和`build.finalize`中的`styleResources`相关的功能已经移除，由内置的 less 插件实现
- **dev:** `$features`改名为`skr.features`，`$build`改名为`skr.build`
- **dev:** 自定义 HTML 模板中，只能使用`templateData.*`获取模板数据
- **dev:** 原入口配置中的`export const html`中，用于模板数据的部分，更新为`export const templateData`
- `@reskript/config-webpack`和`build.finalize`中不再有`lessSafe`
- 要将文件引入为 worker，需要使用`xxx?worker`的形式

# [4.3.0](https://github.com/ecomfe/reskript/compare/v4.2.1...v4.3.0) (2022-03-03)

### Bug Fixes

- **test:** 不要把 d.ts 文件作为可执行文件处理 ([#269](https://github.com/ecomfe/reskript/issues/269)) ([047e6fc](https://github.com/ecomfe/reskript/commit/047e6fc97d9f6534be0b6baa838385c2df560fb8))

### Features

- **settings:** 提供客户端常用类型 ([#270](https://github.com/ecomfe/reskript/issues/270)) ([84994c1](https://github.com/ecomfe/reskript/commit/84994c1cf74c093b72ebde2cf1f05b6637131554))

## [4.2.1](https://github.com/ecomfe/reskript/compare/v4.2.0...v4.2.1) (2022-02-25)

### Bug Fixes

- **core:** 修复 Windows 下异步 import 的问题 ([#265](https://github.com/ecomfe/reskript/issues/265)) ([e8dac12](https://github.com/ecomfe/reskript/commit/e8dac128b2fccaf23804f343f7f22b5a07b273be))

# [4.2.0](https://github.com/ecomfe/reskript/compare/v4.1.2...v4.2.0) (2022-02-25)

### Bug Fixes

- init 的 tsconfig 未包含配置文件 ([#263](https://github.com/ecomfe/reskript/issues/263)) ([d70a8a2](https://github.com/ecomfe/reskript/commit/d70a8a2d3ccb13b69446564eb77e6d67235e3761))
- **plugin-workspace-no-build:** 修复 Windows 下的路径问题 ([#262](https://github.com/ecomfe/reskript/issues/262)) ([96b4968](https://github.com/ecomfe/reskript/commit/96b49684f43491b2ced61fb904554272fdec9f5f))
- 加载.env 文件顺序错误 ([#260](https://github.com/ecomfe/reskript/issues/260)) ([94be01b](https://github.com/ecomfe/reskript/commit/94be01b3a4377cf2f7fe602fb7f6d0b05ecb276b))

### Features

- **babel:** 添加 react 代码性能优化转换 ([#261](https://github.com/ecomfe/reskript/issues/261)) ([38252e6](https://github.com/ecomfe/reskript/commit/38252e67fb20a0352a3417ffc3078b0d52ccabe4))

## [4.1.2](https://github.com/ecomfe/reskript/compare/v4.1.1...v4.1.2) (2022-02-10)

### Bug Fixes

- **build:** 转用 less 插件解决 calc 安全替换的问题 ([#258](https://github.com/ecomfe/reskript/issues/258)) ([bb23c35](https://github.com/ecomfe/reskript/commit/bb23c35e08a4d200c738106d984816079a01ea4d))
- **settings:** 调整配置文件校验逻辑，移除 devServer.https 的 boolean 值 ([#259](https://github.com/ecomfe/reskript/issues/259)) ([b2c2a45](https://github.com/ecomfe/reskript/commit/b2c2a45a928fc6312cd66078f172dd1a9ef15abf))

## [4.1.1](https://github.com/ecomfe/reskript/compare/v4.1.0...v4.1.1) (2022-02-08)

### Bug Fixes

- **init:** 修复 init 因加载 CommonJS 模块无法运行的问题 ([#255](https://github.com/ecomfe/reskript/issues/255)) ([9a15b15](https://github.com/ecomfe/reskript/commit/9a15b15fd28de26739fbb00da5288704fba1c9ea))
- **lint:** 修复 useless-memoized-hooks 问题 ([#252](https://github.com/ecomfe/reskript/issues/252), [#253](https://github.com/ecomfe/reskript/issues/253)) ([06c9156](https://github.com/ecomfe/reskript/commit/06c91567ca1f9d51177666445b50d43e41f5b8f0))

# [4.1.0](https://github.com/ecomfe/reskript/compare/v4.0.1...v4.1.0) (2022-02-07)

### Bug Fixes

- **build:** 修复 webpack 的 alias 里，regenerator 路径错误的问题 ([#251](https://github.com/ecomfe/reskript/issues/251)) ([b828e32](https://github.com/ecomfe/reskript/commit/b828e32348f4dccc2f76f4ea42a4f80022e5ae46))

### Features

- **lint:** 使 hooks-deps-new-line 的换行更加精确 ([#207](https://github.com/ecomfe/reskript/issues/207)) ([ccf7494](https://github.com/ecomfe/reskript/commit/ccf7494256f36baa1c27a10ac4f5aa36c3c60afb))
- **lint:** 添加 useless-memoized-hooks 检查规则 ([#192](https://github.com/ecomfe/reskript/issues/192)) ([28d2eb4](https://github.com/ecomfe/reskript/commit/28d2eb4b2325e753eeb5a9e1dba0a65debe20b11))

## [4.0.1](https://github.com/ecomfe/reskript/compare/v4.0.0...v4.0.1) (2022-02-07)

### Bug Fixes

- **settings:** 调用插件时增加当前命令行的输入参数 ([#247](https://github.com/ecomfe/reskript/issues/247)) ([ca05e41](https://github.com/ecomfe/reskript/commit/ca05e419cb079f2f44a088957dea828134543c99))

# [4.0.0](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.2...v4.0.0) (2022-02-03)

### Features

- 优化 build.finalize 的参数类型 ([#244](https://github.com/ecomfe/reskript/issues/244)) ([4fe2677](https://github.com/ecomfe/reskript/commit/4fe267765d6d63d1021cb2956fc8d5721e2568b6))
- 支持插件配置的值为空值或数组 ([#245](https://github.com/ecomfe/reskript/issues/245)) ([b98c2c8](https://github.com/ecomfe/reskript/commit/b98c2c8df7cd141963690ae53320e2a4ad2e6539))

### BREAKING CHANGES

- `plugins`配置为函数时的`commandName`参数增加了`"play"`的可能性，原版本在使用`skr play`时的该参数值为`"dev"`

# [4.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-02-02)

### Bug Fixes

- **build:** 修复 loader-of-loader 会无视前置 loader 的问题 ([400ee50](https://github.com/ecomfe/reskript/commit/400ee50c691d029d4d6a128454436a7a102f69a8))
- **build:** 把 loader-of-loader 移到 dependencies 中 ([02c0a1d](https://github.com/ecomfe/reskript/commit/02c0a1d4faed9c4130840c02b796ea2011cb7f1a))
- **core:** 修复 resolve 对低版本 Node 的兼容性 ([46334c2](https://github.com/ecomfe/reskript/commit/46334c2df438fb8f5c5d940c05f4de7a279ff82a))

# [4.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2022-02-01)

### Bug Fixes

- **doctor:** 解决 V4 升级检查的部分错误 ([18ec902](https://github.com/ecomfe/reskript/commit/18ec90268880359b7e7e3f9f9083197f113ca996))
- **doctor:** 额外检查配置文件中一些 CommonJS 专用函数和变量的使用 ([341190f](https://github.com/ecomfe/reskript/commit/341190f965b002335c61fb63550a029499c6cbe6))

### Features

- **build:** 支持各个 loader 的 ESM 化 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([d7451e5](https://github.com/ecomfe/reskript/commit/d7451e5fd6c88aed0bcfdd11e807948a824ce2f3))

# [4.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v3.0.6...v4.0.0-beta.0) (2022-01-30)

### Code Refactoring

- 核心部分迁移到纯 ESM 包格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([f9d06b0](https://github.com/ecomfe/reskript/commit/f9d06b0fd802caa002707686d004ca8683f7002f))

### Features

- **build:** 各个插件转为 ESM 格式 ([#39](https://github.com/ecomfe/reskript/issues/39)) ([1950ace](https://github.com/ecomfe/reskript/commit/1950ace8c05d317b855a7f01b4680e54a011d61f))
- **doctor:** 增加 V4 迁移文档和检测 ([fa1e55b](https://github.com/ecomfe/reskript/commit/fa1e55bc7d80c18a33998b36328661b4f1a516a9))
- **init:** init 模板适配新的配置格式 ([#235](https://github.com/ecomfe/reskript/issues/235)) ([6e2601c](https://github.com/ecomfe/reskript/commit/6e2601c893e377717f7ab3132990dd9c6e9ee9e9))
- **play:** 支持 play 的组件配置为 ts 等扩展名 ([#231](https://github.com/ecomfe/reskript/issues/231)) ([ae72706](https://github.com/ecomfe/reskript/commit/ae72706b2c870c8f519cacf88f43075df9a2179d))
- **settings:** 支持且仅支持.mjs 和.ts 类型的项目配置 ([#225](https://github.com/ecomfe/reskript/issues/225)) ([5a9586b](https://github.com/ecomfe/reskript/commit/5a9586b053f16d89a7b87b22dd6a4ca84d96edd2))
- **settings:** 支持异步的 finalize 函数 ([#233](https://github.com/ecomfe/reskript/issues/233)) ([ce84916](https://github.com/ecomfe/reskript/commit/ce84916af43c8cfb5e547788bf5dea0a8786a344))
- **settings:** 支持自定义配置文件路径 ([#230](https://github.com/ecomfe/reskript/issues/230)) ([2a4ca98](https://github.com/ecomfe/reskript/commit/2a4ca987ae7e193916ed8c7972dbcbff521b4863))

### Performance Improvements

- **build:** 异步检索 loader 路径优化性能 ([#234](https://github.com/ecomfe/reskript/issues/234)) ([3ace896](https://github.com/ecomfe/reskript/commit/3ace89660fac60986b5daa9c8a07d9cf4a6248c8))

### BREAKING CHANGES

- **settings:** 配置中的`build.scripts.finalize`调整为异步函数
- **settings:** 配置中的`build.finalize`调整为异步函数
- **settings:** 配置中的`devServer.finalize`调整为异步函数
- **settings:** 配置中的`build.scripts.finalize`的`internals`参数中的`loaders`和`rules`均调整为异步函数
- **settings:** `@reskript/config-webpack`不再导出`loaders`和`rules`，对应为`@reskript/config-webpack/loaders`和`@reskript/config-webpack/rules`
- **settings:** `loaders.postCSS`重命名为`loaders.postcss`
- **settings:** `loaders.postCSSModules`已经移除，功能与`loaders.postcss`完全一致
- **settings:** 项目配置必须为`reskript.config.{mjs|ts}`，且格式为 ESM
- **settings:** 应用入口配置必须为`xxx.config.{mjs|ts}`，且格式为 ESM
- 发布的包为纯 ESM 格式，无法通过 CommonJS 的`require`引入。参考[sinderesorhus 的建议](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## [3.0.6](https://github.com/ecomfe/reskript/compare/v3.0.5...v3.0.6) (2022-01-21)

### Bug Fixes

- **init:** 解决 init 时复制文件路径错误的问题 ([#239](https://github.com/ecomfe/reskript/issues/239)) ([3cfa54e](https://github.com/ecomfe/reskript/commit/3cfa54e521c944dd79c44181f841e5213e57ccb4))

## [3.0.5](https://github.com/ecomfe/reskript/compare/v3.0.4...v3.0.5) (2022-01-21)

### Bug Fixes

- **core:** 使用 fs.stat 判断文件和目录 ([#241](https://github.com/ecomfe/reskript/issues/241)) ([7f18310](https://github.com/ecomfe/reskript/commit/7f183103c320b9cccbaea8c79daa985f962af265))
- **core:** 修复 globby 在 Windows 下跨盘使用的问题 ([#239](https://github.com/ecomfe/reskript/issues/239)) ([c59ccf2](https://github.com/ecomfe/reskript/commit/c59ccf25fa97f129c3a3686e7450453ecff7eead))

## [3.0.4](https://github.com/ecomfe/reskript/compare/v3.0.3...v3.0.4) (2022-01-20)

### Bug Fixes

- **core:** 修复 globby 的 safe 参数默认值处理问题 ([#239](https://github.com/ecomfe/reskript/issues/239)) ([2c12f57](https://github.com/ecomfe/reskript/commit/2c12f573209e8c409fff35a39420da97265f873d))

## [3.0.3](https://github.com/ecomfe/reskript/compare/v3.0.2...v3.0.3) (2022-01-20)

### Bug Fixes

- **build:** 在 svg 生成组件后经过 babel 处理 ([#237](https://github.com/ecomfe/reskript/issues/237)) ([5ea17c3](https://github.com/ecomfe/reskript/commit/5ea17c380440e91e73584a9c871bbedb8d430e33))
- **core:** 所有 globby 调用兼容 Windows 系统 ([#239](https://github.com/ecomfe/reskript/issues/239)) ([ae4c142](https://github.com/ecomfe/reskript/commit/ae4c142c39a2932a00f41e0b41abbde011044c6c))
- **lint:** 样式文件的 lint 问题可以被自动修复 ([#232](https://github.com/ecomfe/reskript/issues/232)) ([a154f31](https://github.com/ecomfe/reskript/commit/a154f317d519e366b875534639c13a7b3306f4e9))

## [3.0.2](https://github.com/ecomfe/reskript/compare/v3.0.1...v3.0.2) (2022-01-13)

### Bug Fixes

- **dev:** 修复无法在编辑器打开组件文件的问题 ([#229](https://github.com/ecomfe/reskript/issues/229)) ([d875199](https://github.com/ecomfe/reskript/commit/d875199b7c7c806487431d1a7ae5efc5380c430e))

## [3.0.1](https://github.com/ecomfe/reskript/compare/v3.0.0...v3.0.1) (2022-01-04)

### Bug Fixes

- **doctor:** 迁移 V3 的检查包含对配置文件的检查 ([#226](https://github.com/ecomfe/reskript/issues/226)) ([0d97d20](https://github.com/ecomfe/reskript/commit/0d97d207723b90cf45df84daff23a5a31eb3614d))

# [3.0.0](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.1...v3.0.0) (2022-01-03)

**Note:** Version bump only for package reskript

# [3.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2022-01-03)

### Bug Fixes

- **doctor:** 修复 migrate 命令 ([b9f0ba7](https://github.com/ecomfe/reskript/commit/b9f0ba79f575a3fd8ba093120095cea3782e8f92))

### Features

- **init:** init 命令支持 V3 版本 ([45e6929](https://github.com/ecomfe/reskript/commit/45e692954fe52202b42495b3ed3c5c0288571934))

# [3.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v2.5.3...v3.0.0-beta.0) (2022-01-03)

### Bug Fixes

- **lint:** 移除 Sentry 全局变量 ([b30dcb0](https://github.com/ecomfe/reskript/commit/b30dcb082e16de49aff513e5965df1014e161dd0))

### Features

- **cli:** 要求 NodeJS 版本为 14.18.0 ([#209](https://github.com/ecomfe/reskript/issues/209)) ([ad44a36](https://github.com/ecomfe/reskript/commit/ad44a3646df93b645cb7cb6f5a3c5614f13e2a16))
- **dev:** 废弃 https 配置的 boolean 值 ([#223](https://github.com/ecomfe/reskript/issues/223)) ([ed58ffb](https://github.com/ecomfe/reskript/commit/ed58ffb93ed1621522c4bec98191d5dc308eadea))
- **doctor:** 更新 migrate 支持 V3 ([49f3098](https://github.com/ecomfe/reskript/commit/49f30987f7f475fc8ded557f4a82b28e3cbab1fa))
- 支持 eslint 8 ([#176](https://github.com/ecomfe/reskript/issues/176)) ([76acae3](https://github.com/ecomfe/reskript/commit/76acae373762da03b2208088908d7a0022bb0536))
- 支持 stylelint 14 ([#186](https://github.com/ecomfe/reskript/issues/186)) ([05e24c0](https://github.com/ecomfe/reskript/commit/05e24c0e8f004e7c342c138e00d1b73724545aa3))

### BREAKING CHANGES

- **cli:** 需要 NodeJS 版本 14.18.0 以上
- **lint:** `lint`不再默认配置`Sentry`全局变量，需要用户自行配置
- **dev:** `devServer.https: true`已经废弃，使用`devServer.https: {proxy: true}`代替
- 需要`eslint`升级至`8.x`
- 需要`stylelint`升级至`14.x`

## [2.5.3](https://github.com/ecomfe/reskript/compare/v2.5.2...v2.5.3) (2021-12-31)

### Bug Fixes

- **babel:** cli-babel 禁用客户端的 babel 配置 ([#224](https://github.com/ecomfe/reskript/issues/224)) ([3c2265b](https://github.com/ecomfe/reskript/commit/3c2265bed7c2c8df6dd41fa2d8b1709c0dd829d2))

## [2.5.2](https://github.com/ecomfe/reskript/compare/v2.5.1...v2.5.2) (2021-12-29)

### Bug Fixes

- **babel:** 处理 useComponentFileName 对 class 的边界情况 ([#221](https://github.com/ecomfe/reskript/issues/221)) ([1ed84cb](https://github.com/ecomfe/reskript/commit/1ed84cb88d24d0f85b5cb404c5bf3d56227335bb))

## [2.5.1](https://github.com/ecomfe/reskript/compare/v2.5.0...v2.5.1) (2021-12-28)

### Bug Fixes

- **build:** 支持 import 的时候使用.js 但指向.ts 或.tsx ([#219](https://github.com/ecomfe/reskript/issues/219)) ([4bad498](https://github.com/ecomfe/reskript/commit/4bad49865cd55aa44e5bf41e72436ec91284c822))
- **build:** 支持项目使用纯 ESM 格式，配置文件使用 cjs ([#218](https://github.com/ecomfe/reskript/issues/218)) ([2646bac](https://github.com/ecomfe/reskript/commit/2646bac2f50e1ff52a0a7a4b088a7b282d6cf614))

# [2.5.0](https://github.com/ecomfe/reskript/compare/v2.4.0...v2.5.0) (2021-12-25)

### Bug Fixes

- **build:** babel-loader 不读取项目中的 babel 配置 ([#212](https://github.com/ecomfe/reskript/issues/212)) ([b9ea9a3](https://github.com/ecomfe/reskript/commit/b9ea9a3dd1f3b40b26ff40963b1b7e97a2a7617a))
- **build:** 在 build 时也同样读用户自定义的 lint 配置 ([#211](https://github.com/ecomfe/reskript/issues/211)) ([e580bce](https://github.com/ecomfe/reskript/commit/e580bce69a0d1a7f2714409d9611a50688020291))
- **build:** 处理 SVG 时转换 class 到 className ([#216](https://github.com/ecomfe/reskript/issues/216)) ([37e7a4b](https://github.com/ecomfe/reskript/commit/37e7a4baadb54320b826423ac33354a10220f488))

### Features

- **dev:** 支持 HTTPS 协议启动调试服务器 ([#217](https://github.com/ecomfe/reskript/issues/217)) ([4646f77](https://github.com/ecomfe/reskript/commit/4646f77e30dd28f8e3f6b408ef81f325dcf1fd37))

# [2.4.0](https://github.com/ecomfe/reskript/compare/v2.3.0...v2.4.0) (2021-12-14)

### Bug Fixes

- **build:** 对 less 的 calc 处理采用更严格的规则 ([#208](https://github.com/ecomfe/reskript/issues/208)) ([67fbbe9](https://github.com/ecomfe/reskript/commit/67fbbe96d85a10fd590d91bbd8e6141e36305ed2))
- **init:** 指定 dir 时，安装在运行目录而不是 dir ([fa56e01](https://github.com/ecomfe/reskript/commit/fa56e017598615343668c00c168e746972091fb9))
- **lint:** 有自定义 eslint 配置时禁用内部配置 ([#203](https://github.com/ecomfe/reskript/issues/203)) ([9558d03](https://github.com/ecomfe/reskript/commit/9558d03afa3b190b9787667063a27371243c148c))
- **play:** 文件名超长时的样式问题 ([#194](https://github.com/ecomfe/reskript/issues/194)) ([992b9e5](https://github.com/ecomfe/reskript/commit/992b9e57698cb982341565b7fdb652a15f38824e))
- **plugin-qiankun:** qiankun 模式侧边栏添加最小高度 & 子应用页面内容过宽撑开父容器 ([9042a22](https://github.com/ecomfe/reskript/commit/9042a22899fb19bcf33cdc926411e7443c58748f))

### Features

- **build:** 引入 psotcss-preset-env ([#204](https://github.com/ecomfe/reskript/issues/204)) ([f910249](https://github.com/ecomfe/reskript/commit/f9102496978c2fbaf2049c18cc0a5250b03daba1))
- **dev:** 支持组件源码文件调用编辑器打开 ([#201](https://github.com/ecomfe/reskript/issues/201)) ([bd743a6](https://github.com/ecomfe/reskript/commit/bd743a690990f20bd0f8b0edb5da949b82a92adc))

# [2.3.0](https://github.com/ecomfe/reskript/compare/v2.2.2...v2.3.0) (2021-11-04)

### Bug Fixes

- **build:** 修复 emotion 插件在 production 环境下丢失样式的问题 ([#187](https://github.com/ecomfe/reskript/issues/187)) ([1635511](https://github.com/ecomfe/reskript/commit/1635511937df849b8acb7538c58990b52b90c1a8))
- **build:** 读取.env 顺序修复 ([#174](https://github.com/ecomfe/reskript/issues/174)) ([132f01f](https://github.com/ecomfe/reskript/commit/132f01f9166f96e2046b935ee08132e15444ee51))
- **deps:** 解决各种 peer 依赖的问题 ([#190](https://github.com/ecomfe/reskript/issues/190)) ([6821454](https://github.com/ecomfe/reskript/commit/6821454217d9888c02b6f7b65f9d5e9666688244))
- **init:** apply .gitignore to initialized package ([#170](https://github.com/ecomfe/reskript/issues/170)) ([40aefcd](https://github.com/ecomfe/reskript/commit/40aefcd4d3c11fbbf318b4b331d615b23c70b2f1))
- **init:** 初始化时限制 eslint 版本为 7.x ([#182](https://github.com/ecomfe/reskript/issues/182)) ([c697b8b](https://github.com/ecomfe/reskript/commit/c697b8bd8bc889f4382b07a1d5f9852817669427))
- **init:** 把 styelint 版本固定在 13.x ([#186](https://github.com/ecomfe/reskript/issues/186)) ([3a63a92](https://github.com/ecomfe/reskript/commit/3a63a9254deba1a3eaa3a641f6c7449f4e9f473a))
- **test:** 测试时提供.target 常量 ([#188](https://github.com/ecomfe/reskript/issues/188)) ([2d037ab](https://github.com/ecomfe/reskript/commit/2d037abb3dde4fe81fe78c59edf3d68169a24e53))

### Features

- **init:** 支持启用调试模式看到依赖安装过程 ([#189](https://github.com/ecomfe/reskript/issues/189)) ([afedc99](https://github.com/ecomfe/reskript/commit/afedc99718c01c6dc959c40fb1250b79b0a7ad7e))
- **lint:** 添加 spell-check 检查规则 ([#181](https://github.com/ecomfe/reskript/issues/181)) ([efb3458](https://github.com/ecomfe/reskript/commit/efb345823afa46dcab1c6054567bb26db464e1b2))
- **play:** 前置增加用例管理服务状态检测 ([#178](https://github.com/ecomfe/reskript/issues/178)) ([25f6256](https://github.com/ecomfe/reskript/commit/25f625675d8727de9a0c3a62d8fe2449aee96acd))
- 支持在修复代码风格后自动 add 文件 ([#177](https://github.com/ecomfe/reskript/issues/177)) ([27b423f](https://github.com/ecomfe/reskript/commit/27b423f4becff5391a3a1f5054317049f3c34bc5))

## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)

### Bug Fixes

- **test:** 对 node 环境的测试也加上第三方 ESM 模块的处理 ([#168](https://github.com/ecomfe/reskript/issues/168)) ([50ada53](https://github.com/ecomfe/reskript/commit/50ada532c0a74c1c09f283585eca8803fdda9f1c))

## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)

### Bug Fixes

- **test:** 让 jest 可以 mock 从 svg 导入的组件 ([#167](https://github.com/ecomfe/reskript/issues/167)) ([1772ac1](https://github.com/ecomfe/reskript/commit/1772ac1cd843bb2e424869c71d770a28cf96fb63))

# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)

### Bug Fixes

- **build:** 为 postcss 指定具体实现 ([#165](https://github.com/ecomfe/reskript/issues/165)) ([8c06339](https://github.com/ecomfe/reskript/commit/8c063393d1b247a2575a05d1470ac07a35646392))
- **build:** 使生成的 HTML 方便被各种编辑器格式化后排查问题 ([#164](https://github.com/ecomfe/reskript/issues/164)) ([41f90e1](https://github.com/ecomfe/reskript/commit/41f90e1dcbef2d18f5cd491e2896d3a8c3983ce1))
- **build:** 修复 strict 模式设置 require 相关配置相反的问题 ([#161](https://github.com/ecomfe/reskript/issues/161)) ([92dab1b](https://github.com/ecomfe/reskript/commit/92dab1b521e661dbf1ea289842ddd63f574b3e6e))
- **test:** 非 react 测试也共享路径别名等配置 ([#162](https://github.com/ecomfe/reskript/issues/162)) ([8e893ec](https://github.com/ecomfe/reskript/commit/8e893ecfbc009b41f23f563ecddbdf712016fc9c))

### Features

- **build:** 增加一个产出检查项，确保产出的 HTML 适用于微前端 ([#163](https://github.com/ecomfe/reskript/issues/163)) ([5f6b252](https://github.com/ecomfe/reskript/commit/5f6b2524d89f8787c7a45ae4765928bc41535ef4))
- **cli:** 增加调试输出 ([#166](https://github.com/ecomfe/reskript/issues/166)) ([ca78e43](https://github.com/ecomfe/reskript/commit/ca78e438e6f667c76cd2fa63194a93c4ccac167d))

# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)

### Bug Fixes

- **build:** 把 SVG 转为组件时保留 ref ([#159](https://github.com/ecomfe/reskript/issues/159)) ([863f582](https://github.com/ecomfe/reskript/commit/863f58254eb8bc3ee1e04eb04187b5381f570b5f))
- **doctor:** 加载入口配置时未转换成绝对路径 ([#157](https://github.com/ecomfe/reskript/issues/157)) ([fc689fa](https://github.com/ecomfe/reskript/commit/fc689fa0f11f0457486c8ace00143e064ff5e22c))

### Features

- **dev:** 增加--no-open 参数禁用打开浏览器功能 ([#160](https://github.com/ecomfe/reskript/issues/160)) ([525f69a](https://github.com/ecomfe/reskript/commit/525f69ab3408c739a3ff67590ae9867489e169db))

# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)

### Features

- **build:** 在严格模式下增加类型检查 ([#147](https://github.com/ecomfe/reskript/issues/147)) ([a2d293f](https://github.com/ecomfe/reskript/commit/a2d293f69a60aaf7e672de66f88014fc13b6748d))

# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)

### Bug Fixes

- **cli:** 找 CLI 包的时候要从项目的目录开始找 ([#155](https://github.com/ecomfe/reskript/issues/155)) ([6697418](https://github.com/ecomfe/reskript/commit/66974182ab6838a8f6c01a0a9ec148345bda1dc1))
- **deps:** 几个 CLI 包增加对 core-js 的 peer 依赖 ([#154](https://github.com/ecomfe/reskript/issues/154)) ([fc6f8a1](https://github.com/ecomfe/reskript/commit/fc6f8a172954574a83792cd7d7fce7a3261a3240))

### Features

- **doctor:** 增加 V2 版本迁移的自动化检测 ([#151](https://github.com/ecomfe/reskript/issues/151)) ([650e343](https://github.com/ecomfe/reskript/commit/650e343f1c03f227b0ae439b11f347fdecd3c3e6))

# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)

### Bug Fixes

- **build:** 修复读取入口配置时的逻辑错误 ([#149](https://github.com/ecomfe/reskript/issues/149)) ([0ce0026](https://github.com/ecomfe/reskript/commit/0ce00269216bb5c419467ad7b91ff2f40e295f39))
- **dev:** 美化一下进度条 ([#148](https://github.com/ecomfe/reskript/issues/148)) ([7c064bb](https://github.com/ecomfe/reskript/commit/7c064bb6a8370d6804519be90640f3d1a75975f7))
- **play:** 不应该让 cli-play 直接依赖 react ([#152](https://github.com/ecomfe/reskript/issues/152)) ([0fa7bcf](https://github.com/ecomfe/reskript/commit/0fa7bcf78053544c3aecc2b3921a9d94ca5faf63))
- **test:** 修复读取用户的 jest.config.js 逻辑错误 ([#149](https://github.com/ecomfe/reskript/issues/149)) ([15c029c](https://github.com/ecomfe/reskript/commit/15c029c1161fe03884225181d92390b33d2ded3e))

### Features

- **build:** 读取入口配置文件时增加校验 ([#150](https://github.com/ecomfe/reskript/issues/150)) ([fb24371](https://github.com/ecomfe/reskript/commit/fb2437133027b5750c60b313f2216f0cf7e4ab6b))

# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)

### Bug Fixes

- **cli:** 只在对应的 CLI 包不存在时才自动安装，其它错误情况报错退出 ([#146](https://github.com/ecomfe/reskript/issues/146)) ([fdfd44a](https://github.com/ecomfe/reskript/commit/fdfd44a76047de4512d091d80c371e73e4712db3))
- **play:** 修复一些接口没有异步调用的问题 ([#145](https://github.com/ecomfe/reskript/issues/145)) ([5fd503a](https://github.com/ecomfe/reskript/commit/5fd503a414bc19d6e1a704e8da74731a0b9138e2))
- **play:** 在 play 命令启动时增加是否安装 core-js 的检测 ([#144](https://github.com/ecomfe/reskript/issues/144)) ([7ad0678](https://github.com/ecomfe/reskript/commit/7ad067804041c459ad6caeedc52ba47fda5214e5))
- **test:** 在 test 命令启动时增加是否安装 core-js 的检测 ([#144](https://github.com/ecomfe/reskript/issues/144)) ([4528b60](https://github.com/ecomfe/reskript/commit/4528b6009fec19ff45841d4b868dc13e9c0568f5))

# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)

### Bug Fixes

- **build:** 修复对 husky 钩子检测的逻辑错误 ([#141](https://github.com/ecomfe/reskript/issues/141)) ([8b67c48](https://github.com/ecomfe/reskript/commit/8b67c4842e27bf5e54fb50cfebc9e2d5591a6d40))
- **dev:** 只在编译错误时显示客户端的浮层提示 ([#140](https://github.com/ecomfe/reskript/issues/140)) ([bee529a](https://github.com/ecomfe/reskript/commit/bee529a46803bc83a23897ae631768df6e82090d))

### Features

- **build:** 增加一些供插件开发者使用的类型 ([#142](https://github.com/ecomfe/reskript/issues/142)) ([1efd6a0](https://github.com/ecomfe/reskript/commit/1efd6a0899ceb594b15cf5462f33dac89b5220b1))

# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)

### Bug Fixes

- 推荐用户使用固定版本安装，并保持版本一致 ([#138](https://github.com/ecomfe/reskript/issues/138)) ([61f8ec6](https://github.com/ecomfe/reskript/commit/61f8ec635e5f22f9efd6dcfca5beb6a15e6567b1))

- feat(dev)!: 支持 webpack-dev-server 4 版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
- feat(build)!: 废弃旧版本的入口配置文件格式 (#80) ([41ac823](https://github.com/ecomfe/reskript/commit/41ac823fa6ae482fea339c2f5e000e4a2fb83be3)), closes [#80](https://github.com/ecomfe/reskript/issues/80)
- fix(build)!: 由用户自行安装 core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)
- feat(test)!: 支持透传参数到 jest (#127) ([b4c4820](https://github.com/ecomfe/reskript/commit/b4c4820622c1a90d724f4e2b8e2142b69bda4ca8)), closes [#127](https://github.com/ecomfe/reskript/issues/127)
- feat!: 对外暴露的 API 转为异步 (#130) ([f423d55](https://github.com/ecomfe/reskript/commit/f423d55efc890abd54e8958d4005c0285c91252d)), closes [#130](https://github.com/ecomfe/reskript/issues/130)
- feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)

### Features

- **build:** 增加严格模式开关 ([#54](https://github.com/ecomfe/reskript/issues/54)) ([3e00afc](https://github.com/ecomfe/reskript/commit/3e00afc503371412a30260c5a836935b47b7eb60))
- 支持 tailwind ([#119](https://github.com/ecomfe/reskript/issues/119)) ([d636c80](https://github.com/ecomfe/reskript/commit/d636c804ddfbaae00674682a86cec5ec32ff9265))
- 支持自动安装缺失的命令行包 ([#139](https://github.com/ecomfe/reskript/issues/139)) ([1c54433](https://github.com/ecomfe/reskript/commit/1c54433830bf3af371c35c4ad087ceb7aa90ee0d))

### BREAKING CHANGES

- `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
- `devServer.hot`的类型修改为`boolean`
- `config-babel`的`hot`配置类型修改为`boolean`
- 入口配置`entries/xxx.config.js`必须符合新格式，仅支持`entry`和`html`两个导出，原有配置均放进`html`中
- 不再处理`core-js`的引入，用户必须在项目中自行安装`core-js@3`
- 所有 jest 的参数必须在`skr test --`之后传递
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

### Bug Fixes

- **build:** 处理 SVG 文件时把属性转成 camelCase ([#136](https://github.com/ecomfe/reskript/issues/136)) ([4bf68e1](https://github.com/ecomfe/reskript/commit/4bf68e17f6fce4cd7974c5a134cb105906fc5167))
- **eslint-plugin:** 支持原生模块的子模块的优先级判断 ([#135](https://github.com/ecomfe/reskript/issues/135)) ([b7dd304](https://github.com/ecomfe/reskript/commit/b7dd304d6f5f48f259f9b07d2d3a5cca78b5149a))
- **play:** 删除源码中多出来的 dist 文件 ([31d7375](https://github.com/ecomfe/reskript/commit/31d7375258e2faa87fbce97b7af26d418ac7003c))

## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)

### Bug Fixes

- **plugin-workspace-no-build:** 放宽一些对版本范围的检查 ([#129](https://github.com/ecomfe/reskript/issues/129)) ([0384184](https://github.com/ecomfe/reskript/commit/0384184a648a0e31d59af2d3a6480e8b46bb1089))

# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)

### Bug Fixes

- **plugin-workspace-no-build:** 提示入口包安装的依赖版本不兼容子包的要求 ([#121](https://github.com/ecomfe/reskript/issues/121)) ([9b232e8](https://github.com/ecomfe/reskript/commit/9b232e85230d989927f0160d73189394f3072f0e))
- **plugin-workspace-no-build:** 添加邻居包依赖只处理被主包声明的那部分 ([#125](https://github.com/ecomfe/reskript/issues/125)) ([f145679](https://github.com/ecomfe/reskript/commit/f14567951aeb54ed910bc62ab64b2a591f98200d))

### Features

- **flags:** 支持 SKR_FLAGS 设置遇到废弃配置直接退出 ([#124](https://github.com/ecomfe/reskript/issues/124)) ([7f2658a](https://github.com/ecomfe/reskript/commit/7f2658a890a1f714d1a003aeff44dcd446d447b1))
- **play:** 支持全局的组件调试配置 ([#120](https://github.com/ecomfe/reskript/issues/120)) ([4c4f068](https://github.com/ecomfe/reskript/commit/4c4f068ef6e58744d889823c379e10ced02e22a8))
- **play:** 让 play 支持 React 18 和并发模式 ([#122](https://github.com/ecomfe/reskript/issues/122)) ([31ec53e](https://github.com/ecomfe/reskript/commit/31ec53e502f3c85357ade52d78cc493d66145cd9))
- **test:** 支持--maxWorkers 参数 ([#126](https://github.com/ecomfe/reskript/issues/126)) ([da406f4](https://github.com/ecomfe/reskript/commit/da406f44242a5c5ac1a59748b7325648a00c8157))

## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)

### Bug Fixes

- **build:** 修复 svg-mixed-loader 在 Windows 系统下的路径问题 ([#114](https://github.com/ecomfe/reskript/issues/114)) ([05cc19c](https://github.com/ecomfe/reskript/commit/05cc19c358972cab8bc80afb4f7de70b98cbc130))
- **init:** 导入 SVG 组件的类型声明优化 ([#117](https://github.com/ecomfe/reskript/issues/117)) ([cbd5981](https://github.com/ecomfe/reskript/commit/cbd598169260ecbeb6ac827b2f2efe91eb7edb20))
- **init:** 异步执行命令的顺序错误 ([#116](https://github.com/ecomfe/reskript/issues/116)) ([d509352](https://github.com/ecomfe/reskript/commit/d509352053d5a9d47cc8c37a8838f57ce9408c62))
- **plugin-workspace-no-build:** 自动处理业务模块的 peer 依赖 ([#118](https://github.com/ecomfe/reskript/issues/118)) ([875c9c9](https://github.com/ecomfe/reskript/commit/875c9c97995a0cb57857b4f526a555b37c2de992))
- **test:** 处理第三方包的 ESM 在 jest 中无法解析的问题 ([#115](https://github.com/ecomfe/reskript/issues/115)) ([75d6470](https://github.com/ecomfe/reskript/commit/75d64708799b5bfcf932e88944eaa7f1d5425e85))

## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)

### Bug Fixes

- **build:** 在 SVG 转成组件时要接受 props ([#113](https://github.com/ecomfe/reskript/issues/113)) ([dd594be](https://github.com/ecomfe/reskript/commit/dd594be07c9bc6a3e4549c9f4839318b5e4cd6c1))

# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)

### Bug Fixes

- **build:** 解析 svg 时处理 XML 编码信息部分 ([#112](https://github.com/ecomfe/reskript/issues/112)) ([70ceef2](https://github.com/ecomfe/reskript/commit/70ceef2e71bde4cf5040c063131f98bd6d052110))
- **play:** 升级 monaco-editor 兼容 play 的版本 ([#111](https://github.com/ecomfe/reskript/issues/111)) ([77fd26e](https://github.com/ecomfe/reskript/commit/77fd26ee787f3c4bcfacf1ccb26b6c595f93d073))

### Features

- **lint:** import-order 规则支持检查本地的包名 ([#110](https://github.com/ecomfe/reskript/issues/110)) ([050084d](https://github.com/ecomfe/reskript/commit/050084da970b475fcc5450c3b57c5f5aa76f29ee))

## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)

### Bug Fixes

- **play:** 在 PlayGround 使用新的方式引入 SVG 图标 ([#108](https://github.com/ecomfe/reskript/issues/108)) ([28d10bc](https://github.com/ecomfe/reskript/commit/28d10bcd88504091905b276781fbf9c0ab74ab3c))
- **play:** 在 play 中开启 StrictMode ([#109](https://github.com/ecomfe/reskript/issues/109)) ([28c8464](https://github.com/ecomfe/reskript/commit/28c8464bd6dcb33c7e13e6bdf33a812458354704))

# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)

### Features

- **babel:** 增加对 reflect-metadata 的支持 ([#106](https://github.com/ecomfe/reskript/issues/106)) ([8d0f36b](https://github.com/ecomfe/reskript/commit/8d0f36b7957a0a7efd9ded92b4b6a259ddeb984d))
- **build:** 调整对 svg 文件的导入规则 ([#105](https://github.com/ecomfe/reskript/issues/105)) ([be7accc](https://github.com/ecomfe/reskript/commit/be7accc50f0a1fdb6698622ad110fd0cacb515cc))

## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)

### Bug Fixes

- **config-jest:** 修复生成的配置对 jest-raw-loader 引用路径错误 ([7e163cb](https://github.com/ecomfe/reskript/commit/7e163cb147bfa30263a65ebadf2f266d8bea5563))

## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)

### Bug Fixes

- **babel:** babel-utils 少了个依赖 ([477a159](https://github.com/ecomfe/reskript/commit/477a159f763261533d91c0acc813d42f012289ac))
- **lint:** 修复在 monorepo 下检查已更改文件的逻辑 ([#104](https://github.com/ecomfe/reskript/issues/104)) ([ee035c7](https://github.com/ecomfe/reskript/commit/ee035c76ca299548c966344c7a84e1b56dc02c24))

# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)

### Features

- **plugin-qiankun:** 支持只处理 build，不拦截调试服务器 ([#102](https://github.com/ecomfe/reskript/issues/102)) ([18c54e3](https://github.com/ecomfe/reskript/commit/18c54e3b4562ab84ef55e59ed2cd5702c79905b5))
- **plugin-workspace-no-build:** 一个能在 monorepo 下直接依赖其它子包的源码的插件 ([#103](https://github.com/ecomfe/reskript/issues/103)) ([81ab9e1](https://github.com/ecomfe/reskript/commit/81ab9e12c49661907362587f92b5fdf7f780d9f5))

## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)

### Bug Fixes

- **build:** 用 asset module 代替 url-loader ([#101](https://github.com/ecomfe/reskript/issues/101)) ([e40aeb7](https://github.com/ecomfe/reskript/commit/e40aeb74ab6127bdfe4a0bcabb0f692514c2bc60))

## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)

### Bug Fixes

- **play:** 格式化时间逻辑错误 ([73e4893](https://github.com/ecomfe/reskript/commit/73e4893773fd6bc3cab71dcda65babb545823db7))

# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)

### Features

- **build:** 管理和读取各类.env 文件 ([#74](https://github.com/ecomfe/reskript/issues/74)) ([83c9699](https://github.com/ecomfe/reskript/commit/83c96994c4cb5eb98978345f109c03f3901cefd2))
- **play:** 支持--host 参数指定打开页面的主机名 ([#100](https://github.com/ecomfe/reskript/issues/100)) ([86b9b82](https://github.com/ecomfe/reskript/commit/86b9b82ffd3d333388d34d31e2af5ab1bb7c6630))
- **play:** 支持自定义端口 ([#99](https://github.com/ecomfe/reskript/issues/99)) ([ba1def2](https://github.com/ecomfe/reskript/commit/ba1def2ed35fe04b74c1fc6c8697e1ff3fcd37ff))

### Performance Improvements

- **babel:** 优化对 import 语句的处理的性能 ([bc8e0dc](https://github.com/ecomfe/reskript/commit/bc8e0dc3c7fcee555a664b5168cc30683e421f19))

## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)

### Bug Fixes

- **babel:** 对组件函数的检测使用更严格的模式 ([#97](https://github.com/ecomfe/reskript/issues/97)) ([61fc2df](https://github.com/ecomfe/reskript/commit/61fc2df685eb3ad628592cbc0c0e1252def4de7d))
- **babel:** 插入 useComponentFile 时需要是一个完整的语句 ([#97](https://github.com/ecomfe/reskript/issues/97)) ([0ab65e1](https://github.com/ecomfe/reskript/commit/0ab65e1b1a5354c0d70ef4483f92ff792fd82a6b))

## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)

### Bug Fixes

- **babel:** 调整 babel 插件的顺序避免代码转换出错 ([#97](https://github.com/ecomfe/reskript/issues/97)) ([f9d6f97](https://github.com/ecomfe/reskript/commit/f9d6f979da88fe75f0029b519e416b090cb85f73))
- **lint:** 支持自定义的 stylelint 配置 ([#96](https://github.com/ecomfe/reskript/issues/96)) ([c7f6726](https://github.com/ecomfe/reskript/commit/c7f67264224dadb69da745c8a4eca44c5f089007))

## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)

### Bug Fixes

- **babel:** useComponentFile 的引用路径错误 ([890a13a](https://github.com/ecomfe/reskript/commit/890a13a3beb140d4691de85079a69f84fc43bd4c))

# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)

### Bug Fixes

- **build:** 简化组件 displayName 的处理，只处理函数定义 ([#92](https://github.com/ecomfe/reskript/issues/92)) ([13fdb28](https://github.com/ecomfe/reskript/commit/13fdb283d68f35dc2504503f0fdc9245a3227aff))
- **build:** 缓存标识增加 pnpm-lock 的内容 ([9214254](https://github.com/ecomfe/reskript/commit/9214254b3c5141afbf3e84e7d225a9b72fce1208))
- **init:** 修复 install 过程中 spinner 卡住的 bug ([0cc59d7](https://github.com/ecomfe/reskript/commit/0cc59d7e0e6d64cbabb2ae624b8abf404ea12c30))
- **play:** 使用 play.wrapper 配置时显示警告 ([#87](https://github.com/ecomfe/reskript/issues/87)) ([8cfe3f2](https://github.com/ecomfe/reskript/commit/8cfe3f25944a2289ffbf6595a69784f70d33f42f))

### Features

- **dev:** 增加一个 babel 插件为 React 组件注入对应源码路径 ([#91](https://github.com/ecomfe/reskript/issues/91)) ([fb0132d](https://github.com/ecomfe/reskript/commit/fb0132d31dc83128b8373da7b38ca0c3d32b4a9c))
- **play:** 在选择用例时更新用例的最后执行时间 ([#89](https://github.com/ecomfe/reskript/issues/89)) ([15b2513](https://github.com/ecomfe/reskript/commit/15b251390eb0aa282174d0109deaf22922745f4d))
- **play:** 支持显示用例说明和帮助信息 ([#88](https://github.com/ecomfe/reskript/issues/88)) ([6484c77](https://github.com/ecomfe/reskript/commit/6484c77b470c2eb1ebe8f16a8d5974b55b661320))
- **test:** 允许 jest 识别一部分纯文本文件 ([ea9e475](https://github.com/ecomfe/reskript/commit/ea9e475735d9eea6c50aacd9061c6add6f48e2cc))

# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)

### Bug Fixes

- 文档尽可能兼容 Github Pages 的展示逻辑 ([#83](https://github.com/ecomfe/reskript/issues/83)) ([bb8bc86](https://github.com/ecomfe/reskript/commit/bb8bc86dcdb61e2c786c0121bce8e440e21120d9))

### Features

- **build:** 支持指定 cache 目录 ([#84](https://github.com/ecomfe/reskript/issues/84)) ([000efd1](https://github.com/ecomfe/reskript/commit/000efd1ee4b3f03c0d714513c9f21cf2da7b3960))
- **play:** 使用 WebSocket 实时推送用例文件的修改 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([fa2990b](https://github.com/ecomfe/reskript/commit/fa2990b04bb1f38f9c0aed3429baba03ae7c5576))
- **play:** 支持将调试中的代码保存为用例 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([429d0a6](https://github.com/ecomfe/reskript/commit/429d0a66f13a9b61850ea6a295149cc4d149bdd3))
- **play:** 支持自定义调试用例 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([8021d98](https://github.com/ecomfe/reskript/commit/8021d9824149163144105242fa265e259cd7ffad))
- **play:** 支持调试组件时自定义配置关联依赖注入和自定义布局 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([44d82c6](https://github.com/ecomfe/reskript/commit/44d82c6e564563f435327f926aa28c9e84256999))
- **play:** 更新当前用例功能 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([cfda004](https://github.com/ecomfe/reskript/commit/cfda004103384728a4e6c9e215497585ae631550))

# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)

### Bug Fixes

- **init:** 向初始化允许存在的文件白名单添加.git 目录 ([acc8d59](https://github.com/ecomfe/reskript/commit/acc8d59f4c02b47d4373e439668ab2657aefe678))

### Features

- **build:** 为 build.finalize 提供内置的 loader ([#70](https://github.com/ecomfe/reskript/issues/70)) ([8fc92dc](https://github.com/ecomfe/reskript/commit/8fc92dcb30603873474183d4e45af93133e4a66d))
- **build:** 增加配置支持使用方选择性引入第三方库的专项优化 ([#79](https://github.com/ecomfe/reskript/issues/79)) ([f8ea13d](https://github.com/ecomfe/reskript/commit/f8ea13d2c16b11dae1a42d78cfa98d097350ef56))
- **build:** 支持 emotion 管理样式 ([#78](https://github.com/ecomfe/reskript/issues/78)) ([e13e9a5](https://github.com/ecomfe/reskript/commit/e13e9a5a4c323c8690be674523041d4a607df9f8))
- **plugin-sass:** 增加处理 SASS 样式的插件 ([4859f99](https://github.com/ecomfe/reskript/commit/4859f99a7e1d2cefe8e63ae147e4d970cb20b8e0))

## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)

### Bug Fixes

- **lint:** 对 lint 结果通过与否的判断写反了 ([#71](https://github.com/ecomfe/reskript/issues/71)) ([52ef065](https://github.com/ecomfe/reskript/commit/52ef065f1f6f9101103bba7804e2d0eafc33ede8))

# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)

### Bug Fixes

- **build:** monorepo 下检测 husky 错误 ([#72](https://github.com/ecomfe/reskript/issues/72)) ([b86687a](https://github.com/ecomfe/reskript/commit/b86687a7712e4336e98c23457d9bae08a2e49688))
- **plugin-qiankun:** qiankun 的入口脚本也要加上跨域头 ([#73](https://github.com/ecomfe/reskript/issues/73)) ([82d6f72](https://github.com/ecomfe/reskript/commit/82d6f72190fe32dc276bf89bedc921b7b24cd073))

### Features

- **lint:** 增加一个严格模式，默认放过警告型错误 ([#71](https://github.com/ecomfe/reskript/issues/71)) ([3efbddf](https://github.com/ecomfe/reskript/commit/3efbddf77f79640fe57670b8e993bded08a16ff4))

## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)

### Bug Fixes

- **lint:** config-lint 的 exports 有错误，会无法引用到基础配置 ([86d9c91](https://github.com/ecomfe/reskript/commit/86d9c91d62c76a2800f9163fc5bd6c8d7ab6e2de))

## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)

### Bug Fixes

- **cli:** 限制 Node 版本支持 ESM 和 Node 协议 ([823172a](https://github.com/ecomfe/reskript/commit/823172a9000eacfb0c0655e81268d9cb58e1b9ba))
- **dev:** 调试时指定的 host 应该同时影响 HMR 的配置 ([#62](https://github.com/ecomfe/reskript/issues/62)) ([20beb9e](https://github.com/ecomfe/reskript/commit/20beb9eacc8cd249278a94163b60deaeffaa8c45))
- **lint:** config-lint 需要导出 stylelint 配置 ([#69](https://github.com/ecomfe/reskript/issues/69)) ([8e3ed95](https://github.com/ecomfe/reskript/commit/8e3ed954fdf0d1a154a8bf065f5fd6028075ff1a))

# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)

### Bug Fixes

- **babel:** 输出文件时没有保留目录结构 ([#61](https://github.com/ecomfe/reskript/issues/61)) ([f219279](https://github.com/ecomfe/reskript/commit/f21927975f9da3f3eb5e1b62a51827f379197570))

### Features

- **build:** 在 build 命令中用--src-dir 参数替换原有--src 参数 ([#65](https://github.com/ecomfe/reskript/issues/65)) ([c5894ad](https://github.com/ecomfe/reskript/commit/c5894ad4736e6ade78544fa353635af128204a99))
- **build:** 支持--entries-dir 参数指定入口目录 ([#36](https://github.com/ecomfe/reskript/issues/36)) ([dec298d](https://github.com/ecomfe/reskript/commit/dec298d9384849bfd14beaf2ca850b42362cd850))
- **dev:** 为资源增加跨域头 ([#62](https://github.com/ecomfe/reskript/issues/62)) ([b47cac0](https://github.com/ecomfe/reskript/commit/b47cac0a3d0d346eac2bd5971721f110bc4a0045))
- **dev:** 在 dev 命令中用--src-dir 参数替换原有--src 参数 ([#65](https://github.com/ecomfe/reskript/issues/65)) ([03b654d](https://github.com/ecomfe/reskript/commit/03b654d3553a6914d75402c1af9f5983773bb962))
- **dev:** 增加--host 参数指定调试服务器默认地址，自动生成完整的 publicPath ([#62](https://github.com/ecomfe/reskript/issues/62)) ([71b7d6d](https://github.com/ecomfe/reskript/commit/71b7d6db0cce7da200b0c9b154b30dde2c529dc7))

# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)

### Bug Fixes

- **build:** 告诉用户不要修改 webpack.config.js ([#60](https://github.com/ecomfe/reskript/issues/60)) ([4c0bc5f](https://github.com/ecomfe/reskript/commit/4c0bc5f1e0627471b2f56c54bd7da082072cdeaf))
- **build:** 更新 class-names-loader 兼容旧版本浏览器 ([#51](https://github.com/ecomfe/reskript/issues/51)) ([abf649a](https://github.com/ecomfe/reskript/commit/abf649a0aaed2ed100bbe12aeb3e2f478b5a6b05))
- **lint:** hooks-deps-new-line 规则只适用于第一个参数是函数的情况 ([#55](https://github.com/ecomfe/reskript/issues/55)) ([80377eb](https://github.com/ecomfe/reskript/commit/80377eb36f044e829701cc3034e55a6d2c92684a))

### Features

- **build:** 支持自定义入口配置，如指定输出文件名 ([#56](https://github.com/ecomfe/reskript/issues/56)) ([84fa53b](https://github.com/ecomfe/reskript/commit/84fa53b72fedb041db77cf7f3b1c209823b185fb))
- **build:** 自动构建 service worker ([#53](https://github.com/ecomfe/reskript/issues/53)) ([f1e42c5](https://github.com/ecomfe/reskript/commit/f1e42c5df7cf3b2fe1951f087530fe93096b3baf))
- **lint:** import-order 规则支持 node 协议路径 ([#58](https://github.com/ecomfe/reskript/issues/58)) ([9ad4798](https://github.com/ecomfe/reskript/commit/9ad4798a992f58597daf3515f79e133a5c866a5c))
- **test:** skr test 增加--collectCoverageFrom 参数并可以指定测试文件范围 ([#63](https://github.com/ecomfe/reskript/issues/63)) ([0e996a3](https://github.com/ecomfe/reskript/commit/0e996a38fa3917b61550078bd94a8773248dfbe4))

# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)

### Bug Fixes

- **build:** less-safe-loader 处理引号在 calc 内部的情况 ([#43](https://github.com/ecomfe/reskript/issues/43)) ([05acee8](https://github.com/ecomfe/reskript/commit/05acee8d95bf4e648c4c5842152feff4d1b27218))
- **build:** 在指定 analyze 参数时，产出包检查不应该强制退出构建 ([#49](https://github.com/ecomfe/reskript/issues/49)) ([d782f8c](https://github.com/ecomfe/reskript/commit/d782f8c3f321c61b33bbd3e3646c66e112aaf300))
- **dev-server:** proxy-domain 有端口时的兼容处理 ([#47](https://github.com/ecomfe/reskript/issues/47)) ([5bf0b0c](https://github.com/ecomfe/reskript/commit/5bf0b0cb4b11d561ebc5810a755e776ca7d40d40))
- **init:** init 支持与 Gerrit 兼容 ([#44](https://github.com/ecomfe/reskript/issues/44)) ([51fd87f](https://github.com/ecomfe/reskript/commit/51fd87fee8bcd2ad9816544cf053cf3f78cc2b79))
- **init:** init 时没有把隐藏文件复制过去 ([#42](https://github.com/ecomfe/reskript/issues/42)) ([9124efb](https://github.com/ecomfe/reskript/commit/9124efbe1392285f8b5b61729d8809f55962ff60))

### Features

- **build:** 增加配置支持生成 HTML 时注入应用容器 div ([#50](https://github.com/ecomfe/reskript/issues/50)) ([49633c5](https://github.com/ecomfe/reskript/commit/49633c5d1d19d5882b91750bf99c0077ff72d941))
- **lint:** import-order 规则支持自动修复 ([#46](https://github.com/ecomfe/reskript/issues/46)) ([f59ee92](https://github.com/ecomfe/reskript/commit/f59ee92186692bae8778f25bb66b2f8e63baf46b))
- **lint:** 增加一个 eslint 规则检查 hook 调用的 deps 参数另起一行 ([#45](https://github.com/ecomfe/reskript/issues/45)) ([169f9f3](https://github.com/ecomfe/reskript/commit/169f9f333ef169d2b91e1b5d04638ed7c9fb9e80))

## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)

### Bug Fixes

- **build:** less-safe-loader 处理嵌套的括号 ([#40](https://github.com/ecomfe/reskript/issues/40)) ([3f8564b](https://github.com/ecomfe/reskript/commit/3f8564b9a074e3aa87002bd914adefd91ae2fb95))

# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)

### Features

- **build:** 检查重复包的时候提示各引入位置的版本号 ([#38](https://github.com/ecomfe/reskript/issues/38)) ([8719c92](https://github.com/ecomfe/reskript/commit/8719c927c47a1028d8e97055fa9100d2077fd0b1))
- **build:** 重复包检测支持通配符匹配包名 ([ee0b906](https://github.com/ecomfe/reskript/commit/ee0b90636fa8bd2b2289157655a62ed41766da42))

## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)

### Bug Fixes

- config-webpack 需要 less-safe-loader 的依赖 ([4ae2928](https://github.com/ecomfe/reskript/commit/4ae29282c18bdde075949d170eb599fdf6baa8b3))

# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)

### Bug Fixes

- **build:** 在指定 analyze 但没有 build-target 时报错退出 ([9b0c020](https://github.com/ecomfe/reskript/commit/9b0c020829787ada850d868f1a5308665aa19624))

### Features

- 在引入 less 时将不安全的 calc 自动修复 ([#35](https://github.com/ecomfe/reskript/issues/35)) ([92359f3](https://github.com/ecomfe/reskript/commit/92359f3545e8265cef6c85632456cc5969a8b139))
- 支持关闭自动生成 displayName 的功能 ([#34](https://github.com/ecomfe/reskript/issues/34)) ([938f121](https://github.com/ecomfe/reskript/commit/938f12141511eb5b131d8e8d7ee636ff33c6859e))
- 给 build.finalize 传递 rules 对象 ([#23](https://github.com/ecomfe/reskript/issues/23)) ([e5f94e1](https://github.com/ecomfe/reskript/commit/e5f94e17bb6e4d24d61ca35550198aede09a443e))
- **build:** 分析产出中重复引入的依赖包 ([#15](https://github.com/ecomfe/reskript/issues/15)) ([9e01f1e](https://github.com/ecomfe/reskript/commit/9e01f1eea1a2373b329edf544fefe25f95fa68b3))

# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)

### Bug Fixes

- **dev:** 调试时不使用自定义的 publicPath ([10ba2fe](https://github.com/ecomfe/reskript/commit/10ba2febad2be7e83039ce2f89924c3c96347192))
- **settings:** 配置的校验里缺失 publicPath 字段 ([b0aea2a](https://github.com/ecomfe/reskript/commit/b0aea2ab47b9d70ef6819929e04ceab175a7daa7))

### Features

- **dev:** 支持 proxyRewrite 配置多 API 代理目标 ([#32](https://github.com/ecomfe/reskript/issues/32)) ([8f63fc1](https://github.com/ecomfe/reskript/commit/8f63fc1a27adab38437b3c2be63425a0e7ca281a))

# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)

### Bug Fixes

- **build:** less 编译打开 math 兼容模式 ([721a992](https://github.com/ecomfe/reskript/commit/721a9929de232acffbee80109465622a887534e5))
- **cli:** 标准化程序的退出码 ([#30](https://github.com/ecomfe/reskript/issues/30)) ([86229a6](https://github.com/ecomfe/reskript/commit/86229a6d51cccfc2abbfaff3d6f36390f8ccf1dd))

### chore

- **build:** 更新 less 到 4.x 版本 ([48a9c00](https://github.com/ecomfe/reskript/commit/48a9c00345f09cbefdb51dd6474f3ab2925c6760))

### Features

- **build:** 分析构建产出的初始加载资源 ([#15](https://github.com/ecomfe/reskript/issues/15)) ([28a9009](https://github.com/ecomfe/reskript/commit/28a900963962680ea57bf9c50e20533d4880340d))
- **build:** 支持构建产物中初始资源的全部检查规则 ([#15](https://github.com/ecomfe/reskript/issues/15)) ([5d22227](https://github.com/ecomfe/reskript/commit/5d2222735fa3bd666b1d5f7675d723a07822723d))

### BREAKING CHANGES

- **build:** 具体变更参考[less 4.x 的说明](https://github.com/less/less.js/releases/tag/v4.0.0)

# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)

### Features

- **build:** 构建后报告初始加载资源数量 ([4ecd9c6](https://github.com/ecomfe/reskript/commit/4ecd9c67b726ab195933f0a1413893e7122cccbd))
- **dev:** 支持指定入口进行调试 ([#28](https://github.com/ecomfe/reskript/issues/28)) ([284f141](https://github.com/ecomfe/reskript/commit/284f141d6f023336c51dc51f4b804d2970cda2a6))

# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)

### Bug Fixes

- **build:** --no-source-maps 参数解析错误 ([9496c39](https://github.com/ecomfe/reskript/commit/9496c3903204449de867f30992a85e9d222b0569))
- **build:** 构建产出报告丢失 ([8e991ae](https://github.com/ecomfe/reskript/commit/8e991ae64afd75c472fdac8768cab3c7aa8954f3))

# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)

### Features

- **build:** 增加--entries-only 参数指定构建的入口 ([#27](https://github.com/ecomfe/reskript/issues/27)) ([7496abc](https://github.com/ecomfe/reskript/commit/7496abc88fdb663bc559c7cfae12177cc14317d3))
- **build:** 增加--no-source-maps 参数可在构建时关闭 source map 生成 ([2b58bac](https://github.com/ecomfe/reskript/commit/2b58bacc7441d8a4f7e9353d726fc38e8fca002e))
- 支持 husky 5.x ([#26](https://github.com/ecomfe/reskript/issues/26)) ([6dd40f2](https://github.com/ecomfe/reskript/commit/6dd40f27aad406d61d4fa8eb517fc9d6e30edfbf))

# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)

### Bug Fixes

- **dev:** 当调试服务器启动出错时报告给用户并退出程序 ([#24](https://github.com/ecomfe/reskript/issues/24)) ([9fc7f5d](https://github.com/ecomfe/reskript/commit/9fc7f5dd494e38cae9e55708cacad1d3a2c73290))
- **init:** 没有发布 templates 导致初始化失败 ([9a5a2d2](https://github.com/ecomfe/reskript/commit/9a5a2d2b47f459c098b490458f4e57e1931a2b80))
- finalize 部分属性强制有值 ([#21](https://github.com/ecomfe/reskript/issues/21)) ([bba9837](https://github.com/ecomfe/reskript/commit/bba9837691f36286979d5163cabd8496b59fcfec))

### Features

- 增加 publicPath 配置 ([#20](https://github.com/ecomfe/reskript/issues/20)) ([6c292a7](https://github.com/ecomfe/reskript/commit/6c292a78163c6d3e9fdf1fa6147e177d495aa35b))

# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)

### Bug Fixes

- **doctor:** 标记为公开包 ([21c47a1](https://github.com/ecomfe/reskript/commit/21c47a1b2ea3be54ea1ca75cff7e726d4d613e65))

### Features

- **init:** 初始化项目的工具 ([#7](https://github.com/ecomfe/reskript/issues/7)) ([951beb3](https://github.com/ecomfe/reskript/commit/951beb329c6c53eeea17b7bdee51b71022c7709b))

# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)

### Bug Fixes

- **doctor:** 标记为公开包 ([21c47a1](https://github.com/ecomfe/reskript/commit/21c47a1b2ea3be54ea1ca75cff7e726d4d613e65))

### Features

- **init:** 初始化项目的工具 ([#7](https://github.com/ecomfe/reskript/issues/7)) ([951beb3](https://github.com/ecomfe/reskript/commit/951beb329c6c53eeea17b7bdee51b71022c7709b))

# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)

### Bug Fixes

- **babel:** 仅用来转义的 babel 配置不应该替换 core-js ([e94c38c](https://github.com/ecomfe/reskript/commit/e94c38c19f31ab120d61bb5bca7e9f5237b62fb8))
- **doctor:** 拼写错误 ([00be463](https://github.com/ecomfe/reskript/commit/00be46369826b6c6957e93ed3678c854d341a04d))
- **lint:** 删除团队内部的专有规则 ([d94eb0d](https://github.com/ecomfe/reskript/commit/d94eb0d7941191e41a300fc4a0c9c4d1408ce799))

### Features

- **doctor:** 增加检查项目合规的功能 ([#19](https://github.com/ecomfe/reskript/issues/19)) ([4cba664](https://github.com/ecomfe/reskript/commit/4cba6641fe30bd2f46dab9d2d4bfecaf74a67a1b))

# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)

### Bug Fixes

- **play:** Monaco 的配置错误导致没有代码高亮 ([4185ab8](https://github.com/ecomfe/reskript/commit/4185ab854f6386d7e42d08a91b19e74c3c0be8bc))

### Features

- **play:** skr play 支持自定义组件外层布局 ([#16](https://github.com/ecomfe/reskript/issues/16)) ([8813e40](https://github.com/ecomfe/reskript/commit/8813e40898945a0196ee136a5c935e32243f765a))

# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)

### Bug Fixes

- **config-lint:** eslint react 插件指定 17.0 作为版本 ([867bde7](https://github.com/ecomfe/reskript/commit/867bde7737ec3f726e42cc4eecd1f11ae7e99262))
- **play:** skr-play 配置错误 ([2bcebea](https://github.com/ecomfe/reskript/commit/2bcebea99e76d3cb943e5c4537c8fd1983fa90d8))

# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)

### Bug Fixes

- **babel:** skr babel 不应该替换 core-js 的引用 ([0c24ccd](https://github.com/ecomfe/reskript/commit/0c24ccd404c806e6d49ea8b19338e32d59e1aba8))
- **play:** 入口文件路径错误 ([a320b22](https://github.com/ecomfe/reskript/commit/a320b226fd2a7c17fbbbdf97d1c84b5f2de6b427))

### Features

- **babel:** 增加 skr babel 命令 ([#8](https://github.com/ecomfe/reskript/issues/8)) ([bf9ba53](https://github.com/ecomfe/reskript/commit/bf9ba533652c2bdd11375f2058a21e9de99c8885))

# [1.0.0-beta.27](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2021-01-28)

### Features

- **play:** skr play 功能 ([#11](https://github.com/ecomfe/reskript/issues/11)) ([5a2e7ea](https://github.com/ecomfe/reskript/commit/5a2e7eaf6bbe84c9f1ec2cb8dc4e41bdd5388419))

# 1.0.0-beta.26 (2021-01-27)

### Bug Fixes

- 使用 contenthash 代替已经过时的 hash ([39959a0](https://github.com/ecomfe/reskript/commit/39959a0f2f8c38cb08086ab0cdda5e7404bd89e2))
- 修复 UT 在 GitHub Actions 上不能跑的问题 ([a05c1fd](https://github.com/ecomfe/reskript/commit/a05c1fd72d095d2776372e4097055d5f74492657))

### Features

- 修改配置文件名 ([22555e4](https://github.com/ecomfe/reskript/commit/22555e4cc14467543669e5f8b85d5bb7b627f9e7))
- 增加对 finalize 的返回值的校验 ([#10](https://github.com/ecomfe/reskript/issues/10)) ([a81a043](https://github.com/ecomfe/reskript/commit/a81a0436aa62f36483bfe930915cc33943ddc931))

### BREAKING CHANGES

- 配置文件名从`settings.js`改为了`reskript.config.js`
