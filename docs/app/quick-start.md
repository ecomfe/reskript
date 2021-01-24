---
title: 快速开始
order: 1
---

首先建立一个新的目录，并使用`yarn init`进行初始化：

```shell
mkdir hello-world
yarn init -y
```

然后安装`reskript`和一些`react`必须的依赖：

```shell
yarn add react react-dom
yarn add -D reskript
```

使用`skr satisfy`命令来为你初始化一下目录：

```shell
skr satisfy --type=app
```

这会为你安装`webpack`、`husky`等依赖，同时生成一系列的配置文件。这个命令会在根目录下生成一个`settings.js`文件，现在我们不需要去关心它的内容和作用。

随后，在目录下建立以下的结构：

```
/hello-world
    /src
        /entrise
            index.js
    settings.js
```

在`src/entries/index.js`中实现一个最基本的react入口：

```javascript
import {render} from 'react-dom';

render(
    <div>
        Hello World
    </div>,
    document.body.appendChild(document.createElement('div'))
);
```

最后，使用以下命令尝试启动你的系统：

```shell
skr dev
```

你将可以在浏览器中看到你的系统。
