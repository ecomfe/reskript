/* eslint-disable no-use-before-define */
import {ServerOptions} from 'https';
import {ProjectAware, WorkModeAware} from '@reskript/core';
import {Configuration as WebpackConfiguration, RuleSetRule, RuleSetUseItem} from 'webpack';
import {Configuration as WebpackDevServerConfiguration} from 'webpack-dev-server';
import {TransformOptions} from '@babel/core';

export interface FeatureSet {
    [feature: string]: any;
}

export interface FeatureMatrix {
    [name: string]: FeatureSet;
}

export type ThirdPartyUse = 'antd' | 'lodash' | 'styled-components' | 'emotion' | 'reflect-metadata' | 'tailwind';

export interface BuildStyleSettings {
    // 是否将CSS抽取到独立的.css文件中，默认为false，打开这个配置可能导致CSS顺序有问题
    readonly extract: boolean;
    // 用于编译LESS的变量资源文件列表。每个文件均会被注入到所有的LESS文件前面，作为全局可用的资源
    readonly resources: string[];
    // 额外的LESS变量，以对象的形式提供，用于less的modifyVars配置
    readonly lessVariables: Record<string, string>;
    // 启用CSS Modules，默认为true。为true对非第三方代码启用，为false则全面禁用，为函数则通过文件路径自主判断
    readonly modules: boolean | ((resoruce: string) => boolean);
}

export interface BuildScriptSettings {
    // 经过babel处理的文件，默认为true。为true对非第三方代码启用，为false则全面禁用，为函数则通过文件路径自主判断
    readonly babel: boolean | ((resoruce: string) => boolean);
    // 是否自动引入core-js的相应polyfill，默认为true。如果你使用了其它方式引入polyfill，设置为false即可
    readonly polyfill: boolean;
    // 是否自动生成组件的displayName，取值为auto时仅在development下生效，关掉后构建的速度会提升一些，产出会小一些，但线上调试会比较麻烦
    readonly displayName: boolean | 'auto';
    // 最终手动处理babel配置
    readonly finalize: (babelConfig: TransformOptions, env: BuildEntry) => TransformOptions;
}

export type Severity = 'off' | 'print' | 'warn' | 'error';

// 产物检查的规则配置，为数组的时候，第2个元素是具体的配置
export type RuleConfig<T> = 'off' | 'print' | [Severity, T];

export type OptionalRuleConfig<T> = Severity | [Severity, T];

export interface SourceFilter {
    includes?: string[];
    excludes?: string[];
}

export interface BuildInspectInitialResource {
    // 初始加载资源数量，配置值为最大允许数量
    readonly count: RuleConfig<number>;
    // 初始加载的资源总大小，配置值为最大允许的体积，以字节为单位
    readonly totalSize: RuleConfig<number>;
    // 初始加载的各资源之间的体积差异，配置值为单个资源的尺寸与所有资源尺寸平均值的差异系数，如0.3指尺寸必须在平均值的0.7-1.3倍之间
    readonly sizeDeviation: RuleConfig<number>;
    // 禁止在初始加载资源中包含某些第三方依赖，配置值为依赖名称的数组
    readonly disallowImports: RuleConfig<string[]>;
}

export interface BuildInspectSettings {
    readonly initialResources: BuildInspectInitialResource;
    readonly duplicatePackages: OptionalRuleConfig<SourceFilter>;
    readonly htmlImportable: OptionalRuleConfig<SourceFilter>;
}

export type RuleFactory = (buildEntry: BuildEntry) => RuleSetRule;

export type LoaderFactory = (buildEntry: BuildEntry) => RuleSetUseItem | null;

export interface InternalRules {
    readonly script: RuleFactory;
    readonly less: RuleFactory;
    readonly css: RuleFactory;
    readonly image: RuleFactory;
    readonly svg: RuleFactory;
    readonly file: RuleFactory;
}

export type LoaderType =
    | 'babel'
    | 'style'
    | 'css'
    | 'cssModules'
    | 'postCSS'
    | 'postCSSModules'
    | 'less'
    | 'lessSafe'
    | 'img'
    | 'worker'
    | 'styleResources'
    | 'classNames'
    | 'cssExtract'
    | 'svgo'
    | 'svgToComponent';

