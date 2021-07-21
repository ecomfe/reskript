---
title: 构建Service Worker
---

[Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers)可以协助你提供丰富的离线体验，`reSKRipt`同样支持简单地构建Service Worker。

如果你需要构建一个Service Worker，只需放置一个`src/service-worker.js`文件。

:::caution
当前仅支持`.js`后缀，不支持`.ts`等其它格式。
:::

## 无需注册

该文件在构建后会生成`dist/assets/service-worker-{target}.js`，如`dist/assets/service-worker-stable.js`。通常你不需要做任何额外的工作，**`reSKRipt`会自动帮你在HTML页面中生成一段注册该Service Worker的脚本**，大致如下：

```html
<script>
if ('serviceWorker' in navigator) {
    window.addEventListener(
        'load',
        function () {
            navigator.serviceWorker.register('/assets/service-worker-insiders.js');
        }
    );
}
</script>
```

对应的Service Worker脚本路径会自动根据构建环境生成，你不需要关心其中的细节。

## 自动注入资源缓存

我们推荐你在`src/service-worker.js`中放置以下内容：

```javascript
// TODO: 修改版本到最新，用npm info workbox-cdn version可获取最新版本
const CDN_URL_BASE = 'https://code.bdstatic.com/npm/workbox-cdn@5.1.4/workbox';
importScripts(`${CDN_URL_BASE}/workbox-sw.js`);
workbox.setConfig({debug: false, modulePathPrefix: `${CDN_URL_BASE}/`});

const {precacheAndRoute} = workbox.precaching;
precacheAndRoute(self.__WB_MANIFEST);
```

注意上面代码中的`precacheAndRoute(self.__WB_MANIFEST)`部分，其中的`self.__WB_MANIFEST`会被替换为一系列构建产出的资源路径，因此你只需要上面的代码，就可以自动完成各个资源的预缓存，快速生成一个Service Worker的实现。
