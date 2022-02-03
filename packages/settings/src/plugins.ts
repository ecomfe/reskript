import {pReduce} from '@reskript/core';
import {
    ProjectSettings,
    ClientProjectSettings,
    SettingsPluginItem,
    SettingsPlugin,
    PluginOptions,
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

export const applyPlugins = async (settings: ProjectSettings, plugins: Plugins, options: PluginOptions) => {
    const pluginsToApply = typeof plugins === 'function' ? plugins(options.command) : plugins;
    const applied = await pReduce(
        pluginsToApply.flatMap(normalize),
        (baseSettings, apply) => Promise.resolve(apply(baseSettings, options)),
        settings
    );
    return applied;
};
