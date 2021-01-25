---
title: 构建配置
---

## 配置结构

`settings.js`中的`exports.build`对象用来控制与构建相关的行为，包括`webpack`、`babel`、`less`等。该配置有如下的结构：

```ts
interface BuildStyleSettings {
    // 是否将CSS抽取到独立的.css文件中，默认为false，打开这个配置可能导致CSS顺序有问题
    readonly extract: boolean;
    // 用于编译LESS的变量资源文件列表。每个文件均会被注入到所有的LESS文件前面，作为全局可用的资源
    readonly resources: string[];
    // 额外的LESS变量，以对象的形式提供，用于less的modifyVars配置
    readonly lessVariables: Record<string, string>;
    // 启用CSS Modules，默认为true。为true对非第三方代码启用，为false则全面禁用，为函数则通过文件路径自主判断
    readonly modules: boolean | ((resoruce: string) => boolean);
}

interface BuildScriptSettings {
    // 经过babel处理的文件，默认为true。为true对非第三方代码启用，为false则全面禁用，为函数则通过文件路径自主判断
    readonly babel: boolean | ((resoruce: string) => boolean);
    // 是否自动引入core-js的相应polyfill，默认为true。如果你使用了其它方式引入polyfill，设置为false即可
    readonly polyfill: boolean;
    // 是否启用默认的import优化，主要是对`antd`和`lodash`进行优化。如果要从CDN走这些包，关掉这个配置自己折腾
    readonly defaultImportOptimization: boolean;
    // 最终手动处理babel配置
    readonly finalize: (babelConfig: TransformOptions, env: BuildEntry) => TransformOptions;
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
    // 控制样式编译的配置
    readonly style: BuildStyleSettings;
    // 控制脚本编译的配置
    readonly script: BuildScriptSettings;
    // 最终手动处理webpack配置
    readonly finalize: (webpackConfig: WebpackConfiguration, env: BuildEntry) => WebpackConfiguration;
}
```

虽然上面的类型定义中每个字段都是必须的，但在实际使用时有默认值填充的机制，通常一个应用需要`appTitle`与`favicon`配置，其它的配置都可以省略。多数配置请参考上方代码中的注释了解其作用，对于一些比较特殊的自定义扩展点，会在下文中说明。

## 脚本相关

### 增加`babel`编译的文件

默认情况下，仅应用的源码，即`src`下的文件会经过`babel`的编译，其它文件将直接由`webpack`处理。有时某些第三方的包会发布语法比较新的内容，而应用又恰好需要支持比较老旧的浏览器，此时可能需要让`babel`去处理额外的文件。

我们可以通过`exports.build.script.babel`配置来指定处理的文件范围，它可以是一个`(resource: string) => boolean`的函数，接收当前文件的绝对路径，返回`true`则表示要通过`babel`处理该文件。

**注意：当将这个配置指定为函数时，原有的`src`下文件经过`babel`处理的默认逻辑会失败，因此你需要在函数中再额外加上这个判断。**

例如，我们知道`some-lib`这个包需要经过`babel`处理，再考虑到`src`下的源码，就可以这样来编写配置：

```js
const path = requrie('path');

const src = path.join(__dirname, 'src');

exports.build = {
    script: {
        babel: resource => resource.includes(src) && resource.includes(`node_modules/some-lib/`),
    },
};
```

### 控制polyfill生成

在默认配置下，`babel`会自动分析代码中使用过的新语言特性，并自动生成`core-js`的引用。默认配置中使用了`usage`这一选项，你可以[参考此处](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage)来了解这一行为。

但`usage`这一行为也有自己的缺点，包括但不限于：

- 会将`core-js`的引用和其它代码混杂在一起，比较难以单独管理或拆分出来。
- 随着源码的变化，引入不同的新语言特性时，会额外增加或减少对`core-js`的引用，导致最终生成的哈希不够稳定。

因此，有些产品会选择使用自定义的polyfill来匹配业务，或全量引入`core-js`来追求哈希的稳定和长效缓存的可用性。在这种情况下，只需要进行简单地配置就可以关闭`babel`的相关功能：

```js
exports.build = {
    script: {
        polyfill: false,
    },
};
```

### 特殊包的导入优化

`reSKRipt`在默认选项下，对于`antd`和`lodash`的引用有特殊的处理。考虑到这2个库包含了非常多的模块，且一个产品往往用不到全部，因此会使用[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)和[babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash)来进行优化。你只需要正常地引入这2个包的部分内容，最终构建产出就不会包含其它你未（直接或间接）引用的部分。

```js
// 最终lodash中其它函数都会消失
import {filter, map} from 'lodash';
// 会引入Button组件的源码和样式，其它组件的内容会消失
import {Button} from 'antd';
```

