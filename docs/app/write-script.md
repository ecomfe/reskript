---
title: 编写JavaScript
order: 3
---

你可以在任意JavaScript文件中实现组件，但我们推荐使用`src/components`放置所有组件的实现。

## 语法及规则

`reSKRipt`通过babel提供新标准语法的支持，通常支持stage-2以上的语法。

编译的语法范围会由浏览器兼容性的配置决定，默认配置为支持Chrome 60+及Safari 11+。

所有`src`目录下的文件会被编译，其它文件夹中的JavaScript文件不会编译，因此所有源码需要放置在`src`目录下。

代码无需区分JS与JSX，建议默认使用`.js`为后缀。

当一个JavaScript文件以`.worker.js`作为扩展时，会通过[worker-loader](https://github.com/webpack-contrib/worker-loader)编译为一个Web Worker类。

## 关于React依赖

在React组件的实现中，为了将JSX编译到`React.createElement`，需要引入React对象：

```jsx
import React from 'react';

const Card = ({id, label}) => (
    <div>
        {id}: {label}
    </div>
);
```

在上述代码中，虽然我们并没有使用`React`对象，但它必须被引入。

`reSKRipt`在构建过程中，会自动为你引入`React`对象，因此上面代码中的`import React from 'react';`是不需要的，仅当你需要特写的React下的函数时，才需要手动引入：

```jsx
import {useState} from 'react'; // 同样，不需要单独引入React

const Card = ({id, label}) => {
    const [value, setValue] = useState('');

    // ...
};
```

## 关于displayName

在React中，[displayName](https://reactjs.org/docs/react-component.html#displayname)是一个重要的用于调试的属性。我们通常需要为组件加上相应的`displayName`属性，便于在开发者工具中看到组件的名称以定位问题。

`reSKRipt`集成了自动添加`displayName`的能力，默认情况下，你不需要为组件手动添加`displayName`属性，构建过程会自动处理，以下形式的类或函数会被认为是组件：

- 继承了`Component`或`PureComponent`的类。
- 使用`PascalCase`命名的函数，包括具名函数以及赋值给符合命名规则的函数或属性的函数表达式。
- 默认导出一个函数时，对应的文件名符合`PascalCase`格式，或文件名为`index`但其所在目录名符合`PascalCase`格式。
