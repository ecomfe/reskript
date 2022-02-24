import {
    BuildSettings,
    DevServerSettings,
    PlaySettings,
    ProjectSettings,
    WebpackBuildSettings,
    ViteBuildSettings,
    WebpackDevServerSettings,
    ViteDevServerSettings,
} from './interface/index.js';

type PartialBuildSettings<S extends BuildSettings> = Omit<Partial<S>, 'script' | 'style' | 'inspect'> & {
    script?: Partial<BuildSettings['script']>;
    style?: Partial<BuildSettings['style']>;
    inspect?: Partial<BuildSettings['inspect']>;
};

const fillBuildSettings = (settings?: PartialBuildSettings<BuildSettings>): BuildSettings => {
    return {
        uses: ['antd', 'lodash'],
        thirdParty: false,
        reportLintErrors: true,
        largeAssetSize: 8 * 1024,
        appTitle: settings?.appTitle ?? 'Reskript App',
        excludeFeatures: ['dev'],
        ...settings,
        script: {
            babel: true,
            polyfill: true,
            displayName: true,
            finalize: config => config,
            ...settings?.script,
        },
        style: {
            extract: false,
            resources: [],
            lessVariables: {},
            modules: true,
            ...settings?.style,
        },
        inspect: {
            duplicatePackages: 'off',
            htmlImportable: 'off',
            ...settings?.inspect,
            initialResources: {
                count: 'print',
                totalSize: 'print',
                sizeDeviation: 'off',
                disallowImports: 'off',
                ...settings?.inspect?.initialResources,
            },
        },
    };
};

const fillWebpackBuildSettings = (settings?: PartialBuildSettings<WebpackBuildSettings>): WebpackBuildSettings => {
    return {
        ...fillBuildSettings(settings),
        finalize: settings?.finalize ?? (config => config),
    };
};

const fillViteBuildSettings = (settings?: PartialBuildSettings<ViteBuildSettings>): ViteBuildSettings => {
    return {
        ...fillBuildSettings(settings),
        // TODO: 支持Vite的`finalize`
        finalize: settings?.finalize ?? null,
    };
};

const fillDevServerSettings = (settings?: Partial<DevServerSettings>): DevServerSettings => {
    return {
        port: 8788,
        apiPrefixes: [],
        defaultProxyDomain: '',
        proxyRewrite: {},
        hot: true,
        openPage: '',
        customizeMiddleware: hook => hook,
        ...settings,
    };
};

const fillWebpackDevServerSettings = (settings?: Partial<WebpackDevServerSettings>): WebpackDevServerSettings => {
    return {
        ...fillDevServerSettings(settings),
        finalize: settings?.finalize ?? (config => config),
    };
};

const fillViteDevServerSettings = (settings?: Partial<ViteDevServerSettings>): ViteDevServerSettings => {
    return {
        ...fillDevServerSettings(settings),
        // TODO: 支持Vite的`finalize`
        finalize: settings?.finalize ?? null,
    };
};

const fillPlaySettings = (settings?: Partial<PlaySettings>): PlaySettings => {
    return {
        defaultEnableConcurrentMode: false,
        ...settings,
    };
};

interface PartialProjectSettingsBase {
    cwd?: ProjectSettings['cwd'];
    featureMatrix?: ProjectSettings['featureMatrix'];
    play?: Partial<ProjectSettings['play']>;
}

export interface PartialWebpackProjectSettings extends PartialProjectSettingsBase {
    driver: 'webpack';
    build?: PartialBuildSettings<WebpackBuildSettings>;
    devServer?: Partial<WebpackDevServerSettings>;
}

export interface PartialViteProjectSettings extends PartialProjectSettingsBase {
    driver: 'vite';
    build?: PartialBuildSettings<ViteBuildSettings>;
    devServer?: Partial<ViteDevServerSettings>;
}

export type PartialProjectSettings = PartialWebpackProjectSettings | PartialViteProjectSettings;

export const fillProjectSettings = (settings: PartialProjectSettings): ProjectSettings => {
    // NOTE: 允许用户不写`driver`的，所以默认路径必须是`webpack`，下面的分支不能换位置
    if (settings.driver === 'vite') {
        return {
            driver: settings.driver,
            cwd: settings.cwd ?? process.cwd(),
            featureMatrix: settings.featureMatrix ?? {stable: {}, dev: {}},
            build: fillViteBuildSettings(settings.build),
            devServer: fillViteDevServerSettings(settings.devServer),
            play: fillPlaySettings(settings.play),
        };
    }

    return {
        driver: settings.driver,
        cwd: settings.cwd ?? process.cwd(),
        featureMatrix: settings.featureMatrix ?? {stable: {}, dev: {}},
        build: fillWebpackBuildSettings(settings.build),
        devServer: fillWebpackDevServerSettings(settings.devServer),
        play: fillPlaySettings(settings.play),
    };
};
