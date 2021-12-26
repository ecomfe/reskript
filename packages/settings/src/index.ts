import path from 'path';
import {existsSync} from 'fs';
import hasha from 'hasha';
import chokidar from 'chokidar';
import {importUserModule, logger, PackageInfo, ProjectAware, readPackageConfig} from '@reskript/core';
import {ProjectSettings, Listener, Observe, ClientProjectSettings} from './interface';
import validate from './validate';
import {fillProjectSettings, PartialProjectSettings} from './defaults';
import {applyPlugins} from './plugins';

export * from './interface';
export {fillProjectSettings, PartialProjectSettings};

interface UserProjectSettings extends PartialProjectSettings {
    plugins?: ClientProjectSettings['plugins'];
}

const requireSettings = async (cmd: ProjectAware, commandName: string): Promise<ProjectSettings> => {
    const imported = await importUserModule<UserProjectSettings | {default: UserProjectSettings}>(
        path.join(cmd.cwd, 'reskript.config'),
        {default: {}}
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

const computeSettingsHash = async (cwd: string): Promise<string> => {
    const location = path.join(cwd, 'reskript.config.js');

    if (!existsSync(location)) {
        return '';
    }


    return hasha.fromFile(location);
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

export const readProjectSettings = async (cmd: ProjectAware, commandName: string): Promise<ProjectSettings> => {
    if (cache.initialized) {
        return cache.settings;
    }

    const settings = await requireSettings(cmd, commandName);

    cache.initialized = true;
    cache.settings = settings;

    return settings;
};

export const watchProjectSettings = async (cmd: ProjectAware, commandName: string): Promise<Observe> => {
    if (cache.listen) {
        return cache.listen;
    }

    const settingsLocation = path.join(cmd.cwd, 'reskript.config.js');
    const listeners = new Set<Listener>();
    const watcher = chokidar.watch(settingsLocation);
    const notify = async (): Promise<void> => {
        // `fs.watch`是不稳定的，一次修改会触发多次，因此用hash做一下比对
        const newSettingsHash = await computeSettingsHash(cmd.cwd);

        if (newSettingsHash === cache.hash) {
            return;
        }

        const newSettings = await requireSettings(cmd, commandName);

        cache.hash = newSettingsHash;
        cache.settings = newSettings;

        listeners.forEach(f => f(newSettings));
    };
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    watcher.on('all', notify);

    cache.hash = await computeSettingsHash(cmd.cwd);
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
