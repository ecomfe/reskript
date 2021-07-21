import {readHostPackageConfig} from '@reskript/core';
import {BuildSettings, DevServerSettings, PlaySettings, ProjectSettings} from './interface';

type PartialBuildSettings = BuildSettings & {
    script: Partial<BuildSettings['script']>;
    style: Partial<BuildSettings['style']>;
};

const fillBuildSettings = (settings?: PartialBuildSettings, cwd: string = process.cwd()): BuildSettings => {
    return {
        uses: ['antd', 'lodash'],
        thirdParty: false,
        reportLintErrors: true,
        largeAssetSize: 8 * 1024,
        appTitle: settings?.appTitle ?? readHostPackageConfig(cwd).name ?? 'Reskript App',
        excludeFeatures: ['dev'],
        finalize: config => config,
        ...settings,
        script: {
            babel: true,
            polyfill: true,
            displayName: true,
            defaultImportOptimization: true,
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

const fillDevServerSettings = (settings?: Partial<DevServerSettings>): DevServerSettings => {
    return {
        https: false,
        port: 8788,
        apiPrefixes: [],
        defaultProxyDomain: '',
        proxyRewrite: {},
        hot: 'all',
        openPage: '',
        finalize: config => config,
        ...settings,
    };
};

const fillPlaySettings = (settings?: Partial<PlaySettings>): PlaySettings => {
    return {
        injectResources: [],
        wrapper: 'children',
        ...settings,
    };
};

interface PartialProjectSettings {
    cwd?: ProjectSettings['cwd'];
    featureMatrix?: ProjectSettings['featureMatrix'];
    build?: PartialBuildSettings;
    devServer?: Partial<ProjectSettings['devServer']>;
    play?: Partial<ProjectSettings['play']>;
}

export const fillProjectSettings = (settings: PartialProjectSettings = {}): ProjectSettings => {
    return {
        cwd: settings.cwd ?? process.cwd(),
        featureMatrix: settings.featureMatrix ?? {stable: {}, dev: {}},
        build: fillBuildSettings(settings.build),
        devServer: fillDevServerSettings(settings.devServer),
        play: fillPlaySettings(settings.play),
    };
};
