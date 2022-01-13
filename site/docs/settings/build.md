---
title: 构建配置
---

## 配置结构

`reskript.config.{mjs|ts}`中的`build`对象用来控制与构建相关的行为，包括`webpack`、`babel`、`less`等。该配置有如下的结构：

```ts
// 以下是工具内置了优化的相关第三方库
export type ThirdPartyUse = 'antd' | 'lodash' | 'styled-components' | 'emotion' | 'reflect-metadata' | 'tailwind';

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
    // 是否自动生成组件的displayName，取值为auto时仅在development下生效，关掉后构建的速度会提升一些，产出会小一些，但线上调试会比较麻烦
    readonly displayName: boolean | 'auto';
    // 最终手动处理babel配置
    readonly finalize: (babelConfig: TransformOptions, env: BuildEntry) => TransformOptions;
}

type Severity = 'off' | 'print' | 'warn' | 'error';

// 产物检查的规则配置，为数组的时候，第2个元素是具体的配置
type RuleConfig<T> = 'off' | 'print' | [Severity, T];

type OptionalRuleConfig<T> = Severity | [Severity, T];

// 设置对名称的过滤规则，includs会优先于excludes起作用
interface SourceFilter {
    includes?: string[];
    excludes?: string[];
}

interface BuildInspectInitialResource {
    // 初始加载资源数量，配置值为最大允许数量
    readonly count: RuleConfig<number>;
    // 初始加载的资源总大小，配置值为最大允许的体积，以字节为单位
    readonly totalSize: RuleConfig<number>;
    // 初始加载的各资源之间的体积差异，配置值为单个资源的尺寸与所有资源尺寸平均值的差异系数，如0.3指尺寸必须在平均值的0.7-1.3倍之间
    readonly sizeDeviation: RuleConfig<number>;
    // 禁止在初始加载资源中包含某些第三方依赖，配置值为依赖名称的数组
    readonly disallowImports: RuleConfig<string[]>;
}

interface BuildInspectSettings {
    readonly initialResources: BuildInspectInitialResource;
    readonly duplicatePackages: OptionalRuleConfig<SourceFilter>;
    readonly htmlImportable: OptionalRuleConfig<SourceFilter>;
}

type RuleFactory = (buildEntry: BuildEntry) => RuleSetRule;

interface InternalRules {
    readonly script: RuleFactory;
    readonly less: RuleFactory;
    readonly css: RuleFactory;
    readonly image: RuleFactory;
    readonly svg: RuleFactory;
    readonly file: RuleFactory;
}

interface BuildInternals {
    readonly rules: InternalRules;
}

interface BuildSettings {
    // 指定使用的第三方库，会为这些库做特殊的优化，默认会开启antd和lodash，如果自定义这个数组则要手动补上默认的值
    readonly uses: ThirdPartyUse[];
    // 产出的资源路径前缀
    readonly publicPath?: string;
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
    // 在HTML中增加一个放应用的<div>元素，id属性由这个配置指定。如果不配置，就不会自动增加这元素。自定义HTML模板时这个配置失效
    readonly appContainerId?: string;
    // 构建过程中需要排除的Feature名称，默认排除'dev'，其它均会被构建
    readonly excludeFeatures: string[];
    // 控制样式编译的配置
    readonly style: BuildStyleSettings;
    // 控制脚本编译的配置
    readonly script: BuildScriptSettings;
    // 最终手动处理webpack配置
    readonly finalize: (webpackConfig: WebpackConfiguration, buildEntry: BuildEntry, internals: BuildInternals) => WebpackConfiguration;
    // 配置对最终产出的检查规则
    readonly inspect: BuildInspectSettings;
}
```

虽然上面的类型定义中每个字段都是必须的，但在实际使用时有默认值填充的机制，通常一个应用需要`appTitle`与`favicon`配置，其它的配置都可以省略。多数配置请参考上方代码中的注释了解其作用，对于一些比较特殊的自定义扩展点，会在下文中说明。

## 脚本相关

### 增加`babel`编译的文件

默认情况下，仅应用的源码，即`src`下的文件会经过`babel`的编译，其它文件将直接由`webpack`处理。有时某些第三方的包会发布语法比较新的内容，而应用又恰好需要支持比较老旧的浏览器，此时可能需要让`babel`去处理额外的文件。

