import {CommandName} from './shared.js';
import {ProjectSettings} from './project.js';

export interface PluginOptions {
    cwd: string;
    command: CommandName;
}

type SettingsPluginReturn = ProjectSettings | Promise<ProjectSettings>;

export type SettingsPluginItem = (current: ProjectSettings, cmd: PluginOptions) => SettingsPluginReturn;

export type MayBeSettingsPlugin = SettingsPluginItem | null | undefined | false;

export type SettingsPlugin = MayBeSettingsPlugin | MayBeSettingsPlugin[];
