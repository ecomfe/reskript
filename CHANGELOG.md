# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.2](https://github.com/ecomfe/reskript/compare/v2.2.1...v2.2.2) (2021-09-12)


### Bug Fixes

* **test:** 对node环境的测试也加上第三方ESM模块的处理 ([#168](https://github.com/ecomfe/reskript/issues/168)) ([50ada53](https://github.com/ecomfe/reskript/commit/50ada532c0a74c1c09f283585eca8803fdda9f1c))





## [2.2.1](https://github.com/ecomfe/reskript/compare/v2.2.0...v2.2.1) (2021-09-12)


### Bug Fixes

* **test:** 让jest可以mock从svg导入的组件 ([#167](https://github.com/ecomfe/reskript/issues/167)) ([1772ac1](https://github.com/ecomfe/reskript/commit/1772ac1cd843bb2e424869c71d770a28cf96fb63))





# [2.2.0](https://github.com/ecomfe/reskript/compare/v2.1.0...v2.2.0) (2021-09-12)


### Bug Fixes

* **build:** 为postcss指定具体实现 ([#165](https://github.com/ecomfe/reskript/issues/165)) ([8c06339](https://github.com/ecomfe/reskript/commit/8c063393d1b247a2575a05d1470ac07a35646392))
* **build:** 使生成的HTML方便被各种编辑器格式化后排查问题 ([#164](https://github.com/ecomfe/reskript/issues/164)) ([41f90e1](https://github.com/ecomfe/reskript/commit/41f90e1dcbef2d18f5cd491e2896d3a8c3983ce1))
* **build:** 修复strict模式设置require相关配置相反的问题 ([#161](https://github.com/ecomfe/reskript/issues/161)) ([92dab1b](https://github.com/ecomfe/reskript/commit/92dab1b521e661dbf1ea289842ddd63f574b3e6e))
* **test:** 非react测试也共享路径别名等配置 ([#162](https://github.com/ecomfe/reskript/issues/162)) ([8e893ec](https://github.com/ecomfe/reskript/commit/8e893ecfbc009b41f23f563ecddbdf712016fc9c))


### Features

* **build:** 增加一个产出检查项，确保产出的HTML适用于微前端 ([#163](https://github.com/ecomfe/reskript/issues/163)) ([5f6b252](https://github.com/ecomfe/reskript/commit/5f6b2524d89f8787c7a45ae4765928bc41535ef4))
* **cli:** 增加调试输出 ([#166](https://github.com/ecomfe/reskript/issues/166)) ([ca78e43](https://github.com/ecomfe/reskript/commit/ca78e438e6f667c76cd2fa63194a93c4ccac167d))





# [2.1.0](https://github.com/ecomfe/reskript/compare/v2.0.0...v2.1.0) (2021-08-31)


### Bug Fixes

* **build:** 把SVG转为组件时保留ref ([#159](https://github.com/ecomfe/reskript/issues/159)) ([863f582](https://github.com/ecomfe/reskript/commit/863f58254eb8bc3ee1e04eb04187b5381f570b5f))
* **doctor:** 加载入口配置时未转换成绝对路径 ([#157](https://github.com/ecomfe/reskript/issues/157)) ([fc689fa](https://github.com/ecomfe/reskript/commit/fc689fa0f11f0457486c8ace00143e064ff5e22c))


### Features

* **dev:** 增加--no-open参数禁用打开浏览器功能 ([#160](https://github.com/ecomfe/reskript/issues/160)) ([525f69a](https://github.com/ecomfe/reskript/commit/525f69ab3408c739a3ff67590ae9867489e169db))





# [2.0.0](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.5...v2.0.0) (2021-08-26)


### Features

* **build:** 在严格模式下增加类型检查 ([#147](https://github.com/ecomfe/reskript/issues/147)) ([a2d293f](https://github.com/ecomfe/reskript/commit/a2d293f69a60aaf7e672de66f88014fc13b6748d))





# [2.0.0-beta.5](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-08-26)


### Bug Fixes

* **cli:** 找CLI包的时候要从项目的目录开始找 ([#155](https://github.com/ecomfe/reskript/issues/155)) ([6697418](https://github.com/ecomfe/reskript/commit/66974182ab6838a8f6c01a0a9ec148345bda1dc1))
* **deps:** 几个CLI包增加对core-js的peer依赖 ([#154](https://github.com/ecomfe/reskript/issues/154)) ([fc6f8a1](https://github.com/ecomfe/reskript/commit/fc6f8a172954574a83792cd7d7fce7a3261a3240))


### Features

* **doctor:** 增加V2版本迁移的自动化检测 ([#151](https://github.com/ecomfe/reskript/issues/151)) ([650e343](https://github.com/ecomfe/reskript/commit/650e343f1c03f227b0ae439b11f347fdecd3c3e6))





# [2.0.0-beta.4](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-08-25)


### Bug Fixes

* **build:** 修复读取入口配置时的逻辑错误 ([#149](https://github.com/ecomfe/reskript/issues/149)) ([0ce0026](https://github.com/ecomfe/reskript/commit/0ce00269216bb5c419467ad7b91ff2f40e295f39))
* **dev:** 美化一下进度条 ([#148](https://github.com/ecomfe/reskript/issues/148)) ([7c064bb](https://github.com/ecomfe/reskript/commit/7c064bb6a8370d6804519be90640f3d1a75975f7))
* **play:** 不应该让cli-play直接依赖react ([#152](https://github.com/ecomfe/reskript/issues/152)) ([0fa7bcf](https://github.com/ecomfe/reskript/commit/0fa7bcf78053544c3aecc2b3921a9d94ca5faf63))
* **test:** 修复读取用户的jest.config.js逻辑错误 ([#149](https://github.com/ecomfe/reskript/issues/149)) ([15c029c](https://github.com/ecomfe/reskript/commit/15c029c1161fe03884225181d92390b33d2ded3e))


### Features

* **build:** 读取入口配置文件时增加校验 ([#150](https://github.com/ecomfe/reskript/issues/150)) ([fb24371](https://github.com/ecomfe/reskript/commit/fb2437133027b5750c60b313f2216f0cf7e4ab6b))





# [2.0.0-beta.3](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-08-25)


### Bug Fixes

* **cli:** 只在对应的CLI包不存在时才自动安装，其它错误情况报错退出 ([#146](https://github.com/ecomfe/reskript/issues/146)) ([fdfd44a](https://github.com/ecomfe/reskript/commit/fdfd44a76047de4512d091d80c371e73e4712db3))
* **play:** 修复一些接口没有异步调用的问题 ([#145](https://github.com/ecomfe/reskript/issues/145)) ([5fd503a](https://github.com/ecomfe/reskript/commit/5fd503a414bc19d6e1a704e8da74731a0b9138e2))
* **play:** 在play命令启动时增加是否安装core-js的检测 ([#144](https://github.com/ecomfe/reskript/issues/144)) ([7ad0678](https://github.com/ecomfe/reskript/commit/7ad067804041c459ad6caeedc52ba47fda5214e5))
* **test:** 在test命令启动时增加是否安装core-js的检测 ([#144](https://github.com/ecomfe/reskript/issues/144)) ([4528b60](https://github.com/ecomfe/reskript/commit/4528b6009fec19ff45841d4b868dc13e9c0568f5))





# [2.0.0-beta.2](https://github.com/ecomfe/reskript/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-08-25)


### Bug Fixes

* **build:** 修复对husky钩子检测的逻辑错误 ([#141](https://github.com/ecomfe/reskript/issues/141)) ([8b67c48](https://github.com/ecomfe/reskript/commit/8b67c4842e27bf5e54fb50cfebc9e2d5591a6d40))
* **dev:** 只在编译错误时显示客户端的浮层提示 ([#140](https://github.com/ecomfe/reskript/issues/140)) ([bee529a](https://github.com/ecomfe/reskript/commit/bee529a46803bc83a23897ae631768df6e82090d))


### Features

* **build:** 增加一些供插件开发者使用的类型 ([#142](https://github.com/ecomfe/reskript/issues/142)) ([1efd6a0](https://github.com/ecomfe/reskript/commit/1efd6a0899ceb594b15cf5462f33dac89b5220b1))





# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)


### Bug Fixes

* 推荐用户使用固定版本安装，并保持版本一致 ([#138](https://github.com/ecomfe/reskript/issues/138)) ([61f8ec6](https://github.com/ecomfe/reskript/commit/61f8ec635e5f22f9efd6dcfca5beb6a15e6567b1))


* feat(dev)!: 支持webpack-dev-server 4版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
* feat(build)!: 废弃旧版本的入口配置文件格式 (#80) ([41ac823](https://github.com/ecomfe/reskript/commit/41ac823fa6ae482fea339c2f5e000e4a2fb83be3)), closes [#80](https://github.com/ecomfe/reskript/issues/80)
* fix(build)!: 由用户自行安装core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)
* feat(test)!: 支持透传参数到jest (#127) ([b4c4820](https://github.com/ecomfe/reskript/commit/b4c4820622c1a90d724f4e2b8e2142b69bda4ca8)), closes [#127](https://github.com/ecomfe/reskript/issues/127)
* feat!: 对外暴露的API转为异步 (#130) ([f423d55](https://github.com/ecomfe/reskript/commit/f423d55efc890abd54e8958d4005c0285c91252d)), closes [#130](https://github.com/ecomfe/reskript/issues/130)
* feat!: 移除已经废弃的功能相关实现 (#80) ([ee923f9](https://github.com/ecomfe/reskript/commit/ee923f9794840a512afbba74f3113c8016a0e5cc)), closes [#80](https://github.com/ecomfe/reskript/issues/80)


### Features

* **build:** 增加严格模式开关 ([#54](https://github.com/ecomfe/reskript/issues/54)) ([3e00afc](https://github.com/ecomfe/reskript/commit/3e00afc503371412a30260c5a836935b47b7eb60))
* 支持tailwind ([#119](https://github.com/ecomfe/reskript/issues/119)) ([d636c80](https://github.com/ecomfe/reskript/commit/d636c804ddfbaae00674682a86cec5ec32ff9265))
* 支持自动安装缺失的命令行包 ([#139](https://github.com/ecomfe/reskript/issues/139)) ([1c54433](https://github.com/ecomfe/reskript/commit/1c54433830bf3af371c35c4ad087ceb7aa90ee0d))


### BREAKING CHANGES

* `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
* `devServer.hot`的类型修改为`boolean`
* `config-babel`的`hot`配置类型修改为`boolean`
* 入口配置`entries/xxx.config.js`必须符合新格式，仅支持`entry`和`html`两个导出，原有配置均放进`html`中
* 不再处理`core-js`的引入，用户必须在项目中自行安装`core-js@3`
* 所有jest的参数必须在`skr test --`之后传递
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

* **build:** 处理SVG文件时把属性转成camelCase ([#136](https://github.com/ecomfe/reskript/issues/136)) ([4bf68e1](https://github.com/ecomfe/reskript/commit/4bf68e17f6fce4cd7974c5a134cb105906fc5167))
* **eslint-plugin:** 支持原生模块的子模块的优先级判断 ([#135](https://github.com/ecomfe/reskript/issues/135)) ([b7dd304](https://github.com/ecomfe/reskript/commit/b7dd304d6f5f48f259f9b07d2d3a5cca78b5149a))
* **play:** 删除源码中多出来的dist文件 ([31d7375](https://github.com/ecomfe/reskript/commit/31d7375258e2faa87fbce97b7af26d418ac7003c))





## [1.15.1](https://github.com/ecomfe/reskript/compare/v1.15.0...v1.15.1) (2021-08-20)


### Bug Fixes

* **plugin-workspace-no-build:** 放宽一些对版本范围的检查 ([#129](https://github.com/ecomfe/reskript/issues/129)) ([0384184](https://github.com/ecomfe/reskript/commit/0384184a648a0e31d59af2d3a6480e8b46bb1089))





# [1.15.0](https://github.com/ecomfe/reskript/compare/v1.14.2...v1.15.0) (2021-08-19)


### Bug Fixes

* **plugin-workspace-no-build:** 提示入口包安装的依赖版本不兼容子包的要求 ([#121](https://github.com/ecomfe/reskript/issues/121)) ([9b232e8](https://github.com/ecomfe/reskript/commit/9b232e85230d989927f0160d73189394f3072f0e))
* **plugin-workspace-no-build:** 添加邻居包依赖只处理被主包声明的那部分 ([#125](https://github.com/ecomfe/reskript/issues/125)) ([f145679](https://github.com/ecomfe/reskript/commit/f14567951aeb54ed910bc62ab64b2a591f98200d))


### Features

* **flags:** 支持SKR_FLAGS设置遇到废弃配置直接退出 ([#124](https://github.com/ecomfe/reskript/issues/124)) ([7f2658a](https://github.com/ecomfe/reskript/commit/7f2658a890a1f714d1a003aeff44dcd446d447b1))
* **play:** 支持全局的组件调试配置 ([#120](https://github.com/ecomfe/reskript/issues/120)) ([4c4f068](https://github.com/ecomfe/reskript/commit/4c4f068ef6e58744d889823c379e10ced02e22a8))
* **play:** 让play支持React 18和并发模式 ([#122](https://github.com/ecomfe/reskript/issues/122)) ([31ec53e](https://github.com/ecomfe/reskript/commit/31ec53e502f3c85357ade52d78cc493d66145cd9))
* **test:** 支持--maxWorkers参数 ([#126](https://github.com/ecomfe/reskript/issues/126)) ([da406f4](https://github.com/ecomfe/reskript/commit/da406f44242a5c5ac1a59748b7325648a00c8157))





## [1.14.2](https://github.com/ecomfe/reskript/compare/v1.14.1...v1.14.2) (2021-08-17)


### Bug Fixes

* **build:** 修复svg-mixed-loader在Windows系统下的路径问题 ([#114](https://github.com/ecomfe/reskript/issues/114)) ([05cc19c](https://github.com/ecomfe/reskript/commit/05cc19c358972cab8bc80afb4f7de70b98cbc130))
* **init:** 导入SVG组件的类型声明优化 ([#117](https://github.com/ecomfe/reskript/issues/117)) ([cbd5981](https://github.com/ecomfe/reskript/commit/cbd598169260ecbeb6ac827b2f2efe91eb7edb20))
* **init:** 异步执行命令的顺序错误 ([#116](https://github.com/ecomfe/reskript/issues/116)) ([d509352](https://github.com/ecomfe/reskript/commit/d509352053d5a9d47cc8c37a8838f57ce9408c62))
* **plugin-workspace-no-build:** 自动处理业务模块的peer依赖 ([#118](https://github.com/ecomfe/reskript/issues/118)) ([875c9c9](https://github.com/ecomfe/reskript/commit/875c9c97995a0cb57857b4f526a555b37c2de992))
* **test:** 处理第三方包的ESM在jest中无法解析的问题 ([#115](https://github.com/ecomfe/reskript/issues/115)) ([75d6470](https://github.com/ecomfe/reskript/commit/75d64708799b5bfcf932e88944eaa7f1d5425e85))





## [1.14.1](https://github.com/ecomfe/reskript/compare/v1.14.0...v1.14.1) (2021-08-13)


### Bug Fixes

* **build:** 在SVG转成组件时要接受props ([#113](https://github.com/ecomfe/reskript/issues/113)) ([dd594be](https://github.com/ecomfe/reskript/commit/dd594be07c9bc6a3e4549c9f4839318b5e4cd6c1))





# [1.14.0](https://github.com/ecomfe/reskript/compare/v1.13.1...v1.14.0) (2021-08-12)


### Bug Fixes

* **build:** 解析svg时处理XML编码信息部分 ([#112](https://github.com/ecomfe/reskript/issues/112)) ([70ceef2](https://github.com/ecomfe/reskript/commit/70ceef2e71bde4cf5040c063131f98bd6d052110))
* **play:** 升级monaco-editor兼容play的版本 ([#111](https://github.com/ecomfe/reskript/issues/111)) ([77fd26e](https://github.com/ecomfe/reskript/commit/77fd26ee787f3c4bcfacf1ccb26b6c595f93d073))


### Features

* **lint:** import-order规则支持检查本地的包名 ([#110](https://github.com/ecomfe/reskript/issues/110)) ([050084d](https://github.com/ecomfe/reskript/commit/050084da970b475fcc5450c3b57c5f5aa76f29ee))





## [1.13.1](https://github.com/ecomfe/reskript/compare/v1.13.0...v1.13.1) (2021-08-07)


### Bug Fixes

* **play:** 在PlayGround使用新的方式引入SVG图标 ([#108](https://github.com/ecomfe/reskript/issues/108)) ([28d10bc](https://github.com/ecomfe/reskript/commit/28d10bcd88504091905b276781fbf9c0ab74ab3c))
* **play:** 在play中开启StrictMode ([#109](https://github.com/ecomfe/reskript/issues/109)) ([28c8464](https://github.com/ecomfe/reskript/commit/28c8464bd6dcb33c7e13e6bdf33a812458354704))





# [1.13.0](https://github.com/ecomfe/reskript/compare/v1.12.2...v1.13.0) (2021-08-05)


### Features

* **babel:** 增加对reflect-metadata的支持 ([#106](https://github.com/ecomfe/reskript/issues/106)) ([8d0f36b](https://github.com/ecomfe/reskript/commit/8d0f36b7957a0a7efd9ded92b4b6a259ddeb984d))
* **build:** 调整对svg文件的导入规则 ([#105](https://github.com/ecomfe/reskript/issues/105)) ([be7accc](https://github.com/ecomfe/reskript/commit/be7accc50f0a1fdb6698622ad110fd0cacb515cc))





## [1.12.2](https://github.com/ecomfe/reskript/compare/v1.12.1...v1.12.2) (2021-08-02)


### Bug Fixes

* **config-jest:** 修复生成的配置对jest-raw-loader引用路径错误 ([7e163cb](https://github.com/ecomfe/reskript/commit/7e163cb147bfa30263a65ebadf2f266d8bea5563))





## [1.12.1](https://github.com/ecomfe/reskript/compare/v1.12.0...v1.12.1) (2021-08-02)


### Bug Fixes

* **babel:** babel-utils少了个依赖 ([477a159](https://github.com/ecomfe/reskript/commit/477a159f763261533d91c0acc813d42f012289ac))
* **lint:** 修复在monorepo下检查已更改文件的逻辑 ([#104](https://github.com/ecomfe/reskript/issues/104)) ([ee035c7](https://github.com/ecomfe/reskript/commit/ee035c76ca299548c966344c7a84e1b56dc02c24))





# [1.12.0](https://github.com/ecomfe/reskript/compare/v1.11.2...v1.12.0) (2021-07-29)


### Features

* **plugin-qiankun:** 支持只处理build，不拦截调试服务器 ([#102](https://github.com/ecomfe/reskript/issues/102)) ([18c54e3](https://github.com/ecomfe/reskript/commit/18c54e3b4562ab84ef55e59ed2cd5702c79905b5))
* **plugin-workspace-no-build:** 一个能在monorepo下直接依赖其它子包的源码的插件 ([#103](https://github.com/ecomfe/reskript/issues/103)) ([81ab9e1](https://github.com/ecomfe/reskript/commit/81ab9e12c49661907362587f92b5fdf7f780d9f5))





## [1.11.2](https://github.com/ecomfe/reskript/compare/v1.11.1...v1.11.2) (2021-07-28)


### Bug Fixes

* **build:** 用asset module代替url-loader ([#101](https://github.com/ecomfe/reskript/issues/101)) ([e40aeb7](https://github.com/ecomfe/reskript/commit/e40aeb74ab6127bdfe4a0bcabb0f692514c2bc60))





## [1.11.1](https://github.com/ecomfe/reskript/compare/v1.11.0...v1.11.1) (2021-07-25)


### Bug Fixes

* **play:** 格式化时间逻辑错误 ([73e4893](https://github.com/ecomfe/reskript/commit/73e4893773fd6bc3cab71dcda65babb545823db7))





# [1.11.0](https://github.com/ecomfe/reskript/compare/v1.10.3...v1.11.0) (2021-07-23)


### Features

* **build:** 管理和读取各类.env文件 ([#74](https://github.com/ecomfe/reskript/issues/74)) ([83c9699](https://github.com/ecomfe/reskript/commit/83c96994c4cb5eb98978345f109c03f3901cefd2))
* **play:** 支持--host参数指定打开页面的主机名 ([#100](https://github.com/ecomfe/reskript/issues/100)) ([86b9b82](https://github.com/ecomfe/reskript/commit/86b9b82ffd3d333388d34d31e2af5ab1bb7c6630))
* **play:** 支持自定义端口 ([#99](https://github.com/ecomfe/reskript/issues/99)) ([ba1def2](https://github.com/ecomfe/reskript/commit/ba1def2ed35fe04b74c1fc6c8697e1ff3fcd37ff))


### Performance Improvements

* **babel:** 优化对import语句的处理的性能 ([bc8e0dc](https://github.com/ecomfe/reskript/commit/bc8e0dc3c7fcee555a664b5168cc30683e421f19))





## [1.10.3](https://github.com/ecomfe/reskript/compare/v1.10.2...v1.10.3) (2021-07-22)


### Bug Fixes

* **babel:** 对组件函数的检测使用更严格的模式 ([#97](https://github.com/ecomfe/reskript/issues/97)) ([61fc2df](https://github.com/ecomfe/reskript/commit/61fc2df685eb3ad628592cbc0c0e1252def4de7d))
* **babel:** 插入useComponentFile时需要是一个完整的语句 ([#97](https://github.com/ecomfe/reskript/issues/97)) ([0ab65e1](https://github.com/ecomfe/reskript/commit/0ab65e1b1a5354c0d70ef4483f92ff792fd82a6b))





## [1.10.2](https://github.com/ecomfe/reskript/compare/v1.10.1...v1.10.2) (2021-07-22)


### Bug Fixes

* **babel:** 调整babel插件的顺序避免代码转换出错 ([#97](https://github.com/ecomfe/reskript/issues/97)) ([f9d6f97](https://github.com/ecomfe/reskript/commit/f9d6f979da88fe75f0029b519e416b090cb85f73))
* **lint:** 支持自定义的stylelint配置 ([#96](https://github.com/ecomfe/reskript/issues/96)) ([c7f6726](https://github.com/ecomfe/reskript/commit/c7f67264224dadb69da745c8a4eca44c5f089007))





## [1.10.1](https://github.com/ecomfe/reskript/compare/v1.10.0...v1.10.1) (2021-07-20)


### Bug Fixes

* **babel:** useComponentFile的引用路径错误 ([890a13a](https://github.com/ecomfe/reskript/commit/890a13a3beb140d4691de85079a69f84fc43bd4c))





# [1.10.0](https://github.com/ecomfe/reskript/compare/v1.9.0...v1.10.0) (2021-07-20)


### Bug Fixes

* **build:** 简化组件displayName的处理，只处理函数定义 ([#92](https://github.com/ecomfe/reskript/issues/92)) ([13fdb28](https://github.com/ecomfe/reskript/commit/13fdb283d68f35dc2504503f0fdc9245a3227aff))
* **build:** 缓存标识增加pnpm-lock的内容 ([9214254](https://github.com/ecomfe/reskript/commit/9214254b3c5141afbf3e84e7d225a9b72fce1208))
* **init:** 修复 install 过程中 spinner 卡住的 bug ([0cc59d7](https://github.com/ecomfe/reskript/commit/0cc59d7e0e6d64cbabb2ae624b8abf404ea12c30))
* **play:** 使用play.wrapper配置时显示警告 ([#87](https://github.com/ecomfe/reskript/issues/87)) ([8cfe3f2](https://github.com/ecomfe/reskript/commit/8cfe3f25944a2289ffbf6595a69784f70d33f42f))


### Features

* **dev:** 增加一个babel插件为React组件注入对应源码路径 ([#91](https://github.com/ecomfe/reskript/issues/91)) ([fb0132d](https://github.com/ecomfe/reskript/commit/fb0132d31dc83128b8373da7b38ca0c3d32b4a9c))
* **play:** 在选择用例时更新用例的最后执行时间 ([#89](https://github.com/ecomfe/reskript/issues/89)) ([15b2513](https://github.com/ecomfe/reskript/commit/15b251390eb0aa282174d0109deaf22922745f4d))
* **play:** 支持显示用例说明和帮助信息 ([#88](https://github.com/ecomfe/reskript/issues/88)) ([6484c77](https://github.com/ecomfe/reskript/commit/6484c77b470c2eb1ebe8f16a8d5974b55b661320))
* **test:** 允许jest识别一部分纯文本文件 ([ea9e475](https://github.com/ecomfe/reskript/commit/ea9e475735d9eea6c50aacd9061c6add6f48e2cc))





# [1.9.0](https://github.com/ecomfe/reskript/compare/v1.8.0...v1.9.0) (2021-07-14)


### Bug Fixes

* 文档尽可能兼容Github Pages的展示逻辑 ([#83](https://github.com/ecomfe/reskript/issues/83)) ([bb8bc86](https://github.com/ecomfe/reskript/commit/bb8bc86dcdb61e2c786c0121bce8e440e21120d9))


### Features

* **build:** 支持指定cache目录 ([#84](https://github.com/ecomfe/reskript/issues/84)) ([000efd1](https://github.com/ecomfe/reskript/commit/000efd1ee4b3f03c0d714513c9f21cf2da7b3960))
* **play:** 使用WebSocket实时推送用例文件的修改 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([fa2990b](https://github.com/ecomfe/reskript/commit/fa2990b04bb1f38f9c0aed3429baba03ae7c5576))
* **play:** 支持将调试中的代码保存为用例 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([429d0a6](https://github.com/ecomfe/reskript/commit/429d0a66f13a9b61850ea6a295149cc4d149bdd3))
* **play:** 支持自定义调试用例 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([8021d98](https://github.com/ecomfe/reskript/commit/8021d9824149163144105242fa265e259cd7ffad))
* **play:** 支持调试组件时自定义配置关联依赖注入和自定义布局 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([44d82c6](https://github.com/ecomfe/reskript/commit/44d82c6e564563f435327f926aa28c9e84256999))
* **play:** 更新当前用例功能 ([#85](https://github.com/ecomfe/reskript/issues/85)) ([cfda004](https://github.com/ecomfe/reskript/commit/cfda004103384728a4e6c9e215497585ae631550))





# [1.8.0](https://github.com/ecomfe/reskript/compare/v1.7.1...v1.8.0) (2021-07-09)


### Bug Fixes

* **init:** 向初始化允许存在的文件白名单添加.git目录 ([acc8d59](https://github.com/ecomfe/reskript/commit/acc8d59f4c02b47d4373e439668ab2657aefe678))


### Features

* **build:** 为build.finalize提供内置的loader ([#70](https://github.com/ecomfe/reskript/issues/70)) ([8fc92dc](https://github.com/ecomfe/reskript/commit/8fc92dcb30603873474183d4e45af93133e4a66d))
* **build:** 增加配置支持使用方选择性引入第三方库的专项优化 ([#79](https://github.com/ecomfe/reskript/issues/79)) ([f8ea13d](https://github.com/ecomfe/reskript/commit/f8ea13d2c16b11dae1a42d78cfa98d097350ef56))
* **build:** 支持emotion管理样式 ([#78](https://github.com/ecomfe/reskript/issues/78)) ([e13e9a5](https://github.com/ecomfe/reskript/commit/e13e9a5a4c323c8690be674523041d4a607df9f8))
* **plugin-sass:** 增加处理SASS样式的插件 ([4859f99](https://github.com/ecomfe/reskript/commit/4859f99a7e1d2cefe8e63ae147e4d970cb20b8e0))





## [1.7.1](https://github.com/ecomfe/reskript/compare/v1.7.0...v1.7.1) (2021-07-07)


### Bug Fixes

* **lint:** 对lint结果通过与否的判断写反了 ([#71](https://github.com/ecomfe/reskript/issues/71)) ([52ef065](https://github.com/ecomfe/reskript/commit/52ef065f1f6f9101103bba7804e2d0eafc33ede8))





# [1.7.0](https://github.com/ecomfe/reskript/compare/v1.6.2...v1.7.0) (2021-07-06)


### Bug Fixes

* **build:** monorepo下检测husky错误 ([#72](https://github.com/ecomfe/reskript/issues/72)) ([b86687a](https://github.com/ecomfe/reskript/commit/b86687a7712e4336e98c23457d9bae08a2e49688))
* **plugin-qiankun:** qiankun的入口脚本也要加上跨域头 ([#73](https://github.com/ecomfe/reskript/issues/73)) ([82d6f72](https://github.com/ecomfe/reskript/commit/82d6f72190fe32dc276bf89bedc921b7b24cd073))


### Features

* **lint:** 增加一个严格模式，默认放过警告型错误 ([#71](https://github.com/ecomfe/reskript/issues/71)) ([3efbddf](https://github.com/ecomfe/reskript/commit/3efbddf77f79640fe57670b8e993bded08a16ff4))





## [1.6.2](https://github.com/ecomfe/reskript/compare/v1.6.1...v1.6.2) (2021-06-29)


### Bug Fixes

* **lint:** config-lint的exports有错误，会无法引用到基础配置 ([86d9c91](https://github.com/ecomfe/reskript/commit/86d9c91d62c76a2800f9163fc5bd6c8d7ab6e2de))





## [1.6.1](https://github.com/ecomfe/reskript/compare/v1.6.0...v1.6.1) (2021-06-29)


### Bug Fixes

* **cli:** 限制Node版本支持ESM和Node协议 ([823172a](https://github.com/ecomfe/reskript/commit/823172a9000eacfb0c0655e81268d9cb58e1b9ba))
* **dev:** 调试时指定的host应该同时影响HMR的配置 ([#62](https://github.com/ecomfe/reskript/issues/62)) ([20beb9e](https://github.com/ecomfe/reskript/commit/20beb9eacc8cd249278a94163b60deaeffaa8c45))
* **lint:** config-lint需要导出stylelint配置 ([#69](https://github.com/ecomfe/reskript/issues/69)) ([8e3ed95](https://github.com/ecomfe/reskript/commit/8e3ed954fdf0d1a154a8bf065f5fd6028075ff1a))





# [1.6.0](https://github.com/ecomfe/reskript/compare/v1.5.0...v1.6.0) (2021-06-09)


### Bug Fixes

* **babel:** 输出文件时没有保留目录结构 ([#61](https://github.com/ecomfe/reskript/issues/61)) ([f219279](https://github.com/ecomfe/reskript/commit/f21927975f9da3f3eb5e1b62a51827f379197570))


### Features

* **build:** 在build命令中用--src-dir参数替换原有--src参数 ([#65](https://github.com/ecomfe/reskript/issues/65)) ([c5894ad](https://github.com/ecomfe/reskript/commit/c5894ad4736e6ade78544fa353635af128204a99))
* **build:** 支持--entries-dir参数指定入口目录 ([#36](https://github.com/ecomfe/reskript/issues/36)) ([dec298d](https://github.com/ecomfe/reskript/commit/dec298d9384849bfd14beaf2ca850b42362cd850))
* **dev:** 为资源增加跨域头 ([#62](https://github.com/ecomfe/reskript/issues/62)) ([b47cac0](https://github.com/ecomfe/reskript/commit/b47cac0a3d0d346eac2bd5971721f110bc4a0045))
* **dev:** 在dev命令中用--src-dir参数替换原有--src参数 ([#65](https://github.com/ecomfe/reskript/issues/65)) ([03b654d](https://github.com/ecomfe/reskript/commit/03b654d3553a6914d75402c1af9f5983773bb962))
* **dev:** 增加--host参数指定调试服务器默认地址，自动生成完整的publicPath ([#62](https://github.com/ecomfe/reskript/issues/62)) ([71b7d6d](https://github.com/ecomfe/reskript/commit/71b7d6db0cce7da200b0c9b154b30dde2c529dc7))





# [1.5.0](https://github.com/ecomfe/reskript/compare/v1.4.0...v1.5.0) (2021-06-08)


### Bug Fixes

* **build:** 告诉用户不要修改webpack.config.js ([#60](https://github.com/ecomfe/reskript/issues/60)) ([4c0bc5f](https://github.com/ecomfe/reskript/commit/4c0bc5f1e0627471b2f56c54bd7da082072cdeaf))
* **build:** 更新class-names-loader兼容旧版本浏览器 ([#51](https://github.com/ecomfe/reskript/issues/51)) ([abf649a](https://github.com/ecomfe/reskript/commit/abf649a0aaed2ed100bbe12aeb3e2f478b5a6b05))
* **lint:** hooks-deps-new-line规则只适用于第一个参数是函数的情况 ([#55](https://github.com/ecomfe/reskript/issues/55)) ([80377eb](https://github.com/ecomfe/reskript/commit/80377eb36f044e829701cc3034e55a6d2c92684a))


### Features

* **build:** 支持自定义入口配置，如指定输出文件名 ([#56](https://github.com/ecomfe/reskript/issues/56)) ([84fa53b](https://github.com/ecomfe/reskript/commit/84fa53b72fedb041db77cf7f3b1c209823b185fb))
* **build:** 自动构建service worker ([#53](https://github.com/ecomfe/reskript/issues/53)) ([f1e42c5](https://github.com/ecomfe/reskript/commit/f1e42c5df7cf3b2fe1951f087530fe93096b3baf))
* **lint:** import-order规则支持node协议路径 ([#58](https://github.com/ecomfe/reskript/issues/58)) ([9ad4798](https://github.com/ecomfe/reskript/commit/9ad4798a992f58597daf3515f79e133a5c866a5c))
* **test:** skr test增加--collectCoverageFrom参数并可以指定测试文件范围 ([#63](https://github.com/ecomfe/reskript/issues/63)) ([0e996a3](https://github.com/ecomfe/reskript/commit/0e996a38fa3917b61550078bd94a8773248dfbe4))





# [1.4.0](https://github.com/ecomfe/reskript/compare/v1.3.1...v1.4.0) (2021-04-29)


### Bug Fixes

* **build:** less-safe-loader处理引号在calc内部的情况 ([#43](https://github.com/ecomfe/reskript/issues/43)) ([05acee8](https://github.com/ecomfe/reskript/commit/05acee8d95bf4e648c4c5842152feff4d1b27218))
* **build:** 在指定analyze参数时，产出包检查不应该强制退出构建 ([#49](https://github.com/ecomfe/reskript/issues/49)) ([d782f8c](https://github.com/ecomfe/reskript/commit/d782f8c3f321c61b33bbd3e3646c66e112aaf300))
* **dev-server:** proxy-domain有端口时的兼容处理 ([#47](https://github.com/ecomfe/reskript/issues/47)) ([5bf0b0c](https://github.com/ecomfe/reskript/commit/5bf0b0cb4b11d561ebc5810a755e776ca7d40d40))
* **init:** init支持与Gerrit兼容 ([#44](https://github.com/ecomfe/reskript/issues/44)) ([51fd87f](https://github.com/ecomfe/reskript/commit/51fd87fee8bcd2ad9816544cf053cf3f78cc2b79))
* **init:** init时没有把隐藏文件复制过去 ([#42](https://github.com/ecomfe/reskript/issues/42)) ([9124efb](https://github.com/ecomfe/reskript/commit/9124efbe1392285f8b5b61729d8809f55962ff60))


### Features

* **build:** 增加配置支持生成HTML时注入应用容器div ([#50](https://github.com/ecomfe/reskript/issues/50)) ([49633c5](https://github.com/ecomfe/reskript/commit/49633c5d1d19d5882b91750bf99c0077ff72d941))
* **lint:** import-order规则支持自动修复 ([#46](https://github.com/ecomfe/reskript/issues/46)) ([f59ee92](https://github.com/ecomfe/reskript/commit/f59ee92186692bae8778f25bb66b2f8e63baf46b))
* **lint:** 增加一个eslint规则检查hook调用的deps参数另起一行 ([#45](https://github.com/ecomfe/reskript/issues/45)) ([169f9f3](https://github.com/ecomfe/reskript/commit/169f9f333ef169d2b91e1b5d04638ed7c9fb9e80))





## [1.3.1](https://github.com/ecomfe/reskript/compare/v1.3.0...v1.3.1) (2021-04-26)


### Bug Fixes

* **build:** less-safe-loader处理嵌套的括号 ([#40](https://github.com/ecomfe/reskript/issues/40)) ([3f8564b](https://github.com/ecomfe/reskript/commit/3f8564b9a074e3aa87002bd914adefd91ae2fb95))





# [1.3.0](https://github.com/ecomfe/reskript/compare/v1.2.1...v1.3.0) (2021-04-25)


### Features

* **build:** 检查重复包的时候提示各引入位置的版本号 ([#38](https://github.com/ecomfe/reskript/issues/38)) ([8719c92](https://github.com/ecomfe/reskript/commit/8719c927c47a1028d8e97055fa9100d2077fd0b1))
* **build:** 重复包检测支持通配符匹配包名 ([ee0b906](https://github.com/ecomfe/reskript/commit/ee0b90636fa8bd2b2289157655a62ed41766da42))





## [1.2.1](https://github.com/ecomfe/reskript/compare/v1.2.0...v1.2.1) (2021-04-15)


### Bug Fixes

* config-webpack需要less-safe-loader的依赖 ([4ae2928](https://github.com/ecomfe/reskript/commit/4ae29282c18bdde075949d170eb599fdf6baa8b3))





# [1.2.0](https://github.com/ecomfe/reskript/compare/v1.1.0...v1.2.0) (2021-04-15)


### Bug Fixes

* **build:** 在指定analyze但没有build-target时报错退出 ([9b0c020](https://github.com/ecomfe/reskript/commit/9b0c020829787ada850d868f1a5308665aa19624))


### Features

* 在引入less时将不安全的calc自动修复 ([#35](https://github.com/ecomfe/reskript/issues/35)) ([92359f3](https://github.com/ecomfe/reskript/commit/92359f3545e8265cef6c85632456cc5969a8b139))
* 支持关闭自动生成displayName的功能 ([#34](https://github.com/ecomfe/reskript/issues/34)) ([938f121](https://github.com/ecomfe/reskript/commit/938f12141511eb5b131d8e8d7ee636ff33c6859e))
* 给build.finalize传递rules对象 ([#23](https://github.com/ecomfe/reskript/issues/23)) ([e5f94e1](https://github.com/ecomfe/reskript/commit/e5f94e17bb6e4d24d61ca35550198aede09a443e))
* **build:** 分析产出中重复引入的依赖包 ([#15](https://github.com/ecomfe/reskript/issues/15)) ([9e01f1e](https://github.com/ecomfe/reskript/commit/9e01f1eea1a2373b329edf544fefe25f95fa68b3))





# [1.1.0](https://github.com/ecomfe/reskript/compare/v1.0.0...v1.1.0) (2021-03-31)


### Bug Fixes

* **dev:** 调试时不使用自定义的publicPath ([10ba2fe](https://github.com/ecomfe/reskript/commit/10ba2febad2be7e83039ce2f89924c3c96347192))
* **settings:** 配置的校验里缺失publicPath字段 ([b0aea2a](https://github.com/ecomfe/reskript/commit/b0aea2ab47b9d70ef6819929e04ceab175a7daa7))


### Features

* **dev:** 支持proxyRewrite配置多API代理目标 ([#32](https://github.com/ecomfe/reskript/issues/32)) ([8f63fc1](https://github.com/ecomfe/reskript/commit/8f63fc1a27adab38437b3c2be63425a0e7ca281a))





# [1.0.0](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.37...v1.0.0) (2021-03-18)


### Bug Fixes

* **build:** less编译打开math兼容模式 ([721a992](https://github.com/ecomfe/reskript/commit/721a9929de232acffbee80109465622a887534e5))
* **cli:** 标准化程序的退出码 ([#30](https://github.com/ecomfe/reskript/issues/30)) ([86229a6](https://github.com/ecomfe/reskript/commit/86229a6d51cccfc2abbfaff3d6f36390f8ccf1dd))


### chore

* **build:** 更新less到4.x版本 ([48a9c00](https://github.com/ecomfe/reskript/commit/48a9c00345f09cbefdb51dd6474f3ab2925c6760))


### Features

* **build:** 分析构建产出的初始加载资源 ([#15](https://github.com/ecomfe/reskript/issues/15)) ([28a9009](https://github.com/ecomfe/reskript/commit/28a900963962680ea57bf9c50e20533d4880340d))
* **build:** 支持构建产物中初始资源的全部检查规则 ([#15](https://github.com/ecomfe/reskript/issues/15)) ([5d22227](https://github.com/ecomfe/reskript/commit/5d2222735fa3bd666b1d5f7675d723a07822723d))


### BREAKING CHANGES

* **build:** 具体变更参考[less 4.x的说明](https://github.com/less/less.js/releases/tag/v4.0.0)





# [1.0.0-beta.37](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2021-03-16)


### Features

* **build:** 构建后报告初始加载资源数量 ([4ecd9c6](https://github.com/ecomfe/reskript/commit/4ecd9c67b726ab195933f0a1413893e7122cccbd))
* **dev:** 支持指定入口进行调试 ([#28](https://github.com/ecomfe/reskript/issues/28)) ([284f141](https://github.com/ecomfe/reskript/commit/284f141d6f023336c51dc51f4b804d2970cda2a6))





# [1.0.0-beta.36](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2021-03-10)


### Bug Fixes

* **build:** --no-source-maps参数解析错误 ([9496c39](https://github.com/ecomfe/reskript/commit/9496c3903204449de867f30992a85e9d222b0569))
* **build:** 构建产出报告丢失 ([8e991ae](https://github.com/ecomfe/reskript/commit/8e991ae64afd75c472fdac8768cab3c7aa8954f3))





# [1.0.0-beta.35](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2021-03-10)


### Features

* **build:** 增加--entries-only参数指定构建的入口 ([#27](https://github.com/ecomfe/reskript/issues/27)) ([7496abc](https://github.com/ecomfe/reskript/commit/7496abc88fdb663bc559c7cfae12177cc14317d3))
* **build:** 增加--no-source-maps参数可在构建时关闭source map生成 ([2b58bac](https://github.com/ecomfe/reskript/commit/2b58bacc7441d8a4f7e9353d726fc38e8fca002e))
* 支持husky 5.x ([#26](https://github.com/ecomfe/reskript/issues/26)) ([6dd40f2](https://github.com/ecomfe/reskript/commit/6dd40f27aad406d61d4fa8eb517fc9d6e30edfbf))





# [1.0.0-beta.34](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2021-03-03)


### Bug Fixes

* **dev:** 当调试服务器启动出错时报告给用户并退出程序 ([#24](https://github.com/ecomfe/reskript/issues/24)) ([9fc7f5d](https://github.com/ecomfe/reskript/commit/9fc7f5dd494e38cae9e55708cacad1d3a2c73290))
* **init:** 没有发布templates导致初始化失败 ([9a5a2d2](https://github.com/ecomfe/reskript/commit/9a5a2d2b47f459c098b490458f4e57e1931a2b80))
* finalize部分属性强制有值 ([#21](https://github.com/ecomfe/reskript/issues/21)) ([bba9837](https://github.com/ecomfe/reskript/commit/bba9837691f36286979d5163cabd8496b59fcfec))


### Features

* 增加publicPath配置 ([#20](https://github.com/ecomfe/reskript/issues/20)) ([6c292a7](https://github.com/ecomfe/reskript/commit/6c292a78163c6d3e9fdf1fa6147e177d495aa35b))





# [1.0.0-beta.33](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.33) (2021-02-08)


### Bug Fixes

* **doctor:** 标记为公开包 ([21c47a1](https://github.com/ecomfe/reskript/commit/21c47a1b2ea3be54ea1ca75cff7e726d4d613e65))


### Features

* **init:** 初始化项目的工具 ([#7](https://github.com/ecomfe/reskript/issues/7)) ([951beb3](https://github.com/ecomfe/reskript/commit/951beb329c6c53eeea17b7bdee51b71022c7709b))





# [1.0.0-beta.32](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2021-02-08)


### Bug Fixes

* **doctor:** 标记为公开包 ([21c47a1](https://github.com/ecomfe/reskript/commit/21c47a1b2ea3be54ea1ca75cff7e726d4d613e65))


### Features

* **init:** 初始化项目的工具 ([#7](https://github.com/ecomfe/reskript/issues/7)) ([951beb3](https://github.com/ecomfe/reskript/commit/951beb329c6c53eeea17b7bdee51b71022c7709b))





# [1.0.0-beta.31](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2021-02-08)


### Bug Fixes

* **babel:** 仅用来转义的babel配置不应该替换core-js ([e94c38c](https://github.com/ecomfe/reskript/commit/e94c38c19f31ab120d61bb5bca7e9f5237b62fb8))
* **doctor:** 拼写错误 ([00be463](https://github.com/ecomfe/reskript/commit/00be46369826b6c6957e93ed3678c854d341a04d))
* **lint:** 删除团队内部的专有规则 ([d94eb0d](https://github.com/ecomfe/reskript/commit/d94eb0d7941191e41a300fc4a0c9c4d1408ce799))


### Features

* **doctor:** 增加检查项目合规的功能 ([#19](https://github.com/ecomfe/reskript/issues/19)) ([4cba664](https://github.com/ecomfe/reskript/commit/4cba6641fe30bd2f46dab9d2d4bfecaf74a67a1b))





# [1.0.0-beta.30](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2021-02-05)


### Bug Fixes

* **play:** Monaco的配置错误导致没有代码高亮 ([4185ab8](https://github.com/ecomfe/reskript/commit/4185ab854f6386d7e42d08a91b19e74c3c0be8bc))


### Features

* **play:** skr play支持自定义组件外层布局 ([#16](https://github.com/ecomfe/reskript/issues/16)) ([8813e40](https://github.com/ecomfe/reskript/commit/8813e40898945a0196ee136a5c935e32243f765a))





# [1.0.0-beta.29](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2021-02-05)


### Bug Fixes

* **config-lint:** eslint react插件指定17.0作为版本 ([867bde7](https://github.com/ecomfe/reskript/commit/867bde7737ec3f726e42cc4eecd1f11ae7e99262))
* **play:** skr-play配置错误 ([2bcebea](https://github.com/ecomfe/reskript/commit/2bcebea99e76d3cb943e5c4537c8fd1983fa90d8))





# [1.0.0-beta.28](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2021-02-03)


### Bug Fixes

* **babel:** skr babel不应该替换core-js的引用 ([0c24ccd](https://github.com/ecomfe/reskript/commit/0c24ccd404c806e6d49ea8b19338e32d59e1aba8))
* **play:** 入口文件路径错误 ([a320b22](https://github.com/ecomfe/reskript/commit/a320b226fd2a7c17fbbbdf97d1c84b5f2de6b427))


### Features

* **babel:** 增加skr babel命令 ([#8](https://github.com/ecomfe/reskript/issues/8)) ([bf9ba53](https://github.com/ecomfe/reskript/commit/bf9ba533652c2bdd11375f2058a21e9de99c8885))





# [1.0.0-beta.27](https://github.com/ecomfe/reskript/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2021-01-28)


### Features

* **play:** skr play功能 ([#11](https://github.com/ecomfe/reskript/issues/11)) ([5a2e7ea](https://github.com/ecomfe/reskript/commit/5a2e7eaf6bbe84c9f1ec2cb8dc4e41bdd5388419))





# 1.0.0-beta.26 (2021-01-27)


### Bug Fixes

* 使用contenthash代替已经过时的hash ([39959a0](https://github.com/ecomfe/reskript/commit/39959a0f2f8c38cb08086ab0cdda5e7404bd89e2))
* 修复UT在GitHub Actions上不能跑的问题 ([a05c1fd](https://github.com/ecomfe/reskript/commit/a05c1fd72d095d2776372e4097055d5f74492657))


### Features

* 修改配置文件名 ([22555e4](https://github.com/ecomfe/reskript/commit/22555e4cc14467543669e5f8b85d5bb7b627f9e7))
* 增加对finalize的返回值的校验 ([#10](https://github.com/ecomfe/reskript/issues/10)) ([a81a043](https://github.com/ecomfe/reskript/commit/a81a0436aa62f36483bfe930915cc33943ddc931))


### BREAKING CHANGES

* 配置文件名从`settings.js`改为了`reskript.config.js`