我们可以通过`build.script.babel`配置来指定处理的文件范围，它可以是一个`(resource: string) => boolean`的函数，接收当前文件的绝对路径，返回`true`则表示要通过`babel`处理该文件。

**注意：当将这个配置指定为函数时，原有的`src`下文件经过`babel`处理的默认逻辑会失败，因此你需要在函数中再额外加上这个判断。**

例如，我们知道`some-lib`这个包需要经过`babel`处理，再考虑到`src`下的源码，就可以这样来编写配置：

```ts
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const src = path.join(path.dirname(fileURLToPath(import.meta.url)), 'src');

export default configure(
    'webpack',
    {
        build: {
            script: {
                babel: resource => resource.includes(src) || resource.includes(`node_modules/some-lib/`),
            },
        },
    }
);
```

### 控制polyfill生成

在默认配置下，`babel`会自动分析代码中使用过的新语言特性，并自动生成`core-js`的引用。默认配置中使用了`usage`这一选项，你可以[参考此处](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage)来了解这一行为。

但`usage`这一行为也有自己的缺点，包括但不限于：

- 会将`core-js`的引用和其它代码混杂在一起，比较难以单独管理或拆分出来。
- 随着源码的变化，引入不同的新语言特性时，会额外增加或减少对`core-js`的引用，导致最终生成的哈希不够稳定。

因此，有些产品会选择使用自定义的polyfill来匹配业务，或全量引入`core-js`来追求哈希的稳定和长效缓存的可用性。在这种情况下，只需要进行简单地配置就可以关闭`babel`的相关功能：

```ts
export default configure(
    'webpack',
    {
        build: {
            script: {
                polyfill: false,
            },
        },
    }
);
```

### 特殊第三方库的优化

社区上有许多的库需要构建期工具的支持才能取得更好的使用效果。`reSKRipt`在长远的计划上会精选支持高质量、持续维护、对生产效率有足够帮助的库。但默认打开所有相关的优化必定会拖慢构建速度，因此提供了选项由使用者指定你所用的库。

通过`reskript.config.{mjs|ts}`中的`build.uses`配置可以指定你使用的库，这个属性是一个枚举字符串的数组，当前支持以下值：

