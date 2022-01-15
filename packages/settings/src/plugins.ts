import {pReduce} from '@reskript/core';
import {ProjectSettings, ClientProjectSettings, PluginOptions} from './interface.js';

type Plugins = ClientProjectSettings['plugins'];

export const applyPlugins = async (settings: ProjectSettings, plugins: Plugins, options: PluginOptions) => {
    const pluginsToApply = typeof plugins === 'function' ? plugins(options.command) : plugins;
    const applied = await pReduce(
        pluginsToApply,
        (baseSettings, apply) => Promise.resolve(apply(baseSettings, options)),
        settings
    );
    return applied;
};
