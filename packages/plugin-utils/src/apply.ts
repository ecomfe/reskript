import {pReduce} from '@reskript/core';
import {CommandInput, ProjectSettings, SettingsPlugin} from '@reskript/settings';

type PluginReturn = ProjectSettings | Promise<ProjectSettings>;

export const applyPlugin = (plugin: SettingsPlugin, settings: ProjectSettings, cmd: CommandInput): PluginReturn => {
    if (!plugin) {
        return settings;
    }
    if (Array.isArray(plugin)) {
        return pReduce(plugin, (settings, plugin) => Promise.resolve(applyPlugin(plugin, settings, cmd)), settings);
    }
    return plugin(settings, cmd);
};
