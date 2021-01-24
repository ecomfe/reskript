/* eslint-disable no-use-before-define */
import {ProjectAware, WorkModeAware} from '@reskript/core';
import {Configuration as WebpackConfiguration} from 'webpack';
import {Configuration as WebpackDevServerConfiguration} from 'webpack-dev-server';
import {TransformOptions} from '@babel/core';

export interface FeatureSet {
    [feature: string]: any;
}

export interface FeatureMatrix {
    [name: string]: FeatureSet;
}

export interface BuildStyleSettings {
    // 是否将CSS抽取到独立的.css文件中，默认为false，打开这个配置可能导致CSS顺序有问题
    extract: boolean;
    // 用于编译LESS的变量资源文件列表。每个文件均会被注入到所有的LESS文件前面，作为全局可用的资源
    resources: string[];
    // 额外的LESS变量，以对象的形式提供，用于less的modifyVars配置
    lessVariables: Record<string, string>;
    // 启用CSS Modules，默认为true。为true对非第三方代码启用，为false则全面禁用，为函数则通过文件路径自主判断
    modules: boolean | ((resoruce: string) => boolean);
}

export interface BuildScriptSettings {
    // 经过babel处理的文件，默认为true。为true对非第三方代码启用，为false则全面禁用，为函数则通过文件路径自主判断
    readonly babel: boolean | ((resoruce: string) => boolean);
    // 是否自动引入core-js的相应polyfill，默认为true。如果你使用了其它方式引入polyfill，设置为false即可
    readonly polyfill: boolean;
    // 最终手动处理babel配置
    readonly finalize: (babelConfig: TransformOptions, env: BuildEntry) => TransformOptions;
    // 是否启用默认的import优化，主要是对`antd`和`lodash`进行优化。如果要从CDN走这些包，关掉这个配置自己折腾
    defaultImportOptimization: boolean;
}

export interface BuildSettings {
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

export interface DevServerSettings {
    // 是否以HTTPS协议代理请求
    readonly https: boolean;
    // 监听的端口
    readonly port: number;
    // 代理给后端的API请求的URL前缀
    readonly apiPrefixes: string[];
    // 默认的代理后端路径，可以被`--proxy-domain`命令行参数覆盖
    readonly defaultProxyDomain: string;
    // 是否启用热更新，其中`simple`只启用样式的更新，`all`则会加入组件的热更新
    readonly hot: 'none' | 'simple' | 'all';
    // 服务启动后打开的页面
    readonly openPage: string;
    // 在最终调整配置，可以任意处理，原则上这个函数处理后的对象不会再被内部的逻辑修改
    readonly finalize: (serverConfig: WebpackDevServerConfiguration, env: BuildEntry) => WebpackDevServerConfiguration;
}

export interface RollupSettings {
    readonly styleOutput?: 'inject' | 'extract' | 'index';
    readonly target?: 'web' | 'node' | 'universal';
}

export interface PlaySettings {
    readonly extraResources?: string[];
}

export type SettingsPlugin = (current: ProjectSettings, cmd: ProjectAware) => ProjectSettings;

export interface ProjectSettings extends ProjectAware {
    readonly featureMatrix: FeatureMatrix;
    readonly build: BuildSettings;
    readonly devServer: DevServerSettings;
    readonly rollup: RollupSettings;
    readonly play: PlaySettings;
}

export interface ClientProjectSettings extends ProjectSettings {
    readonly plugins: SettingsPlugin[] | ((commandName: string) => SettingsPlugin[]);
}

export interface BuildEnv extends WorkModeAware {
    readonly usage: 'build' | 'devServer' | 'test' | 'play';
    readonly srcDirectory: string;
    readonly hostPackageName: string;
    readonly projectSettings: ProjectSettings;
    readonly cache?: boolean;
}

export interface RuntimeBuildEnv extends BuildEnv {
    readonly buildVersion: string;
    readonly buildTime: string;
}

export interface BuildEntry extends RuntimeBuildEnv {
    readonly features: FeatureSet;
    readonly buildTarget: string;
}

export type Listener = (settings: ProjectSettings) => void;

export type Observe = (listener: Listener) => () => void;
