/* global importScripts, workbox */
const CDN_URL_BASE = 'https://code.bdstatic.com/npm/workbox-cdn@5.1.4/workbox';
importScripts(`${CDN_URL_BASE}/workbox-sw.js`);
workbox.setConfig({debug: false, modulePathPrefix: `${CDN_URL_BASE}/`});

const {precacheAndRoute} = workbox.precaching;
// eslint-disable-next-line no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);
