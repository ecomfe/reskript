import path from 'path';
import {existsSync} from 'fs';
import hasha from 'hasha';
import chokidar from 'chokidar';
import {importUserModule, logger, PackageInfo, ProjectAware, readPackageConfig} from '@reskript/core';
import {ProjectSettings, Listener, Observe, ClientProjectSettings, ReskriptProvider} from './interface';
import validate from './validate';
import {fillProjectSettings, PartialProjectSettings} from './defaults';
import {applyPlugins} from './plugins';

export * from './interface';
export {fillProjectSettings, PartialProjectSettings};

const SETTINGS_EXTENSIONS = ['.ts', '.mjs'];

export interface UserSettings extends Omit<PartialProjectSettings, 'provider'> {
    plugins?: ClientProjectSettings['plugins'];
}

export interface UserProjectSettings extends UserSettings {
    provider: ReskriptProvider;
}

const locateSettings = (cwd: string): string | null => {
    const file = SETTINGS_EXTENSIONS.map(v => path.join(cwd, 'reskript.config' + v)).find(existsSync);
    return file ?? null;
};

const importSettings = async (cmd: ProjectAware, commandName: string): Promise<ProjectSettings> => {
    const imported = await importUserModule<UserProjectSettings | {default: UserProjectSettings}>(
        path.join(cmd.cwd, 'reskript.config'),
        {default: {provider: 'webpack'}}
    );
    const userSettings = 'default' in imported ? imported.default : imported;

    try {
        validate(userSettings);
    }
    catch (ex) {
        logger.error(ex instanceof Error ? ex.message : `${ex}`);
        process.exit(21);
    }

    const {plugins = [], ...clientSettings} = userSettings;
    const rawSettings = fillProjectSettings(clientSettings);
    const pluginOptions = {...cmd, command: commandName};
    return applyPlugins(rawSettings, plugins, pluginOptions);
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
    settings: fillProjectSettings({provider: 'webpack'}),
    listen: null,
};

export const readProjectSettings = async (cmd: ProjectAware, commandName: string): Promise<ProjectSettings> => {
    if (cache.initialized) {
        return cache.settings;
    }

    const settings = await importSettings(cmd, commandName);

    cache.initialized = true;
    cache.settings = settings;

    return settings;
};

export const watchProjectSettings = async (cmd: ProjectAware, commandName: string): Promise<Observe> => {
    if (cache.listen) {
        return cache.listen;
    }

    const settingsLocation = locateSettings(cmd.cwd);

    // 根本没有配置文件，弄个空的回去随便外面怎么折腾
    if (!settingsLocation) {
        return () => () => {};
    }

    const listeners = new Set<Listener>();
    const watcher = chokidar.watch(settingsLocation);
    const notify = async (): Promise<void> => {
        // `fs.watch`是不稳定的，一次修改会触发多次，因此用hash做一下比对
        const newSettingsHash = await hasha.fromFile(settingsLocation);

        if (newSettingsHash === cache.hash) {
            return;
        }

        const newSettings = await importSettings(cmd, commandName);

        cache.hash = newSettingsHash;
        cache.settings = newSettings;

        listeners.forEach(f => f(newSettings));
    };
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    watcher.on('all', notify);

    cache.hash = await hasha.fromFile(settingsLocation);
    cache.listen = (listener: Listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    return cache.listen;
};

export const warnAndExitOnInvalidFinalizeReturn = (value: any, scope: string): void => {
    if (!value) {
        const message = `
            Your ${scope}.finalize returns nothing.
            You may forget to write a return statement in ${scope}.finalize, or some plugin has a broken implement.
        `;
        logger.error(message);
        process.exit(21);
    }
};

const hasDependency = (packageInfo: PackageInfo, name: string) => {
    const {dependencies, devDependencies} = packageInfo;
    return !!(dependencies?.[name] || devDependencies?.[name]);
};

export const strictCheckRequiredDependency = async (projectSettings: ProjectSettings, cwd: string) => {
    const hostPackageInfo = await readPackageConfig(cwd);
    if (projectSettings.build.script.polyfill && !hasDependency(hostPackageInfo, 'core-js')) {
        logger.error('You require polyfill on build but don\'t have core-js installed.');
        process.exit(13);
    }
};

export const configure = (provider: 'webpack', settings: UserSettings): UserProjectSettings => {
    return {...settings, provider};
};
