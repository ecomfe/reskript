# @reskript/cli-lint

通过eslint检查代码规范。

## 正常使用

使用`skr lint`检查代码规范。

```
Usage: lint [options] [files...]

Lint files, by default .js(x) files under src are linted

Options:
  --changed                    lint only changed files in git workspace
  --staged                     lint only staged (both partially and fully) files in git workspace
  --allow-unsafe-react-method  allow UNSAFE_* methods in react component
  --fix                        fix possible lint errors
  -h, --help                   output usage information
```

### 缩小检查范围

对于比较大型的项目，通常全量的检查很消耗时间，此时可以选择仅检查已经修改过的代码：

```
skr lint --changed
```

也可以进一步缩小范围，仅检查通过`git add`添加到版本中的代码：

```
skr lint --staged
```

### 使用git钩子进行检查

推荐使用[husky](https://www.npmjs.com/package/husky)在代码提交前对代码进行检查。

首先安装husky:

```
npm install --save-dev husky
```

随后在`package.json`中增加以下内容：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "skr lint --staged"
    }
  }
}
```

在每次`git commit`提交代码时，都会检查需要提交入库的代码。

## 直接使用lint配置

如果你需要直接使用eslint的规则，比如通过编辑器的eslint插件进行代码的实时检查，则需要放置一个`.eslintrc.js`配置文件并引用`@reskript/config-lint`的规则，具体请参考[config-lint的说明](../config-lint)。
