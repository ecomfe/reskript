import {ProjectSettings, ClientProjectSettings} from './interface';

type Plugins = ClientProjectSettings['plugins'];

export interface PluginOptions {
    cwd: string;
    command: string;
}

export const applyPlugins = (settings: ProjectSettings, plugins: Plugins, options: PluginOptions) => {
    const pluginsToApply = typeof plugins === 'function' ? plugins(options.command) : plugins;
    return pluginsToApply.reduce(
        (baseSettings, apply) => apply(baseSettings, options),
        settings
    );
};
