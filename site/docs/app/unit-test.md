---
title: 单元测试
---

单元测试可以有效的保证代码的质量，作为工程的推崇者，`reSKRipt`自然也包含了单元测试的能力。本章将以一个组件为案例，简单地讲述如何进行单元测试。

## 准备依赖

由于单元测试并不是一个必备的步骤，所以我们在[第一个应用](./quick-start)一章中并没有安装相关的依赖，在此补上我们必备的包：

```shell
npm install --save-dev @reskript/cli-test @testing-library/react
```

随后我们在`package.json`中的`scripts`里增加一条运行测试的命令：

```json
{
  "scripts": {
    "test": "skr test --target=react"
  }
}
```

这一命令让`reSKRipt`检查项目中全部的单元测试并运行，且通过`--target=react`参数要求单元测试环境支持组件的渲染。具体的命令可以参考[命令行 - 执行单元测试](../cli/test)来了解详情。

## 增加单元测试

以原先的`src/components/Header`目录为例，我们**推荐单元测试与实现尽可能地放在一起**，并且对于单元测试的文件有以下要求：

- 单元测试要放在名为`__tests__`的目录下。
- 测试的文件名以`.test.js`为后缀。

因此，我们先建立`src/components/Header/__tests__`目录，并在其中增加一个`index.test.js`文件用作对`src/components/Header/index.tsx`的测试。可以看到我们的测试文件与实现源码是同名的，仅仅后缀有所区别，这样能让你更好地确认每一个测试是针对哪些内容的。

我们基于[`@testing-library/react`](https://testing-library.com/docs/react-testing-library/example-intro)实现一个最简单的测试：

```ts
import {render} from '@testing-library/react';
import Header from '../index';

test('render', () => {
    const {container} = render(<Header />);
    // 要渲染出一个div元素
    expect(container.querySelector('div')).toBeTruthy();
});
```

## 运行测试

现在我们已经有了一个组件相应的单元测试，运行`npm run test`来看看结果：

```
 PASS  src/components/Header/__tests__/index.test.js
  ✓ render (18 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.506 s, estimated 3 s
Ran all test suites.
```

可以看到我们的单元测试文件被正确地定位到，执行了单元测试并输出了相应的结果。

现在我们进一步地将`package.json`中的命令完善一下：

```json
{
  "scripts": {
    "test": "skr test --target=react -- --coverage"
  }
}
```

通过增加`--coverage`参数，再用`npm run test`试着运行一下：

```
 PASS  src/components/Header/__tests__/index.test.js
  ✓ render (19 ms)

-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |    7.14 |        0 |   16.67 |    7.69 |
 components/App    |       0 |        0 |       0 |       0 |
  index.tsx        |       0 |        0 |       0 |       0 | 16-47
 components/Header |     100 |      100 |     100 |     100 |
  index.tsx        |     100 |      100 |     100 |     100 |
 entries           |       0 |      100 |     100 |       0 |
  index.tsx        |       0 |      100 |     100 |       0 | 4
-------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.196 s
Ran all test suites.
```

除了测试的结果外，我们又得到了一份覆盖率的报告。当然这上面显示的覆盖率非常的不理想，在实际的应用中还记得好好提高覆盖率哦。

你还可以打开`coverage/lcov-report/index.html`看到每个文件的覆盖率情况，能帮助到你更好地完善单元测试。

**如果你有单元测试，记得把`/coverage`加到`.gitignore`中，这个文件不应该被提交到仓库里。**

## 总结

这一章讲述了如何针对应用编写单元测试，值得注意的是：

- 测试文件需要放在`__tests__`目录中且以`.test.js`结尾。
- 尽量让单元测试与具体的实现放在一起。
- 可以使用`--coverage`输出覆盖率来看到当前单元测试的质量。
