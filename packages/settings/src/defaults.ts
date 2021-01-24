import {readHostPackageConfig} from '@reskript/core';
import {BuildSettings, DevServerSettings, RollupSettings, PlaySettings, ProjectSettings} from './interface';

type PartialBuildSettings = BuildSettings & {
    script: Partial<BuildSettings['script']>;
    style: Partial<BuildSettings['style']>;
};

const fillBuildSettings = (settings?: PartialBuildSettings, cwd: string = process.cwd()): BuildSettings => {
    return {
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
            finalize: config => config,
            defaultImportOptimization: true,
            ...settings?.script,
        },
        style: {
            extract: false,
            resources: [],
            lessVariables: {},
            modules: true,
            ...settings?.style,
        },
    };
};

const fillDevServerSettings = (settings?: Partial<DevServerSettings>): DevServerSettings => {
    return {
        https: false,
        port: 8788,
        apiPrefixes: [],
        defaultProxyDomain: '',
        hot: 'all',
        openPage: '',
        finalize: config => config,
        ...settings,
    };
};

const fillRollupSettings = (settings?: Partial<RollupSettings>): RollupSettings => {
    return {
        styleOutput: 'index',
        target: 'universal',
        ...settings,
    };
};

const fillPlaySettings = (settings?: Partial<PlaySettings>): PlaySettings => {
    return {
        extraResources: [],
        ...settings,
    };
};

interface PartialProjectSettings {
    cwd?: ProjectSettings['cwd'];
    featureMatrix?: ProjectSettings['featureMatrix'];
    build?: PartialBuildSettings;
    devServer?: Partial<ProjectSettings['devServer']>;
    rollup?: Partial<ProjectSettings['rollup']>;
    play?: Partial<ProjectSettings['play']>;
}

export const fillProjectSettings = (settings: PartialProjectSettings = {}): ProjectSettings => {
    return {
        cwd: settings.cwd ?? process.cwd(),
        featureMatrix: settings.featureMatrix ?? {stable: {}, dev: {}},
        build: fillBuildSettings(settings.build),
        devServer: fillDevServerSettings(settings.devServer),
        rollup: fillRollupSettings(settings.rollup),
        play: fillPlaySettings(settings.play),
    };
};
