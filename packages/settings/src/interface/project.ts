import {ProjectAware} from '@reskript/core';
import {BuildSettings} from './build.js';
import {DevServerSettings} from './devServer.js';
import {FeatureMatrix} from './featureMatrix.js';
import {PlaySettings} from './play.js';
import {SettingsPlugin} from './plugin.js';
import {CommandName, ReskriptDriver} from './shared.js';

export interface ProjectSettings extends ProjectAware {
    // 从哪里来的配置
    readonly from?: string;
    readonly driver: ReskriptDriver;
    readonly featureMatrix: FeatureMatrix;
    readonly build: BuildSettings;
    readonly devServer: DevServerSettings;
    readonly play: PlaySettings;
}

export interface ClientProjectSettings extends ProjectSettings {
    readonly plugins: SettingsPlugin[] | ((commandName: CommandName) => SettingsPlugin[]);
}
