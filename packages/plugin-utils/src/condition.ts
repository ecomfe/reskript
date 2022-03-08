import {CommandName, SettingsPlugin} from '@reskript/settings';
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
