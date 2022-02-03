export interface PlaySettings {
    // 默认启用React的并发模式
    readonly defaultEnableConcurrentMode: boolean;
    // 指定全局配置模块路径
    readonly defaultGlobalSetup?: string;
}
