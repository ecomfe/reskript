---
title: 编写组件
---

在[第一个应用](./quick-start)中我们已经运行了一个简单的应用，当然一个应用不可能只有一个`App`组件。在本章我们就尝试来增加几个组件，做一个相对更漂亮的应用出来。

在这一章，你会了解到如何编写一个纯JavaScript的组件，并了解到`reSKRipt`在引入模块时的特殊配置和行为。

## 引入组件库

我们把`antd`安装上，这可以帮助我们快速地搭建出页面。并且我们把`styled-components`也给装上，让我们能够快速地写一些样式：

```shell
npm install antd styled-components
npm install --save-dev @types/styled-components
```

## 把组件从入口移出来

在上一个版本中，我们将`App`实现在了`src/entries/index.tsx`中。但这种方式并不是最佳的，入口应该保持精简，避免逻辑的膨胀。所以我们现在打算把`App`组件移出来作为一个独立的模块。

先建立一个`src/components/App/index.tsx`文件，当然中间需要创建的目录请自动搞定。在这之后你的目录结构应该类似于（隐去了配置文件们）：

```
/src
    /components
        /App
            index.tsx # 组件
    /entries
        index.tsx # 主入口文件
```

然后我们将其中的实现移到`App/index.tsx`中去：

```tsx
import {FC} from 'react';

const App: FC = () => (
    <h1>Hello World</h1>
);

export default App;
```

之后`entries/index.ts`只要引入组件就行了：

```tsx
import {render} from 'react-dom';
import App from '@/components/App';

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
```

你应该注意到引用`App`组件的路径是`@/components/App`，你也应该已经理解了，`@/`是`src/`的别名，所有`src/`下的模块都可以用这种形式访问到。这也是`reSKRipt`唯一的别名。

## 再加几个组件

我们在`App`组件的基础上，再来增加几个自定义组件，我们相应创建头部、描述、底部：

```
/src
    /components
        /App
            index.tsx
        /Header
            index.tsx
        /Description
            index.tsx
        /Footer
            index.tsx
```

可以随便写一些内容，比如我们这样实现一个`Footer`组件：

```tsx
import {FC} from 'react';
import styled from 'styled-components';
import {Typography} from 'antd';

const Layout = styled`
    position: sticky;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
`;

const Footer: FC = () => {
    const now = new Date();

    return (
        <Layout>
            <Typography.Text>Copyright {now.getFullYear()} all rights reserved.</Typography.Text>
        </Layout>
    );
};
```

在上面的代码中，我们使用了`styled-components`和`antd`。事实上`reSKRipt`在这两个第三方库上都有相应的优化，其中**`styled-components`生成的组件会有自动的`displayName`**用于更好地调试，而**`antd`的引用则会被优化精简，不会引入完整的`antd`代码**，可以有效地控制产出的体积。

我们也可以在`App`中重新引入这些组件组成一个完整的页面：

```tsx
import {FC} from 'react';
import Header from '@/components/Header';
import Content from '@/components/Content';
import Footer from '@/components/Footer';

const App: FC = () => (
    <>
        <Header />
        <Content />
        <Footer />
    </>
);

export default App;
```

我们推荐对于`src/`下第一层的目录内的模块，比如`src/components/*`，都使用`@/`的形式引用。这样你在代码位置发生变化的时候，可以尽可能地不需要调整`import`的相对路径。

## 总结

在本章节中，我们了解到在编写一个组件在`reSKRipt`的支持下十分容易，不需要关注具体的构建等配置，同时工具提供了以下的能力：

- 可以使用`@/`来指代`src/`作为别名。
- 推荐最顶层的组件各自有独立的目录，并以`src/components/SomeComponent/index.tsx`的形式存在。
- 可以直接使用`styled-components`，在构建过程中有相应的插件等提供帮助。
- 引用`antd`时有相应的优化，会只引入对应的组件，控制包的大小。
