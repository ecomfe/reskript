import pReduce from 'p-reduce';
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
        (baseSettings, apply) => apply(baseSettings, options),
        settings
    );
    return applied;
};
