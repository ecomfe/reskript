---
title: 使用Web Worker
---

`reSKRipt`内置了对[Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)的支持，本文会简单地介绍如何快速地编写一个worker。

## 编写worker

在`reSKRipt`中，如果一个脚本文件以`.worker.{ts,js}`作为后缀，则会默认被编译成一个Web Worker的实现。这一功能使用[worker-loader](https://github.com/webpack-contrib/worker-loader)实现。

简单来说，你只需要在你的`xxx.worker.ts`中编写以下内容：

```ts
const ctx: Worker = self as any;

ctx.postMessage({foo: 'foo'});
ctx.addEventListener('message', event => console.log(event));
```

在使用`skr build`或`skr dev`时，这个文件会自动编译成一个Web Worker类。使用方可以按如下的方式去使用：

```ts
import MyWorker from './xxx.worker';

const worker = new Worker();

worker.onmessage = event => {
    // ...处理事件
};
```

具体的API请参考[Web Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)了解。

## 关于强类型

默认情况下，由于TypeScript并无法知道`.worker.ts`会被编译成一个Web Worker类，通过`import`引用它时的类型推断是错误的。

你可以在项目的公共类型文件夹里（我们推荐用`src/interface`这个文件夹）里增加一个`worker.d.ts`文件，包含以下内容：

```ts
declare module "*.worker.ts" {
    class WebpackWorker extends Worker {
        constructor();
    }

    export default WebpackWorker;
}
```

依靠这个类型声明，TypeScript可以将`.worker.ts`文件识别为一个类，当然依旧无法推导出强类型的事件类型等。
