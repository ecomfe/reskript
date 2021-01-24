---
title: 编写样式
sort: 4
---

reSKRipt支持且仅支持使用[less](http://lesscss.org/)来编写样式。

在构建过程中，默认开启了[CSS Modules](https://github.com/css-modules/css-modules)。对于正常的`.less`文件，可以通过3种方式来使用样式。

## 自动className

构建过程会自动将一个样式文件导出为一个函数，通常我们称之为`c`函数：

```jsx
// src/components/Card/index.js
import c from './index.less';

const Card = ({label}) => (
    <div className={c('root')}>
        <span className={c('label')}>
            {label}
        </span>
    </div>
);
```

通过调用`c('root')`，会返回`index.less`中`.root`这个类在CSS Module处理后的唯一类名。`c`函数是[classnames库的bind函数](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules)生成的，因此它具备`className`的所有能力。

这种方式是我们推荐的样式使用形式。

## 样式对象（不推荐）

当你引入一个`.less`文件时，它除了是一个`c`函数外，还包含了各个css class对应的名称，因此也可以这样写代码：

```jsx
// src/components/Card/index.js
import styles from './index.less';

const Card = ({label}) => (
    <div className={styles.root}>
        <span className={styles.label}>
            {label}
        </span>
    </div>
);
```

这种使用方法与CSS Modules官方推荐的方法相近，但在构造比较复杂的`className`属性时会有比较多的代码，因此我们并不推荐。
