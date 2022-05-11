import path from 'node:path';
import {existsSync} from 'node:fs';
import hasha from 'hasha';
import chokidar from 'chokidar';
import {importUserModule, logger, PackageInfo, readPackageConfig} from '@reskript/core';
import {
    ProjectSettings,
    Listener,
    Observe,
    ClientProjectSettings,
    ReskriptDriver,
    CommandInput,
} from './interface/index.js';
import validate from './validate.js';
import {
    fillProjectSettings,
    PartialProjectSettings,
    PartialViteProjectSettings,
    PartialWebpackProjectSettings,
} from './defaults.js';
import {applyPlugins} from './plugins.js';

export * from './interface/index.js';
export {fillProjectSettings, PartialProjectSettings};

const SETTINGS_EXTENSIONS = ['.ts', '.mjs'];

interface PluginSetting {
    plugins?: ClientProjectSettings['plugins'];
}

export type WebpackUserSetting = Omit<PartialWebpackProjectSettings, 'driver'> & PluginSetting;

export type ViteUserSetting = Omit<PartialViteProjectSettings, 'driver'> & PluginSetting;

export type UserSettings = PartialProjectSettings & PluginSetting;

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

type ResolveProjectSettingsOptions = CommandInput & {specifiedFile?: string};

const importSettings = async (options: ResolveProjectSettingsOptions): Promise<ProjectSettings> => {
    const {specifiedFile, ...cmd} = options;
    const {resolved, value: {default: userSettings}} = await importUserModule<{default: UserSettings}>(
        specifiedFile ? [specifiedFile] : SETTINGS_EXTENSIONS.map(v => path.join(cmd.cwd, 'reskript.config' + v)),
        {default: {driver: 'webpack'}}
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
    return applyPlugins(rawSettings, plugins, cmd);
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
    settings: fillProjectSettings({driver: 'webpack'}),
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

export function configure(driver: 'webpack', settings: WebpackUserSetting): UserSettings;
export function configure(driver: 'vite', settings: ViteUserSetting): UserSettings;
export function configure(driver: ReskriptDriver, settings: any): UserSettings {
    return {...settings, driver};
}