不过这一优化会与CDN的使用产生冲突，如果你已经决定通过CDN全量引入`antd`和`lodash`，则需要将这个优化关闭：

```js
exports.build = {
    script: {
        defaultImportOptimization: false,
    },
};
```

### 扩展`babel`配置

最后，`reSKRipt`也允许你在自动生成的`babel`配置的基础上增加自己的插件，你可以使用`exports.build.script.finalize`这一函数来扩展。这个函数的第一个参数是最终生成的`babel`配置，通过修改这一配置就能实现扩展。

如果你需要增加一个插件，比如`babel-plugin-macros`，那么在安装这个插件后，你可以简单地在`plugins`中进行追加：

```js
exports.build = {
    script: {
        finalize: babelConfig => {
            babelConfig.plugins.push('babel-plugin-macros');
            return babelConfig;
        },
    },
};
```

如果你需要修改一个已经存在的配置，那么就显得比较麻烦，**我们非常不建议你这么做**，因为它会使你依赖某个特定版本的`reSKRipt`的内部轮回。如果你没有其它选择，那么通过遍历`plugins`或`presets`找到相关内容再进行修改也是可行的，比如你必须打开`loose`这个选项：

```js
exports.build = {
    script: {
        finalize: babelConfig => {
            for (const item of babelConfig.presets) {
                // 找到preset-env，需要注意在配置中是绝对路径，所以你不能用`===`来判断，必须用`.includes`
                if (Array.isArray(item) && item[0].includes('@babel/preset-env')) {
                    const options = item[1];
                    options.loose = true;
                }
            }
            return babelConfig;
        },
    },
};
```

**再次提醒，不到万不得已的情况，我们强烈不建议你去修改已有的配置内容。**

## 样式相关

### 提取样式

使用`exports.build.style.extract`可以将样式提取到独立的`.css`文件中：

```js
exports.build = {
    style: {
        extract: true,
    }
};
```

但我们发现这一做法比较容易导致样式的顺序错乱，进一步导致样式优先级不合预期，引起界面错误。考虑到这种顺序的错乱不易在开发过程中发现，所以我们不是很推荐将样式独立出来。

### 注入`less`资源

你可以选择一部分`.less`文件作为全局的资源，并让`reSKRipt`将它们注入到所有其它`.less`文件中。在这一功能的帮助下，你可以通过一个`.less`文件来定义一系列的变量或者mixin，随后在全局任意地使用它们，也不需要每次用到的时候需要手写`@import`语句。

默认情况下，你的项目中`src/styles/*.var.less`文件都会被自动注入，**这些文件不需要你自定义配置**，我们推荐你将全局用到的变量和mixin放到以上规则的文件中，尽量避免做自定义的注入。

你可以使用`exports.build.style.resources`字符串数组来声明你需要注入的样式文件的路径，每一个路径都必须是**绝对路径**：

```js
const path = require('path');

exports.build = {
    style: {
        resources: [
            path.join('src', 'styles', 'variables.less'),
            path.join('src', 'styles', 'mixins.less'),
        ],
    },
};
```

同时值得注意的是，靠`reSKRipt`来注入一些依赖意味着你的`.less`文件没有自己声明自己的依赖，它们将无法被单独地通过`less`来编译，当然这在大多数情况下并不是问题。

还有一点需要额外小心，一定不要在被自动注入的`.less`文件中写最终会变成CSS的内容，一个常见的错误是把mixin写成了class的样子：

```less
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
```

假设这个文件被注入到100个`.less`中，因为`.flex-center`在语法上实际是一个有意义的CSS类，所以最终会生成100份的`.flex-center`选择器，导致样式的体积大大增加。所以你需要严格地按照mixin的定义来写：

```less
// 注意一定别漏了这里的括号
.flex-center() {
    display: flex;
    align-items: center;
    justify-content: center;
}
```

### 自定义`less`变量

