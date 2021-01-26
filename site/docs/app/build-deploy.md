---
title: 构建与部署
---

在成功地阅读之前的章节后，相信你现在已经可以在源码上搞定项目结构、组件、样式、图片等的编写，也已经成功与后端服务进行了对接，可以顺利地开发一个完整的应用了。我们还差最后一步：将源码构建成最终的可发布内容，并部署到线上。

## 构建系统

基本上，如果你可以通过`skr dev`看到完整的应用，并在本地顺利地调试，那么最终构建也不会出现什么问题。观察你的`package.json`中的`scripts`字段，你会看到对应的构建命令：

```shell
skr build --clean
```

这个命令指定`reSKRipt`进行构建，并在构建前删除上一次构建的产出，避免最终发布多余的内容。

现在尝试运行`npm run build`，稍作等待后你会看到命令行中有类似的输出：

```
         ../index-stable.html 0.32KB
index.13ca8b2ed219ed695f6f.js 635.43KB initial

Total initial size: 651 kB (not gzipped)
```

这一段将告诉你最终产出的内容，以及系统初始加载的资源的体积。

所有的产出内容将放在`dist`目录中，这在[第一个应用](quick-start)中已经做过了说明。

## 部署产出

如果你需要部署最终的产物，则可以将`dist`目录内的所有内容放置到线上服务中。如果你使用nginx作为静态资源的服务器，一个可行的`nginx.conf`大致如下：

```conf
#user  nobody;
worker_processes  1;

events {
    worker_connections  1024;
    use epoll;
}

http {
    include mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    keepalive_timeout  65;

    # gzip  on;
    server {
        listen 80;
        server_name  _;
        charset utf-8;
        proxy_redirect off;
        proxy_connect_timeout   10;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        location /static {
            expires 1y;
            root /etc/nginx/html;
        }

        location / {
            expires -1;
            root /etc/nginx/html;
            try_files $uri $uri/ /index.html;
        }
    }
}
```

根据上述的配置，将`dist`目录下的内容都放置在`/static`目录下即可。

## 总结

本章简单描述了将源码构建为最终产物，并通过nginx输出到用户浏览器的方案。

当然你可以选择其它的服务器实现，`skr build`产出的是静态的文件，并无任何特殊之处。
