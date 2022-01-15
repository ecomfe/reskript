# @reskript/config-webpack

提供内置的webpack配置，供进一步自定义使用。

## 定制化构建

通过`@reskript/config-webpack`提供的`createWebpackConfig`函数获取完整的webpack配置：

```typescript
interface BuildContext {
    readonly cwd: string;
    readonly mode: WorkMode;
    readonly buildVersion: string;
    readonly buildTime: string;
    readonly usage: 'build' | 'devServer' | 'test';
    readonly srcDirectory: string;
    readonly hostPackageName: string;
    readonly projectSettings: ProjectSettings;
    readonly features: FeatureSet;
    readonly buildTarget: string;
    readonly isDefaultTarget: boolean;
    readonly entries: AppEntry[];
}

function createWebpackConfig(context: BuildContext, extras: Configuration[] = []): Configuration;
```

正常情况下，手动构建`BuildContext`对象是不现实的，你可以通过`readProjectSettings`和`createRuntimeBuildEnv`等函数配合来生成整个配置，以下是一个比较经典的代码：

```ts
import {
    createWebpackConfig,
    collectEntries,
    createRuntimeBuildEnv,
    checkProjectSettings,
    BuildContext,
} from '@reskript/config-webpack';
import {readProjectSettings, BuildEnv} from '@reskript/settings';

const createBuildConfiguration = async () => {
    const cwd = process.cwd();
    // 给定当前的项目目录`cwd`，读取`reskript.config.js`
    const projectSettings = await readProjectSettings({cwd}, 'build');
    const entryLocation = {
        cwd,,
        srcDirectory: 'src',
        entryDirectory: projectSettings.build.entries,
    };
    // 自动读取`src/entries/*.js`来生成应用入口
    const entries = await collectEntries(entryLocation);
    // 创建一个`BuildEnv`对象，这个对象是`BuildContext`的一小部分
    const buildEnv: BuildEnv = {
        projectSettings,
        cwd, // 当前的项目根路径
        hostPackageName: 'my-app', // 包名，保持和`package.json`中一样就行
        usage: 'build', // 用于构建，此外可以用在`devServer`等场景，一般都是`build`
        mode: 'production', // `production`或者`development`
        srcDirectory: 'src', // 源码放在哪个目录下，默认是`src`
    };
    // 生成一个`RuntimeBuildEnv`对象，相比`BuildEnv`多了构建版本等信息
    const runtimeBuildEnv = await createRuntimeBuildEnv(buildEnv);
    // 通过`RuntimeBuildEnv`去生成`BuildContext`
    const buildContext: BuildContext = {
        ...runtimeBuildEnv,
        entries,
        // 对应feature matrix的设置，里面每一个属性都对应代码中的`$features.xxx`
        features: projectSettings.featureMatrix[featureName],
        // 会最终生成在代码中的`$build.target`的值
        buildTarget: 'stable',
        // 如果是默认的构建目标的话，会生成`index.html`，不然会生成`index-${buildTarget}.html`
        isDefaultTarget: false,
    };
    return createWebpackConfig(buildContext);
};
```

## 复用loader

如果默认的构建配置外加`reskript.config.js`无法满足，或需要在`reskript.config.js`中的`build.finalize`部分复用一些默认的配置，则可以使用`loaders`对象来创建不同的loader配置：

```typescript
import * as loaders from '@reskript/config-webpack/loaders';

loaders: {
    babel,
    eslint,
    worker,
    less,
    css,
    cssModules,
    postcss,
    style,
    styleResources,
    classNames,
}
```

每一个loader函数都接受一个`BuildEntry`对象并返回可用于webpack的`use`配置的对象：

```typescript
interface BuildEntry extends RuntimeBuildEnv {
    readonly cwd: string;
    readonly mode: WorkMode;
    readonly usage: 'build' | 'devServer' | 'test';
    readonly srcDirectory: string;
    readonly hostPackageName: string;
    readonly projectSettings: ProjectSettings;
    readonly buildVersion: string;
    readonly buildTime: string;
    readonly features: FeatureSet;
    readonly buildTarget: string;
}

type LoaderFactory = (entry: BuildEntry) => Promise<RuleSetLoader | null>;
```

`BuildEntry`是上文`BuildContext`的子集，参考相同的方式来构建这个对象。

## 复用规则

如果在复用loader的情况下，还希望复用`module.rules`的相关规则，可以使用`rules`对象：

```typescript
import {rules} from '@reskript/config-webpack';

rules: {
    script,
    less,
    css,
    image,
    file,
    svg,
}
```

每一个导出的规则都是一个函数：

```typescript
type RuleFactory = (entry: BuildEntry) => RuleSetRule;
```

对于需要修改某一个规则的情况，可以通过`build.finalize`来进行修改，但建议直接覆盖全部的`module.rules`，不要依赖在数组中找到对应的规则。如某个项目需要将`.css`文件的规则修改，则可以在`reskript.config.js`中写如下配置：

```typescript
const {omit} = require('lodash');
const {rules} = require('@reskript/config-webpack');

exports.build = {
    // 其它配置
    finalize: (config, env) => {
        // 先移除css的规则
        const baseRules = Object.values(omit(rules, ['css'])).map(rule => rule(env));
        config.module.rules = [
            ...baseRules,
            {
                test: /\.css$/,
                use: [...]
            }
        ];
    },
};
```

`reskript`无法保证每一次升级时在`rules`对象上保持完全的向后兼容，如上的写法可比较灵活地应对升级导致的规则的增减。
