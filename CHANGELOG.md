# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
