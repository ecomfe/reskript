import {WorkModeAware} from '@reskript/core';
import {ProjectSettings} from './project.js';

export type CommandName = 'build' | 'dev' | 'play' | 'test' | 'lint' | 'babel';

export type ReskriptDriver = 'webpack' | 'vite';

export interface BuildEnv extends WorkModeAware {
    // 调用工具时的子命令
    readonly usage: 'build' | 'devServer' | 'test';
    // 源码所在目录，默认为`src`
    readonly srcDirectory: string;
    // 当前代码库的包名，默认读取`package.json`中的`name`字段
    readonly hostPackageName: string;
    // 配置文件中定义的配置
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
    readonly features: Record<string, any>;
    // 当前构建的特性矩阵中的目标
    readonly buildTarget: string;
}
