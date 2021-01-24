---
title: 详解配置
order: 6
---

## 编译配置

在`settings.js`中，`exports.build`导出的对象用来指定源码构建相关的配置，你可以使用以下的属性：

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

如果想把`reportLintErrors`设置为`false`，你的`package.json`中必须打开git pre-commit hook，即需要有以下内容：

```json
{
    "husky": {
        "hooks": {
            "pre-commit": "npm run lint-staged"
        }
    }
}
```
