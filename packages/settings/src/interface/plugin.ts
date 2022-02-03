import {ProjectSettings} from './project.js';

export interface PluginOptions {
    cwd: string;
    command: string;
}

export type SettingsPlugin<C extends PluginOptions = PluginOptions> = (
    current: ProjectSettings,
    cmd: C
) => ProjectSettings | Promise<ProjectSettings>;
