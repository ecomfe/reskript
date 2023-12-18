import {
    BuildSettings,
    DevServerSettings,
    PlaySettings,
    ProjectSettings,
    WebpackBuildSettings,
    ViteBuildSettings,
    WebpackDevServerSettings,
    ViteDevServerSettings,
    PortalSettings,
    BuildScriptSettings,
    WebpackBuildStyleSettings,
    ViteBuildStyleSettings,
    BuildInspectSettings,
    ThirdPartyUse,
} from './interface/index.js';

const SHARED_BUILD_SETTINGS = {
    uses: ['lodash'] as ThirdPartyUse[],
    thirdParty: false,
    reportLintErrors: true,
    largeAssetSize: 8 * 1024,
    appTitle: 'Reskript App',
    transformEntryHtml: (html: string) => html,
    excludeFeatures: ['dev'],
};

const fillScriptSettings = (settings?: Partial<BuildScriptSettings>): BuildScriptSettings => {
    return {
        babel: true,
        polyfill: true,
        displayName: true,
        finalize: config => config,
        ...settings,
    };
};

const fillViteStyleSettings = (settings?: Partial<ViteBuildStyleSettings>): ViteBuildStyleSettings => {
    return {
        resources: [],
        lessVariables: {},
        modules: true,
        ...settings,
    };
};

const fillWebpackStyleSettings = (settings?: Partial<WebpackBuildStyleSettings>): WebpackBuildStyleSettings => {
    return {
        extract: false,
        ...fillViteStyleSettings(settings),
    };
};

const fillInspectSettings = (settings?: Partial<BuildInspectSettings>): BuildInspectSettings => {
    return {
        duplicatePackages: 'off',
        htmlImportable: 'off',
        ...settings,
        initialResources: {
            count: 'print',
            totalSize: 'print',
            sizeDeviation: 'off',
            disallowImports: 'off',
            ...settings?.initialResources,
        },
    };
};

type PartialBuildSettings<S extends BuildSettings> = Omit<Partial<S>, 'script' | 'style' | 'inspect'> & {
    script?: Partial<BuildSettings['script']>;
    style?: Partial<WebpackBuildSettings['style'] | ViteBuildSettings['style']>;
    inspect?: Partial<BuildSettings['inspect']>;
};

const fillWebpackBuildSettings = (settings?: PartialBuildSettings<WebpackBuildSettings>): WebpackBuildSettings => {
    return {
        ...SHARED_BUILD_SETTINGS,
        finalize: config => config,
        ...settings,
        script: fillScriptSettings(settings?.script),
        style: fillWebpackStyleSettings(settings?.style),
        inspect: fillInspectSettings(settings?.inspect),
    };
};

const fillViteBuildSettings = (settings?: PartialBuildSettings<ViteBuildSettings>): ViteBuildSettings => {
    return {
        ...SHARED_BUILD_SETTINGS,
        finalize: config => config,
        ...settings,
        script: fillScriptSettings(settings?.script),
        style: fillViteStyleSettings(settings?.style),
        inspect: fillInspectSettings(settings?.inspect),
        legacy: false,
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
        finalize: settings?.finalize ?? (config => config),
    };
};

const fillPlaySettings = (settings?: Partial<PlaySettings>): PlaySettings => {
    return {
        defaultEnableConcurrentMode: false,
        ...settings,
    };
};

const fillPortalSettings = (settings?: Partial<PortalSettings>): PortalSettings => {
    return {
        setup: () => Promise.resolve(),
        ...settings,
    };
};

interface PartialProjectSettingsBase {
    cwd?: ProjectSettings['cwd'];
    featureMatrix?: ProjectSettings['featureMatrix'];
    play?: Partial<ProjectSettings['play']>;
    portal?: Partial<ProjectSettings['portal']>;
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
            portal: fillPortalSettings(settings.portal),
        };
    }

    return {
        driver: settings.driver,
        cwd: settings.cwd ?? process.cwd(),
        featureMatrix: settings.featureMatrix ?? {stable: {}, dev: {}},
        build: fillWebpackBuildSettings(settings.build),
        devServer: fillWebpackDevServerSettings(settings.devServer),
        play: fillPlaySettings(settings.play),
        portal: fillPortalSettings(settings.portal),
    };
};
