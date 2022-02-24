import {TransformOptions} from '@babel/core';
import {BuildEntry} from './shared.js';
import {WebpackFinalize} from './webpack.js';
import {ViteFinalize} from './vite.js';

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
    readonly finalize: (babelConfig: TransformOptions, env: BuildEntry) => TransformOptions | Promise<TransformOptions>;
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
    // 配置对最终产出的检查规则
    readonly inspect: BuildInspectSettings;
}

export interface WebpackBuildSettings extends BuildSettings {
    // 最终手动处理webpack配置
    readonly finalize: WebpackFinalize;
}

export interface ViteBuildSettings extends BuildSettings {
    // 最终手动处理vite配置
    readonly finalize: ViteFinalize;
}
