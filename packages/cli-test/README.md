# @reskript/cli-test

使用jest进行单元测试。

## 正常使用

使用`skr test`测试。

```
Usage: test [options]

Test

Options:
  --cwd [value] override current working directory (default: process.cwd())
  --coverage  indicates test coverage information
  --watch     watch files for changes and rerun tests related to changed files
  --target [value] specify test environment of the project is "react" or "node" (default: "node")
  --changedSince [value] runs tests related to the changes since the provided branch. (default: '')
  -h, --help  output usage information
```

`skr test`会自动搜索所有`__tests__`目录下`.test.js`结尾的文件运行，建议的文件结构为：

```
/__tests__
    * util.test.js
util.js
```

然后在`util.test.js`如下编写单元测试：

```js
import {add} from '../util';

describe('add', () => {
    test('1 + 2 = 3', () => {
        expect(add(1, 2)).toBe(3);
    })
})
```

## 自定义配置

如果需要基于内置的jest配置继续自定义，请参考[config-jest的说明](../config-jest)。