export interface BuildInternals {
    readonly rules: InternalRules;
    readonly loader: (name: LoaderType, buildEntry: BuildEntry) => RuleSetUseItem | null;
    readonly loaders: (names: Array<LoaderType | false>, buildEntry: BuildEntry) => RuleSetUseItem[];
}

export interface BuildSettings {
    // 指定使用的第三方库，会为这些库做特殊的优化
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
    // 在HTML中增加一个放应用的`<div>`元素，`id`属性由这个配置指定。如果不配置，就不会自动增加这元素。自定义HTML模板时这个配置失效
    readonly appContainerId?: string;
    // 构建过程中需要排除的Feature名称，默认排除'dev'，其它均会被构建
    readonly excludeFeatures: string[];
    readonly style: BuildStyleSettings;
    readonly script: BuildScriptSettings;
    // 最终手动处理webpack配置
    readonly finalize: (
        webpackConfig: WebpackConfiguration,
        buildEntry: BuildEntry,
        internals: BuildInternals
    ) => WebpackConfiguration;
    // 配置对最终产出的检查规则
    readonly inspect: BuildInspectSettings;
}

export type DevServerHttps = {proxy?: boolean} & ({client?: false} | {client: true, serverOptions?: ServerOptions});

export interface DevServerSettings {
    // 是否以HTTPS协议代理请求及启动调试服务器
    readonly https?: DevServerHttps;
    // 监听的端口
    readonly port: number;
    // 代理给后端的API请求的URL前缀
    readonly apiPrefixes: string[];
    // 默认的代理后端路径，可以被`--proxy-domain`命令行参数覆盖
    readonly defaultProxyDomain: string;
    // 重写部分请求URL，优先于apiPrefixes
    readonly proxyRewrite: Record<string, string>;
    // 是否启用热更新，其中`simple`只启用样式的更新，`all`则会加入组件的热更新
    readonly hot: boolean;
    // 服务启动后打开的页面
    readonly openPage: string;
    // 在最终调整配置，可以任意处理，原则上这个函数处理后的对象不会再被内部的逻辑修改
    readonly finalize: (serverConfig: WebpackDevServerConfiguration, env: BuildEntry) => WebpackDevServerConfiguration;
}

export interface PlaySettings {
    // 默认启用React的并发模式
    readonly defaultEnableConcurrentMode: boolean;
    // 指定全局配置模块路径
    readonly defaultGlobalSetup?: string;
}

export interface PluginOptions {
    cwd: string;
    command: string;
}

export type SettingsPlugin<C extends PluginOptions = PluginOptions> = (
    current: ProjectSettings,
    cmd: C
) => ProjectSettings | Promise<ProjectSettings>;

export type ReskriptProvider = 'webpack';

export interface ProjectSettings extends ProjectAware {
    readonly provider: ReskriptProvider;
    readonly featureMatrix: FeatureMatrix;
    readonly build: BuildSettings;
    readonly devServer: DevServerSettings;
    readonly play: PlaySettings;
}

export interface ClientProjectSettings extends ProjectSettings {
    readonly plugins: SettingsPlugin[] | ((commandName: string) => SettingsPlugin[]);
}

export interface BuildEnv extends WorkModeAware {
    // 调用工具时的子命令
    readonly usage: 'build' | 'devServer' | 'test';
    // 源码所在目录，默认为`src`
    readonly srcDirectory: string;
    // 当前代码库的包名，默认读取`package.json`中的`name`字段
    readonly hostPackageName: string;
    // `reskript.config.js`中定义的配置
    readonly projectSettings: ProjectSettings;
    // 是否启用缓存
    readonly cache?: 'persist' | 'transient' | 'off';
    // 缓存的目录，默认为`node_modules/.cache`
    readonly cacheDirectory?: string;
}

export interface RuntimeBuildEnv extends BuildEnv {
    // 当前构建的版本号，会从`git`的最新提交中自动生成
    readonly buildVersion: string;
    // 构建发生的时间
    readonly buildTime: string;
}

export interface BuildEntry extends RuntimeBuildEnv {
    // 构建的特性值
    readonly features: FeatureSet;
    // 当前构建的特性矩阵中的目标
    readonly buildTarget: string;
}

export type Listener = (settings: ProjectSettings) => void;

export type Observe = (listener: Listener) => () => void;