你还可以通过`exports.build.style.lessVariables`来自定义全局的`less`变量，往往在定制`antd`主题时用到，你可以参考[antd的文档](https://ant.design/docs/react/customize-theme-cn)来了解哪些变量可用。比如我们可以简单地替换全局主色来“绿了”`antd`：

```js
exports.build = {
    style: {
        lessVariables: {
            'primary-color': '#0aa779',
        },
    },
};
```

### 控制CSS Modules范围

默认情况下，所有在`src`目录下的`.less`和`.css`文件都经过[CSS Modules](https://github.com/css-modules/css-modules)，即最终的CSS类会变成一段带有哈希的全局唯一的名称。

我们建议你保持默认行为，做好样式的隔离有助于你的系统的可维护性。对于少量且可控的情况，你可以使用`.global.less`和`.global.css`来避开CSS Modules的处理。当文件名不可控且必须放在`src`下又要脱离CSS Modules时，你可以使用`exports.build.style.modules`配置来控制范围。

当然与`babel`配置相同，当你启用了这个配置时，默认的`src`下全局CSS Modules的逻辑也会消失，你需要精确控制某一个文件。例如你（虽然不知道出于啥原因）在`src`下引入了`bootstrap.css`文件，要额外排除它，那么可以考虑这样编写配置：

```js
const path = requrie('path');

const src = path.join(__dirname, 'src');

exports.build = {
    style: {
        modules: resource => resource.includes(src) && !resource.endsWith('/bootstrap.css'),
    },
};
```

## 关闭代码检查

通常来说，在构建的时候进行代码检查不会造成太大的消耗，并且这对你的项目的代码质量有很大的帮助。`reSKRipt`默认在本地调试时不会进行代码检查，仅在`skr build`时做一次全量检查。

如果你对自己的代码十分有信心，并且实在无法接受在构建时代码检查的时间消耗，那么你可以通过以下配置来关闭检查：

```js
exports.build = {
    reportLintErrors: false,
};
```

这将同时关闭对脚本和样式的检查。但我们依然不允许你完全地规避到对代码质量的要求，因此你必须在本地设置一个提交代码的钩子，确保本地的代码质量。

首先，安装`husky`：

```shell
npm install --save-dev husky
```

随后，在`package.json`中增加`pre-commit`的钩子：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "skr lint --staged"
    }
  }
}
```

这样的配置会告诉`reSKRipt`你已经承诺在每次代码提交时做好检查，因此`reportLintErrors: false`才会生效。

### 为什么不用`pre-push`


当你本地有多个提交时，在`pre-push`检查出代码规范的问题，它可能并不是由最新的提交引入的。

此时你修复规范问题后，要么生成一个独立的提交，要么合并到最新的提交中，这都会让你的代码历史中有一个提交存在代码规范问题。

或者你选择修复问题后生成新的提交，并用`git rebase -i`把它合并到之前引入问题的提交中，这一操作非常麻烦且耗时，还容易造成`rebase`过程中的冲突。

因此，我们强制要求在`pre-commit`时进行代码检查，避免在事后处理复杂的问题。使用`--staged`参数可以只检查即将提交的变动，不会消耗太多时间。

## 自定义调整`webpack`配置

如果你对`reSKRipt`生成的`webpack`并不满意，想要自己做一些调整，可以使用`exports.build.finalize`来实现。这个配置项是一个函数，第一个参数为最终生成的`webpack`配置对象，第二个参数为一个`BuildEntry`对象。

例如，你希望复制一些文件到最终生成的代码中，可以通过`copy-webpack-plugin`来实现：

```js
const CopyPlugin = require('copy-webpack-plugin');

exports.build = {
    finalize: webpackConfig => {
        webpackConfig.plugins = webpackConfig.plugins || [];
        webpackConfig.plugins.push(new CopyPlugin({/* 相关配置 */}));
        return webpackConfig;
    },
};
```

或者你想额外处理`wasm`文件：

```js
exports.build = {
    finalize: webpackConfig => {
        const wasmRule = {
            test: /\.wasm$/,
            use: 'wasm-loader',
        };
        webpackConfig.module.rules.push(wasmRule);
        return webpackConfig;
    },
};
```

### 调整已有loader

虽然通过`exports.build.finalize`可以灵活地调整`webpack`配置，但你几乎不可能直接去修改已有的loader规则，比如你想让所有的图片不再使用默认的`url-loader`，而是用`responsive-loader`代替，但你是没办法在`webpackConfig.module.rules`中找到处理图片的那条规则的。

在这种时候，你只能完全重写整个`module.rules`配置，我们通过`@reskript/config-webpack`导出了`rules`对象来让你进一步复用某些规则，`rules`中有以下的规则：

- `script`：处理`.js`、`.jsx`、`.ts`、`.tsx`等脚本文件。
- `less`：处理`.less`样式文件。
- `css`：处理`.css`样式文件。
- `image`：处理`.png`、`.jpg`、`.gif`等图片文件。
- `svg`：处理`.svg`文件。
- `file`：处理其它二进制文件。

每一个规则都是一个`(entry: BuildEntry) => RuleSetRule`的函数，因此`exports.build.finalize`中的第二个参数就起到了作用：

```js
const {rules} = require('@reskript/config-webpack');

exports.build = {
    finalize: (webpackConfig, buildEntry) => {
        // 需要把整个rules都重写
        webpackConfig.module.rules = [
            rules.script(buildEntry),
            rules.less(buildEntry),
            rules.css(buildEntry),
            rules.svg(buildEntry),
            rules.file(buildEntry),
            // 在上面没有引用rules.image，自定义图片的处理规则
            {
                test: /\.(jpe?g|png|webp)$/i,
                use: 'responsive-loader',
            },
        ];
        return webpackConfig;
    },
};
```
