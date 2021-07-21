# @reskript/cli-build

用于使用webpack构建应用。

## 基础目录结构

构建系统对目录结构有一定要求，必须包含以下部分：

```
/src
    /styles
        *.global.less # .global.less文件不会经过CSS Modules编译，可放置一些全局的样式
        *.var.less # .var.less会被提取作为LESS编译时的变量，内部仅可声明变量（以及注释）
    /entries
        index.js # 主入口
reskript.config.js # 系统配置文件
```

其中`*.global.less`事实上可以放置在任意位置，只要是以`.global.less`结尾的，均不会经过CSS Modules处理。

## 正常使用

默认情况下，你可以在项目结构符合约束的情况下，直接进行构建：

```
Usage: build [options]

Build entire app

Options:
  --cwd [value]           override current working directory (default: process.cwd())
  --mode [value]          set build mode, default to "production" (default: "production")
  --src-dir [value]       specify the dir containing source files relative to cwd (default: "src")
  --build-target [value]  create index.html according to specific target
  --feature-only [value]  build named feature only, ignore other features
  --analyze               enable bundle analytics
  --profile               enable react profiling mode
  --clean                 remove dist directory before build
  -h, --help              output usage information
```

默认基于Feature Matrix构建，需要线上的Nginx等服务器配合分流。如果没有这一能力，则需要指定`--build-target`参数，该参数指定的Feature集合的构建结果会被复制为`index.html`，以便上线部署时不会出错。

你可以使用`--feature-only`参数指定只构建一个Feature集合，但此时构建产生的HTML依然是`index-xxx.html`，可以与`--build-target`共用来生成`index.html`。

### 构建产物

构建输出到`dist`目录，所有静态资源放置于`dist/assets`目录下，入口HTML页面放置于`dist`目录下。基于Feature Matrix进行构建后，不同Feature集产生的文件也都混合在一起，无需分隔为不同目录。

在Feature Matrix的模式下，线上分流需要按照HTML文件名分流，如主流量分到`stable.html`上，小流量则分到`insiders.html`上。而`dist/assets`目录则不需要设置鉴权，以便Sentry或Firefox等应用在无Cookie的情况下可以成功下载到Source Map。

如果当前系统线上无法基于HTML文件名分流，则参考“启动构建”章节使用`--build-target`参数进行兼容。

## 系统配置

对于应用，在项目的根目录下的`reskript.config.js`中可以有`featureMatrix`、`build`和`plugins`导出控制构建。

### Feature Matrix

由`reskript.config.js`导出`featureMatrix`对象，该对象的每一个属性均代表一个Feature集合。

通常推荐应用包含以下3个Feature集合：

- `stable`：用于全流量。
- `insiders`：用于小流量。
- `dev`：用于开发。

其中`dev`仅在开发过程使用。如果系统本身没有灰度机制，可以使用最简单的模板：

```javascript
exports.featureMatrix = {
    stable: {},
    insiders: {},
    dev: {}
};
```

### 构建配置

由`reskript.config.js`导出`builld`对象，可以包含以下属性：

```typescript
interface BuildStyleSettings {
    // 是否将CSS抽取到独立的.css文件中，默认为false，打开这个配置可能导致CSS顺序有问题
    extract: boolean;
    // 用于编译LESS的变量资源文件列表。每个文件均会被注入到所有的LESS文件前面，作为全局可用的资源
    resources: string[];
    // 额外的LESS变量，以对象的形式提供，用于less的modifyVars配置
    lessVariables: Record<string, string>;
    // 启用CSS Modules，默认为true。为true对非第三方代码启用，为false则全面禁用，为函数则通过文件路径自主判断
    modules: boolean | ((resoruce: string) => boolean);
}

interface BuildScriptSettings {
    // 经过babel处理的文件，默认为true。为true对非第三方代码启用，为false则全面禁用，为函数则通过文件路径自主判断
    readonly babel: boolean | ((resoruce: string) => boolean);
    // 是否自动引入core-js的相应polyfill，默认为true。如果你使用了其它方式引入polyfill，设置为false即可
    readonly polyfill: boolean;
    // 最终手动处理babel配置
    readonly finalize: (babelConfig: TransformOptions, env: BuildEntry) => TransformOptions;
    // 是否启用默认的import优化，主要是对`antd`和`lodash`进行优化。如果要从CDN走这些包，关掉这个配置自己折腾
    defaultImportOptimization: boolean;
}

interface BuildSettings {
    // 是否以第三方库的形式构建，第三方库的构建不使用featureMatrix、不拆分chunk，同时构建产出不带hash、不产出HTML文件
    readonly thirdParty: boolean;
    // 构建过程中检查代码规范，默认值为true。如无特殊原因，禁止关闭这个开关
    readonly reportLintErrors: boolean;
    // 生成静态文件的限值，以字节为单位。小于该值的会被编译为DataURI内联，大于该值的会变为单独的文件。默认值为8KB
    readonly largeAssetSize: number;
    // 应用的标题，用于生成<title>元素
    readonly appTitle: string;
    // favicon的位置
    readonly favicon?: string;
    // 构建过程中需要排除的Feature名称，默认排除'dev'，其它均会被构建
    readonly excludeFeatures: string[];
    readonly style: BuildStyleSettings;
    readonly script: BuildScriptSettings;
    // 最终手动处理webpack配置
    readonly finalize: (webpackConfig: WebpackConfiguration, env: BuildEntry) => WebpackConfiguration;
}
```

### 使用插件

由`reskript.config.js`导出`plugins`数组，数组中的每一项为一个函数，函数接受`reskript.config.js`导出的`{featureMatrix, build, devServer, final}`对象和当前命令行参数，并返回一个相同的对象。

插件会按顺序被依次调用，最终返回的对象用于各种功能。

## 代码约定

#### 入口页配置

构建或调试允许定制入口页，也允许单系统多入口。

系统必须有`src/entries`这个目录，其下放置所有的入口文件，默认的名称为`index`。每一个入口对应以下文件：

- `[name].js`：入口的启动脚本。
- `[name].ejs`：HTML模板，以EJS作为模板格式，如果一个入口不存在对应的`.ejs`文件，则会使用默认的模板。自定义模板可使用`htmlWebpackPlugin.options.buildIdentifier`获取构建版本号。
- `[name].config.js`：生成入口页面的额外配置，这个文件的`module.exports`对象会直接传递给[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)，可以定制化页面信息，也可以将额外的数据传递给`[name].ejs`模板。

例如某个入口页面的`<title>`希望得到修改，则可以在`[name].config.js`中这样写：

```javascript
module.exports = {
    title: '定制化的标题'
};
```

入口页的模板（`[name].ejs`）或配置文件（`[name].config.js`）修改后，**需要手动重启调试**，当前版本并不会自动监听这些文件。

### 全局变量

在源码中可以使用以下的全局变量（通过`DefinePlugin`提供）：

- `process.env.XXX`：对应环境变量中的值。
- `$features.xxx`：对应Feature Matrix中的特性值。
- `$build.mode`：构建时的`mode`值，建议使用这个变量来代替`process.env.NODE_ENV`。
- `$build.version`：当前构建的版本号。
- `$build.target`：当前构建的目标。
- `$build.time`：当前构建的时间，为ISO格式字符串。

如果你使用`@reskript/cli-lint`进行代码检查，以上全局变量可直接使用，不会被`lint`功能认为错误。

### 特殊文件命名

以下是可用的一系列特殊处理的文件命名规则：

- `*.global.less`：定义全局的样式，不会经过CSS Modules处理。
- `*.worker.js`：定义Web Worker，会被编译成一个Worker类。
