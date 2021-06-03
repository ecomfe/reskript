import path from 'path';
import fs from 'fs';
import hasha from 'hasha';
import chokidar from 'chokidar';
import chalk from 'chalk';
import dedent from 'dedent';
import {ProjectAware} from '@reskript/core';
import {ProjectSettings, Listener, Observe, ClientProjectSettings} from './interface';
import validate from './validate';
import {fillProjectSettings} from './defaults';
import {applyPlugins} from './plugins';

export * from './interface';

const requireSettings = (cmd: ProjectAware, commandName: string): ProjectSettings => {
    const location = path.join(cmd.cwd, 'reskript.config.js');

    if (!fs.existsSync(location)) {
        return fillProjectSettings({});
    }

    delete require.cache[location];
    // eslint-disable-next-line global-require
    const requiredSettings = require(location) as ClientProjectSettings;
    validate(requiredSettings);
    const {plugins = [], ...clientSettings} = requiredSettings;
    const rawSettings = fillProjectSettings(clientSettings);
    const pluginOptions = {...cmd, command: commandName};
    return applyPlugins(rawSettings, plugins, pluginOptions);
};

const computeSettingsHash = (cwd: string): string => {
    const location = path.join(cwd, 'reskript.config.js');

    if (!fs.existsSync(location)) {
        return '';
    }


    return hasha.fromFileSync(location);
};

interface CacheContainer {
    initialized: boolean;
    hash: string;
    settings: ProjectSettings;
    listen: Observe | null;
}

const cache: CacheContainer = {
    initialized: false,
    hash: '',
    settings: fillProjectSettings({}),
    listen: null,
};

export const readProjectSettings = (cmd: ProjectAware, commandName: string): ProjectSettings => {
    if (cache.initialized) {
        return cache.settings;
    }

    const settings = requireSettings(cmd, commandName);

    cache.initialized = true;
    cache.settings = settings;

    return settings;
};

export const watchProjectSettings = (cmd: ProjectAware, commandName: string): Observe => {
    if (cache.listen) {
        return cache.listen;
    }

    const settingsLocation = path.join(cmd.cwd, 'reskript.config.js');
    const listeners = new Set<Listener>();
    const watcher = chokidar.watch(settingsLocation);
    const notify = async (): Promise<void> => {
        // `fs.watch`是不稳定的，一次修改会触发多次，因此用hash做一下比对
        const newSettingsHash = computeSettingsHash(cmd.cwd);

        if (newSettingsHash === cache.hash) {
            return;
        }

        const newSettings = requireSettings(cmd, commandName);

        cache.hash = newSettingsHash;
        cache.settings = newSettings;

        listeners.forEach(f => f(newSettings));
    };
    watcher.on('all', notify);

    cache.hash = computeSettingsHash(cmd.cwd);
    cache.listen = (listener: Listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    return cache.listen;
};

export const warnAndExitOnInvalidFinalizeReturn = (value: any, scope: string): void => {
    if (!value) {
        const message = dedent`
            Your ${scope}.finalize returns nothing.
            You may forget to write a return statement in ${scope}.finalize, or some plugin has a broken implement.
        `;
        console.error(chalk.red(message));
        process.exit(21);
    }
};

export {fillProjectSettings};
