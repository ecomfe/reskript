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
