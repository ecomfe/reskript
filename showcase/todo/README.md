# TodoMVC

简单的测试`reSKRipt`各功能。

## 启动方式

用[mkcert](https://github.com/FiloSottile/mkcert)生成一下证书：

```shell
mkcert -install # 如果以前执行过，就不用了
mkcert localhost
```

随后确认有`localhost-key.pem`和`localhost.pem`两个文件。

## 基准测试

1. `npm start`可以跑起来，界面可见，正常使用。
    1. 界面上有一个固定在底部的黑色条（测试自定义模板可用）。
    2. 热更新可用。
2. `npm run play`可用，有热更新。
3. `npm run babel`可用，会显示高亮的代码。
3. `npm run test`可通过测试。
4. `npm run lint`可用。
5. `npm run build`可用，且产出的文件里有一个`todo-index.[hash].js`的文件。
6. 把`reskript.config.cjs`中的`{prepend: true}`去掉，构建应该会失败。
7. `App`对应的HTML元素的`inset`样式被正确处理为`top`、`right`、`bottom`、`right`。
