import {CommandInput} from './command.js';
import {ProjectSettings} from './project.js';

type SettingsPluginReturn = ProjectSettings | Promise<ProjectSettings>;

export type SettingsPluginItem = (current: ProjectSettings, cmd: CommandInput) => SettingsPluginReturn;

export type MayBeSettingsPlugin = SettingsPluginItem | null | undefined | false;

export type SettingsPlugin = MayBeSettingsPlugin | MayBeSettingsPlugin[];
