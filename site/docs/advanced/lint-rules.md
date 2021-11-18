---
title: 额外的编码规范
---

除了沿用[@ecomfe/eslint-config](https://github.com/ecomfe/eslint-config)的编码规范外，为了让React应用更加可靠、可读，`reSKRipt`额外内置了几个编码规范。

## import-order

`@reskript/import-order`规则检查一个文件中的`import`语句是否按照被引入模块的分类、位置等信息排序，要求的顺序从前往后如下：

1. Node协议，如`node:fs`、`node:child_process`等。
2. 内置模块，包括`fs`、`path`等，**对于这一类路径，推荐使用Node协议引入。**
3. 第三方包，即通过`npm install`安装的在`node_modules`下的部分。
4. 受别名控制的，特指为`@/`开头的模块路径。
5. 相对路径，要求距离从远到近排列，即`../../foo`要在`../bar`前面，两都均要在`./utils`前面。

以下是**错误**的示例：

```ts
import utils from '../utils';
import {mapBy} from 'lodash';
```

```ts
import Label from '@/components/Label';
import {render} from 'react-dom';
```

## no-excessive-hook

这条规则检测一个名称上像是hook的函数并不是真正的hook，即它没有调用任何其它形式为hook的函数。

这条规则主要用来防止对hook的滥用，以便正确区分hook和工具函数。

以下是**错误**的示例：

```ts
// 没有使用任何hook，是个纯粹的工具函数
const useJoinedValue = (value: Array<string | null | undefined>[]) => {
    const hasValueArray = value.filter(v => v !== null);
    return hasValueArray.join(' | ');
};

// 虽然和React的Suspense概念紧密相关，但依然不是一个hook
const useScriptSuspense = (src: string) => {
    const script = document.createElement('script');
    script.src = src;
    const executor = (resolve: () => void, reject: () => void) => {
        script.addEventListener('load', resolve);
        script.addEventListener('error', reject);
    };
    throw new Promise(executor);
};
```

## hooks-deps-new-line

这条规则强制要求在调用如`useMemo`这样带有依赖数组的hook时，依赖数组必须单独一行书写。

以下是**错误**的示例：

```ts
// 没有清晰的换行
useEffect(() => {
    (async () => {
        const response = await api.listUsers();
        setUsers(response);
    })();
}, []);

// 即便全写在一行也不行
const names = useMemo(() => users.map(u => u.name), [users]);
```

以下是**正确**的示例：

```ts
useEffect(
    () => {
        (async () => {
            const response = await api.listUsers();
            setUsers(response);
        })();
    },
    []
);

const names = useMemo(
    () => users.map(u => u.name),
    [users]
);
```

**注：本规则与`prettier`格式化的结果可能不相符，但本规则配合`indent`规则后加`--fix`可以修复代码规范，因此如果需要，推荐在`prettier`后再跑`skr lint --fix`。**

## spell-check

这条规则用来检查一个变量名称是否存在[常见的单词拼写错误](https://en.wikipedia.org/wiki/Wikipedia:Lists_of_common_misspellings/For_machines)。

以下是**错误**的示例：

```ts
// name 拼写错误
const userNmae = user.name;

// original 拼写错误
const originallName = user.name;
```

以下是**正确**的示例：

```ts
const userName = user.name;

const originalName = user.name;
```

## 项目配置

你可以在ESLint配置中的`settings`字段中增加一个`localPackageNames`字段：

```js
module.exports = {
    extends: require.resolve('@reskript/config-lint/config/eslint'),
    settings: {
        localPackageNames: [
            '@i/*',
        ],
    },
};
```

这个字段用来声明哪些包属于你本地的包。

在一个monorepo项目中，有一些包虽然并不是用相对路径引用的，但它们依然是存放在本地，而不是从NPM镜像上安装的。从顺序上来说，这些包的`import`位置应该在第三方包之后、本地别名（即`@/*`）之前。

`localPackageNames`配置支持一系列的字符串，每一个字符串可以是以下2种情况：

- 一个完整的包名，比如`@i/util`，则所有`@i/util`和`@i/util/*`都被认为是本地包。
- 在最后放置`*`符号，则表示别名匹配，如`@i/*`则表示所有`@i/`开头的引用路径都被视为本地包。

当你使用monorepo时，我们建议本地包都用一个作用域，推荐用`@i`作为前缀，则配置值为`@i/*`即可。


## useless-memoized-hooks

检查`useCallback`，如果遇到符合下列全部情况时，告警。

1. `useCallback`函数体仅有一个调用函数，且`dependency`仅有一个是调用函数；
2. 调用函数无参数。

规则内容：
```js
// good code
const handleCancel = useCallback(() => {
    hideModal();
    close();
}, [hideModal, close]);
const handleAdd = useCallback(() => addCount(1), [addCount]);

// bad code
const handleCancel = useCallback(() => hideModal(), [hideModal]);
```