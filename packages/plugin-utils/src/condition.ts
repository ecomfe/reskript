import {CommandName, SettingsPlugin} from '@reskript/settings';
import {WorkMode} from '@reskript/core';
import {applyPlugin} from './apply.js';

export const onlyOnCommand = (accept: CommandName[], pluginOrFactory: () => SettingsPlugin): SettingsPlugin => {
    return (settings, cmd) => {
        if (accept.includes(cmd.commandName)) {
            const plugin = typeof pluginOrFactory === 'function' ? pluginOrFactory() : pluginOrFactory;
            return applyPlugin(plugin, settings, cmd);
        }
        return settings;
    };
};

export const onlyOnBuildLike = (factory: (mode: WorkMode) => SettingsPlugin): SettingsPlugin => {
    return (settings, cmd) => {
        const plugin = (cmd.commandName === 'build' || cmd.commandName === 'dev')
            ? factory(cmd.mode)
            : (cmd.commandName === 'play' ? factory('development') : null);
        return plugin ? applyPlugin(plugin, settings, cmd) : settings;
    };
};
