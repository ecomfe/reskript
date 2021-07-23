---
title: 管理自定义环境变量
---

`reSKRipt`允许使用`.env*`文件管理自定义的环境变量。

## 环境变量文件

`reSKRipt`会使用以下顺序依次加载环境变量文件，其中`{mode}`部分为`--mode`参数对应的`development`或`production`：

```
.env
.env.{mode}
.env.local
.env.{mode}.local
```

如果当前项目是一个monorepo，则会额外再读取仓库根目录下的相关文件，顺序为：

```
/.env
/.env.{mode}
/.env.local
/.env.{mode}.local
/packages/{package}/.env
/packages/{package}/.env.{mode}
/packages/{package}/.env.local
/packages/{package}/.env.{mode}.local
```

:::caution
不要在`.env.*`文件中放置任何敏感信息，不要将`.env.*.local`文件提交到远程仓库中。
:::

## 环境变量展开

`reSKRipt`使用[dotenv-expand](https://www.npmjs.com/package/dotenv-expand)展开环境变量，如你在`.env`中有以下内容：

```
API_BASE_UEL=/api
CANARY_API_BASE_URL=$API_BASE_URL/canary
```

则最终`CANARY_API_BASE_URL`的值会变为`/api/canary`。