- `antd`：对`antd`的导入进行优化，可以参考[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)的相关说明。
- `lodash`：对`lodash`的导入进行优化，可以参考[babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash)的说明。**这个优化只会在`production`模式下启用。**
- `styled-components`：对`styled-components`的使用进行构建期的优化，可以参考[babel-plugin-styled-components](https://www.npmjs.com/package/babel-plugin-styled-components)的相关说明。
- `emotion`：对`emotion`样式解决方案进行处理，这个插件是[`emotion`部分功能的必须依赖](https://emotion.sh/docs/@emotion/babel-plugin#features)。**使用`emotion`要求你的`react`版本在`16.14.0`以上。**
- `reflect-metadata`：在构建TypeScript文件中的装饰器语法时，会额外增加对`Reflect.metadata`相关的代码，主要用于NestJS、或InversifyJS等库。
- `tailwind`：在样式处理上引入[tailwind](https://tailwindcss.com/)的处理。这个声明仅仅让样式处理支持`tailwind`，但你需要自己安装`tailwindcss`、生成`tailwind.config.js`并自行在CSS中通过`@tailwind`引入相关的样式。

`reSKRipt`在默认选项下，这一配置的值为`['antd', 'lodash']`，即默认启用这2个库的相关优化：

```ts
// 最终lodash中其它函数都会消失
import {filter, map} from 'lodash';
// 会引入Button组件的源码和样式，其它组件的内容会消失
import {Button} from 'antd';
```

如果你自定义这个配置，那么默认的`antd`和`lodash`优化会被取消，你需要自己补充这两个值。假设你在使用着`antd`和`lodash`的同时，又希望使用`styled-components`，则可以这么写：

```ts
export default configure(
    'webpack',
    {
        build: {
            uses: ['antd', 'lodash', 'styled-components'],
        },
    }
);
```

而假设你使用`ramda`代替了`lodash`，又不希望额外的优化影响构建速度，你也可以自定义这个配置来移除对`lodash`的处理：

```ts
export default configure(
    'webpack',
    {
        build: {
            uses: ['antd'],
        },
    }
);
```

**另外，`antd`和`lodash`的优化还会与CDN的使用产生冲突，如果你已经决定通过CDN全量引入`antd`和`lodash`，则需要将这个优化关闭。**

### 扩展`babel`配置

最后，`reSKRipt`也允许你在自动生成的`babel`配置的基础上增加自己的插件，你可以使用`build.script.finalize`这一函数来扩展。这个函数的第一个参数是最终生成的`babel`配置，通过修改这一配置就能实现扩展。

如果你需要增加一个插件，比如`babel-plugin-macros`，那么在安装这个插件后，你可以简单地在`plugins`中进行追加：

```ts
export default configure(
    'webpack',
    {
        build: {
            script: {
                finalize: babelConfig => {
                    babelConfig.plugins.push('babel-plugin-macros');
                    return babelConfig;
                },
            },
        },
    }
);
```

如果你需要修改一个已经存在的配置，那么就显得比较麻烦，**我们非常不建议你这么做**，因为它会使你依赖某个特定版本的`reSKRipt`的内部轮回。如果你没有其它选择，那么通过遍历`plugins`或`presets`找到相关内容再进行修改也是可行的，比如你必须打开`loose`这个选项：

```ts
export default configure(
    'webpack',
    {
        build: {
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
        },
    }
);
```

**再次提醒，不到万不得已的情况，我们强烈不建议你去修改已有的配置内容。**

## 样式相关

### 提取样式

使用`build.style.extract`可以将样式提取到独立的`.css`文件中：

```ts
export default configure(
    'webpack',
    {
        build: {
            style: {
                extract: true,
            }
        },
    }
);
```

但我们发现这一做法比较容易导致样式的顺序错乱，进一步导致样式优先级不合预期，引起界面错误。考虑到这种顺序的错乱不易在开发过程中发现，所以我们不是很推荐将样式独立出来。

### 注入`less`资源

你可以选择一部分`.less`文件作为全局的资源，并让`reSKRipt`将它们注入到所有其它`.less`文件中。在这一功能的帮助下，你可以通过一个`.less`文件来定义一系列的变量或者mixin，随后在全局任意地使用它们，也不需要每次用到的时候需要手写`@import`语句。

默认情况下，你的项目中`src/styles/*.var.less`文件都会被自动注入，**这些文件不需要你自定义配置**，我们推荐你将全局用到的变量和mixin放到以上规则的文件中，尽量避免做自定义的注入。

你可以使用`build.style.resources`字符串数组来声明你需要注入的样式文件的路径，每一个路径都必须是**绝对路径**：

```ts
import path from 'node:path';

export default configure(
    'webpack',
    {
        build: {
            style: {
                resources: [
                    path.join('src', 'styles', 'variables.less'),
                    path.join('src', 'styles', 'mixins.less'),
                ],
            },
        },
    }
);
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

你还可以通过`build.style.lessVariables`来自定义全局的`less`变量，往往在定制`antd`主题时用到，你可以参考[antd的文档](https://ant.design/docs/react/customize-theme-cn)来了解哪些变量可用。比如我们可以简单地替换全局主色来“绿了”`antd`：

```ts
export default configure(
    'webpack',
    {
        build: {
            style: {
                lessVariables: {
                    'primary-color': '#0aa779',
                },
            },
        },
    }
);
```

### 控制CSS Modules范围

默认情况下，所有在`src`目录下的`.less`和`.css`文件都经过[CSS Modules](https://github.com/css-modules/css-modules)，即最终的CSS类会变成一段带有哈希的全局唯一的名称。

我们建议你保持默认行为，做好样式的隔离有助于你的系统的可维护性。对于少量且可控的情况，你可以使用`.global.less`和`.global.css`来避开CSS Modules的处理。当文件名不可控且必须放在`src`下又要脱离CSS Modules时，你可以使用`build.style.modules`配置来控制范围。

当然与`babel`配置相同，当你启用了这个配置时，默认的`src`下全局CSS Modules的逻辑也会消失，你需要精确控制某一个文件。例如你（虽然不知道出于啥原因）在`src`下引入了`bootstrap.css`文件，要额外排除它，那么可以考虑这样编写配置：

```ts
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const src = path.join(path.dirname(fileURLToPath(import.meta.url)), 'src');

export default configure(
    'webpack',
    {
        build: {
            style: {
                modules: resource => resource.includes(src) && !resource.endsWith('/bootstrap.css'),
            },
        },
    }
);
```

## 关闭代码检查

通常来说，在构建的时候进行代码检查不会造成太大的消耗，并且这对你的项目的代码质量有很大的帮助。`reSKRipt`默认在本地调试时不会进行代码检查，仅在`skr build`时做一次全量检查。

如果你对自己的代码十分有信心，并且实在无法接受在构建时代码检查的时间消耗，那么你可以通过以下配置来关闭检查：

```ts
export default configure(
    'webpack',
    {
        build: {
            reportLintErrors: false,
        },
    }
);
```

这将同时关闭对脚本和样式的检查。但我们依然不允许你完全地规避到对代码质量的要求，因此你必须在本地设置一个提交代码的钩子，确保本地的代码质量。

首先，安装`husky`：

```shell
npm install --save-dev husky
```

随后，加上`pre-commit`的钩子：

```shell
npx --no-install husky install \
  && npx --no-install husky add .husky/pre-commit "npx --no-install skr lint --staged --fix --auto-stage"
```

这样的配置会告诉`reSKRipt`你已经承诺在每次代码提交时做好检查，此后`reportLintErrors: false`才会生效。

### 为什么不用`pre-push`

当你本地有多个提交时，在`pre-push`检查出代码规范的问题，它可能并不是由最新的提交引入的。

此时你修复规范问题后，要么生成一个独立的提交，要么合并到最新的提交中，这都会让你的代码历史中有一个提交存在代码规范问题。

或者你选择修复问题后生成新的提交，并用`git rebase -i`把它合并到之前引入问题的提交中，这一操作非常麻烦且耗时，还容易造成`rebase`过程中的冲突。

因此，我们强制要求在`pre-commit`时进行代码检查，避免在事后处理复杂的问题。使用`--staged`参数可以只检查即将提交的变动，不会消耗太多时间。

## 自定义调整`webpack`配置

如果你对`reSKRipt`生成的`webpack`并不满意，想要自己做一些调整，可以使用`build.finalize`来实现。这个配置项是一个函数，第一个参数为最终生成的`webpack`配置对象，第二个参数为一个`BuildEntry`对象。

例如，你希望复制一些文件到最终生成的代码中，可以通过`copy-webpack-plugin`来实现：

```ts
import CopyPlugin from 'copy-webpack-plugin';

export default configure(
    'webpack',
    {
        build: {
            finalize: webpackConfig => {
                webpackConfig.plugins.push(new CopyPlugin({/* 相关配置 */}));
                return webpackConfig;
            },
        },
    }
);
```

或者你想额外处理`wasm`文件：

```ts
export default configure(
    'webpack',
    {
        build: {
            finalize: webpackConfig => {
                const wasmRule = {
                    test: /\.wasm$/,
                    use: 'wasm-loader',
                };
                webpackConfig.module.rules.push(wasmRule);
                return webpackConfig;
            },
        },
    }
);
```

`reSKRipt`会保证以下的属性是有值的，不会出现`undefined`的情况：

- `plugins`。
- `module.rules`。
- `resolve.alias`。
- `optimization`。

因此，你可以安全地使用`webpackConfig.plugins.push(new CopyPlugin())`这样的代码，而不需要对`plugins`属性判空。

### 调整已有`webpack`规则

虽然通过`build.finalize`可以灵活地调整`webpack`配置，但你几乎不可能直接去修改已有的loader规则，比如你想让所有的图片不再使用默认的`url-loader`，而是用`responsive-loader`代替，但你是没办法在`webpackConfig.module.rules`中找到处理图片的那条规则的。

在这种时候，你只能完全重写整个`module.rules`配置，我们在`build.finalize`函数的第三个参数`internals`中提供了了`rules`对象来让你进一步复用某些规则，`rules`中有以下的规则：

- `script`：处理`.js`、`.jsx`、`.ts`、`.tsx`等脚本文件。
- `less`：处理`.less`样式文件。
- `css`：处理`.css`样式文件。
- `image`：处理`.png`、`.jpg`、`.gif`等图片文件。
- `svg`：处理`.svg`文件。
- `file`：处理其它二进制文件。

每一个规则都是一个`(entry: BuildEntry) => RuleSetRule`的函数，因此`build.finalize`中的第二个参数就起到了作用：

```ts
export default configure(
    'webpack',
    {
        build: {
            finalize: (webpackConfig, buildEntry, internals) => {
                // 需要把整个rules都重写
                webpackConfig.module.rules = [
                    internals.rules.script(buildEntry),
                    internals.rules.less(buildEntry),
                    internals.rules.css(buildEntry),
                    internals.rules.svg(buildEntry),
                    internals.rules.file(buildEntry),
                    // 在上面没有引用rules.image，自定义图片的处理规则
                    {
                        test: /\.(jpe?g|png|webp)$/i,
                        use: 'responsive-loader',
                    },
                ];
                return webpackConfig;
            },
        },
    }
);
```

### 复用现有的`loader`

承接上文，有时候你在处理一个自定义的文件类型的时候，又想能够尽量复用`reSKRipt`内置的`loader`逻辑，这也是可以做到的。`build.finalize`函数的第三个参数`internals`中提供了如下2个函数：

```ts
type LoaderType =
    | 'babel'
    | 'style'
    | 'css'
    | 'cssModules'
    | 'postCSS'
    | 'postCSSModules'
    | 'less'
    | 'lessSafe'
    | 'url'
    | 'img'
    | 'worker'
    | 'styleResources'
    | 'classNames'
    | 'cssExtract'
    | 'svg'
    | 'svgo'
    | 'svgToComponent';


function loader(name: LoaderType, buildEntry: BuildEntry): RuleSetUseItem | null;

function loaders(names: Array<LoaderType | false>, buildEntry: BuildEntry): RuleSetUseItem[];
}
```

其中`loader`函数可以生成一个`loader`声明，例如`loader('css', buildEntry)`就可能返回类似这样的结构：

```ts
{
    loader: resolve('css-loader'),
    options: {
        sourceMap: true,
        modules: false,
    },
}
```

这可以直接用在`webpack`的`module.rules`配置中。

:::note
有一些规则在特写情况下会返回`null`，所以记得处理空值。
:::

而`loaders`函数则更智能一些，你可以传递多个`LoaderType`或者`false`，它会去除其中的`false`值，将剩余的创建出对应的`loader`声明，再去除`null`的部分，返回一个完全可用的定义。

一个典型的场景是你需要处理`.sass`文件，且希望它们都具备`reSKRipt`原本的CSS Modules等样式处理能力以及[神奇的样式函数功能](../app/style/#了解样式函数)，那么你就需要借用`loaders`函数引入类似`postcss-loader`、`css-loader`、`style-loader`等：

```ts
export default configure(
    'webpack',
    {
        build: {
            finalize: (webpackConfig, buildEntry, internals) => {
                const sassRule = {
                    test: /\.s[ac]ss$/,
                    use: [
                        ...internals.loaders(['classNames', 'style', 'cssModules', 'postCSSModules'], buildEntry),
                        'sass-loader',
                    ],
                };
                webpackConfig.module.rules.push(sassRule);
                return webpackConfig;
            },
        },
    }
);
```

:::note
请注意，`loaders`函数中的参数顺序依然是自右向左的，这与`webpack`的`loader`一致。
:::

## 检查最终构建产物

在要求比较严格的项目中，有需要对最终产物的组成进行检查，并应用一些自动化的规则，确保如资源数量、大小等符合预期。

你可以使用`reskript.config.{mjs|ts}`中的`build.inspect`来配置构建产物的检查规则，具体的配置结构参考上文。

### 规则配置

在产物检查的配置中，大部分检查项都可以配置为以下形式：

- `"off"`：指关闭该项的检查。
- `"print"`：指仅打印该检查项的结果，但不做任何的阈值判断和拦截。
- `[severity, config]`：配置该项的报告类型，以及指定规则检查的阈值。

不同规则的`config`阈值不同，比如`initialResources.count`用来检查初始加载的资源数量，那么它的阈值就是个数字，资源数量超过该值时报警。

当`severity`设为`"warn"`时，会在构建日志中报告，但构建仍然成功。如果值为`"error"`时，则除了日志报告外，还会使构建进程异常退出。

### 示例

#### 初始资源检查

假设你的产品并没有使用HTTP/2，考虑到浏览器的单域名并发能力和用户的普遍网速，你的要求如下：

> 产品打开时，初始加载的资源不能超过6个，总大小不能超过2MB，各资源的体积尽量平均以最大限度利用并发能力。同时产品初始资源不包含任何和图表（`echarts`）有关的模块，不包含和编辑器（`monaco-editor`和`codemirror`）有关的模块。

为了严格控制产品性能，你要求一但违反上面的规则，构建应当失败，开发者需要修复相关问题。则配置如下所示：

```ts
export default configure(
    'webpack',
    {
        build: {
            inspect: {
                initialResources: {
                    count: ['error', 6],
                    totalSize: ['error', 2 * 1024 * 1024],
                    sizeDeviation: ['error', 0.2],
                    disallowImports: ['error', ['echarts', 'monaco-editor', 'codemirror']],
                },
            },
        },
    }
);
```

#### 检查重复引入的第三方库

由于NPM管理依赖多版本的逻辑，以及不同的第三方库之间依赖关系的未知性，很可能在一个构建的最终产物中，某个包有很多不同版本同时存在。这会造成额外的资源体积、脚本解析和执行时间，对于有副作用的模块更可能导致实际运行出现不可预期的行为。

你可以使用`inspect.duplicatePackages`来检查这些重复的引入，例如你的要求如下：

> 检查所有重复引入的依赖包，但对于仅用作开发的`tslib`这个包和`eslint-`开头的包不做报警。相关结果只打印出来，不要中断构建的正常进行。

你可以使用如下的配置：

```ts
export default configure(
    'webpack',
    {
        build: {
            inspect: {
                duplicatePackages: ['warn', {excludes: ['tslib', 'eslint-*']}],
            },
        },
    }
);
```

最后你可能得到类似这样的报告产出：

```
 W  Found duplicate package immer
      at /path/to/project/node_modules/immer
      at /path/to/project/node_modules/@huse/methods/node_modules/immer
 W  Found duplicate package color-name
      at /path/to/project/node_modules/color-name
      at /path/to/project/node_modules/color-convert/node_modules/color-name
```

每一条报警信息都会告诉你被重复引入的包名，以及被引入的各个版本所在的绝对路径。

#### 检查微前端兼容性

当下有不少前端系统使用[qiankun](https://qiankun.umijs.org/zh/guide)作为微前端框架进行开发，不过qiankun对你的产出会有一些要求，也有不少的开发者没有及时注意这些限制，直到调试时才在运行时发现应用跑不起来。

其中最为典型的一个问题是，qiankun要求你的入口脚本是HTML中的最后一个`<script>`标签，如果你“不幸”在作为入口的`.js`后又插入了一些其它的脚本，那么系统就会无法接入微前端基座了。

为此，我们增加了一个`htmlImportable`的检查，你可以使用如下配置：

```ts
export default configure(
    'webpack',
    {
        build: {
            inspect: {
                htmlImportable: 'error',
            },
        },
    }
);
```

如果最终产出的HTML不符合要求，会出现类似的错误并异常退出：

```
E  The last script in index-stable.html doesn't reference to an entry script, this can break micro-frontend frameworks like qiankun.
```

如果有一部分产出的HTML是由你自己控制，且不与微前端框架整合，你可以使用`includes`或`excludes`来控制被检查的HTML文件：

```ts
export default configure(
    'webpack',
    {
        build: {
            inspect: {
                // 干掉自己生成的
                htmlImportable: ['error', {excludes: ['copyright.html', 'about-*.html']}],
            },
        },
    }
);
```
