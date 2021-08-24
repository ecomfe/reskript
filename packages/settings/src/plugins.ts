import {pReduce} from '@reskript/core';
import {ProjectSettings, ClientProjectSettings} from './interface';

type Plugins = ClientProjectSettings['plugins'];

export interface PluginOptions {
    cwd: string;
    command: string;
}

export const applyPlugins = async (settings: ProjectSettings, plugins: Plugins, options: PluginOptions) => {
    const pluginsToApply = typeof plugins === 'function' ? plugins(options.command) : plugins;
    const applied = await pReduce(
        pluginsToApply,
        (baseSettings, apply) => Promise.resolve(apply(baseSettings, options)),
        settings
    );
    return applied;
};
