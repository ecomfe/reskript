import {pReduce} from '@reskript/core';
import {
    ProjectSettings,
    ClientProjectSettings,
    SettingsPluginItem,
    SettingsPlugin,
    CommandInput,
} from './interface/index.js';

type Plugins = ClientProjectSettings['plugins'];

const normalize = (plugin: SettingsPlugin): SettingsPluginItem[] => {
    if (!plugin) {
        return [];
    }
    if (Array.isArray(plugin)) {
        return plugin.flatMap(normalize);
    }
    return [plugin];
};

export const applyPlugins = async (settings: ProjectSettings, plugins: Plugins, cmd: CommandInput) => {
    const pluginsToApply = typeof plugins === 'function' ? plugins(cmd.commandName) : plugins;
    const applied = await pReduce(
        pluginsToApply.flatMap(normalize),
        (baseSettings, apply) => Promise.resolve(apply(baseSettings, cmd)),
        settings
    );
    return applied;
};
