import path from 'node:path';
import {existsSync} from 'node:fs';
// @ts-expect-error
import hasha from 'hasha';
import chokidar from 'chokidar';
import {importUserModule, logger, PackageInfo, readPackageConfig} from '@reskript/core';
import {ProjectSettings, Listener, Observe, ClientProjectSettings, ReskriptDriver, PluginOptions} from './interface.js';
import validate from './validate.js';
import {fillProjectSettings, PartialProjectSettings} from './defaults.js';
import {applyPlugins} from './plugins.js';

export * from './interface.js';
export {fillProjectSettings, PartialProjectSettings};

const SETTINGS_EXTENSIONS = ['.ts', '.mjs'];

export interface UserSettings extends Omit<PartialProjectSettings, 'provider'> {
    plugins?: ClientProjectSettings['plugins'];
}

export interface UserProjectSettings extends UserSettings {
    provider: ReskriptDriver;
}

const checkSettingsExists = (file?: string) => {
    if (file && !existsSync(file)) {
        logger.error(`Unable to find configuration file ${file}`);
        process.exit(21);
    }
};

const locateSettings = (cwd: string): string | null => {
    const file = SETTINGS_EXTENSIONS.map(v => path.join(cwd, 'reskript.config' + v)).find(existsSync);
    return file ?? null;
};

interface ResolveProjectSettingsOptions {
    cwd: string;
    commandName: string;
    specifiedFile?: string;
}

const importSettings = async (options: ResolveProjectSettingsOptions): Promise<ProjectSettings> => {
    const {cwd, commandName, specifiedFile} = options;
    const {resolved, value: {default: userSettings}} = await importUserModule<{default: UserProjectSettings}>(
        specifiedFile ? [specifiedFile] : SETTINGS_EXTENSIONS.map(v => path.join(cwd, 'reskript.config' + v)),
        {default: {provider: 'webpack'}}
    );

    try {
        validate(userSettings);
    }
    catch (ex) {
        logger.error(ex instanceof Error ? ex.message : `${ex}`);
        process.exit(21);
    }

    const {plugins = [], ...clientSettings} = userSettings;
    const rawSettings: ProjectSettings = {...fillProjectSettings(clientSettings), from: resolved};
    const pluginOptions: PluginOptions = {cwd, command: commandName};
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

export const readProjectSettings = async (options: ResolveProjectSettingsOptions): Promise<ProjectSettings> => {
    checkSettingsExists(options.specifiedFile);

    if (cache.initialized) {
        return cache.settings;
    }

    const settings = await importSettings(options);

    cache.initialized = true;
    cache.settings = settings;

    return settings;
};

export const watchProjectSettings = async (options: ResolveProjectSettingsOptions): Promise<Observe> => {
    checkSettingsExists(options.specifiedFile);

    if (cache.listen) {
        return cache.listen;
    }

    const settingsLocation = options.specifiedFile ?? locateSettings(options.cwd);

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

        cache.hash = newSettingsHash;
        listeners.forEach(f => f());
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
