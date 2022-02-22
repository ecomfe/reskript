import {ProjectAware} from '@reskript/core';
import {WebpackBuildSettings, ViteBuildSettings} from './build.js';
import {WebpackDevServerSettings, ViteDevServerSettings} from './devServer.js';
import {FeatureMatrix} from './featureMatrix.js';
import {PlaySettings} from './play.js';
import {SettingsPlugin} from './plugin.js';
import {CommandName} from './shared.js';

export interface ProjectSettingsBase extends ProjectAware {
    // 从哪里来的配置
    readonly from?: string;
    readonly featureMatrix: FeatureMatrix;
    readonly play: PlaySettings;
}

export interface WebpackProjectSettings extends ProjectSettingsBase {
    readonly driver: 'webpack';
    readonly build: WebpackBuildSettings;
    readonly devServer: WebpackDevServerSettings;
}

export interface ViteProjectSettings extends ProjectSettingsBase {
    readonly driver: 'vite';
    readonly build: ViteBuildSettings;
    readonly devServer: ViteDevServerSettings;
}

export type ProjectSettings = WebpackProjectSettings | ViteProjectSettings;

type PluginsSetting = SettingsPlugin[] | ((commandName: CommandName) => SettingsPlugin[]);

export type ClientProjectSettings = ProjectSettings & {plugins: PluginsSetting};
