---
title: 本地调试
---

在成功地阅读之前的章节后，相信你现在已经可以在源码上搞定项目结构、组件、样式、图片等的编写，一个纯前端的应用开发已经不再是难事了。

但一个完整可用的应用，肯定不仅仅是前端的部分，往往我们会有一系列的后端服务通过HTTP接口提供数据，前端需要去调用这些服务。

在本章节，我们将介绍如何让前端的应用与后端关联上，并在本地进行相关的调试。

## 找到后端服务

考虑到完整实现一个后端服务并不在我们开发前端应用的范围里，本章节也不打算介绍`exprss`或者`koa`的使用，我们就在社区里找一个现成的可直接使用的接口来演示。

参考`antd`的示例，我们找到了一个用来生成随机用户信息的接口：https://randomuser.me/。它的API大致如下：

```
GET https://randomuser.me/api?results=10&page=1
```

其中使用`results`参数指定一页返回的条目数，用`page`参数指定返回的页码。

我们先将它认为是我们的后端服务，即这个API和我们的前端应用存在于同一个域名下。因此我们在后续的内容中并不会直接从前端调用这个URL，而是介绍通过`reSKRipt`内置的`webpack-dev-server`来将部分请求代理到这个服务上。

## 配置代理

打开项目中的`reskript.config.{mjs|ts}`，可以找到原本的`devServer`配置。在最初的[第一个应用](./quick-start)章节中，我们仅在这个对象中声明了`port`属性。此刻，我们为它加上几个新的配置：

```ts
export default configure(
    'webpack',
    {
        devServer: {
            port: 8081,
            https: true,
            apiPrefixes: ['/api'],
            defaultProxyDomain: 'randomuser.me',
        },
    }
);
```

你可以在[配置-调试服务器](../settings/dev-server#代理api)中看到这些配置的说明。简单解读上面的配置，就是：

> 将`/api`为前缀的URL的请求，均代理到`randomuser.me`这个域名下，且代理时使用HTTPS协议。

对应的，`localhost:8081/api/list`会被代理到`randomuser.me/api/list`，所有的参数也会被透明地传递过去。

**在修改`reSKRipt`配置文件后，如果你原本已经在命令行中运行了`skr dev`，它会自动地完成重启，应用最新的配置，你不需要去关注它的状态。**

## 编写请求和组件

我们尝试来实现一个用户的列表，将它放到`src/components/UserList/index.tsx`中：

```tsx
import {useState, useEffect} from 'react';
import {Table} from 'antd';

interface User {
    gender: string;
    name: {
        first: string;
        last: string;
    };
    email: string;
    login: {
        uuid: string;
    };
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: ({first, last}: User['name']) => `${first} ${last}`,
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];

const rowKey = (record: User) => record.login.uuid;

export default function UserList() {
    const [users, setUsers] = useState(null);
    useEffect(
        () => {
            (async () => {
                const response = await fetch('/api?results=10');
                const {results} = await response.json();
                setUsers(results);
            })();
        },
        []
    );

    return (
        <Table
            loading={users === null}
            dataSource={users ?? []}
            columns={columns}
            rowKey={rowKey}
            pagination={false}
        />
    );
}
```

接着尝试自行将它添加到`App`组件中，并在浏览器中观察最终页面的效果。

打开浏览器的开发者工具并刷新页面，你将看到一个`/api?results=10`的请求，它的返回内容与`randomuser.me`上的接口完全一致。`reSKRipt`已经将这个路径代理到了通过`defaultProxyDomain`配置的远程域名上。

至此，你已经可以成功地向后端的服务发起请求，获得响应并渲染相应的组件。当然你可以使用`axios`等工具库来管理你的请求，也可以在`apiPrefixes`配置中增加更多的需要代理到后端的URL前缀。

## 总结

本章节展示了前端应用与后端服务连通的方式，可以看到`reSKRipt`的一系列功能：

- 通过`reskript.config.{mjs|ts}`中的`devServer`可以配置指定的URL前缀代理至后端，也可以配置后端服务的所在域名。
- 被代理的请求将完全透明地返回后端的响应，前端可以接收响应后进行视图的开发。
