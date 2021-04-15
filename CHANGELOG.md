# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
