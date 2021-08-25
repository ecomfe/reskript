# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v1.15.2...v2.0.0-beta.1) (2021-08-25)


* feat(dev)!: 支持webpack-dev-server 4版本 (#123) ([40f0478](https://github.com/ecomfe/reskript/commit/40f047851e36c37e1f572e4945d9872e1bc11edf)), closes [#123](https://github.com/ecomfe/reskript/issues/123)
* fix(build)!: 由用户自行安装core-js (#137) ([9af1569](https://github.com/ecomfe/reskript/commit/9af1569255ae166771be8a0ccaef4e133b5bc7d9)), closes [#137](https://github.com/ecomfe/reskript/issues/137)


### Features

* **build:** 增加严格模式开关 ([#54](https://github.com/ecomfe/reskript/issues/54)) ([3e00afc](https://github.com/ecomfe/reskript/commit/3e00afc503371412a30260c5a836935b47b7eb60))
* 支持tailwind ([#119](https://github.com/ecomfe/reskript/issues/119)) ([d636c80](https://github.com/ecomfe/reskript/commit/d636c804ddfbaae00674682a86cec5ec32ff9265))


### BREAKING CHANGES

* `webpack-dev-server`更新至`4.x`版本，具体参考[官方迁移指南](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)
* `devServer.hot`的类型修改为`boolean`
* `config-babel`的`hot`配置类型修改为`boolean`
* 不再处理`core-js`的引入，用户必须在项目中自行安装`core-js@3`





## [1.15.2](https://github.com/ecomfe/reskript/compare/v1.15.1...v1.15.2) (2021-08-24)

**Note:** Version bump only for package @reskript/showcase-todo
