import {test, expect, vi} from 'vitest';
import {ProjectAware} from '@reskript/core';
import {fillProjectSettings} from '../defaults.js';
import {ProjectSettings, SettingsPlugin, CommandInput} from '../interface/index.js';
import {applyPlugins} from '../plugins.js';

const BUILD_CMD: CommandInput = {
    commandName: 'build',
    cwd: '',
    mode: 'production',
    srcDirectory: 'src',
    entriesDirectory: 'entries',
    strict: false,
    analyze: false,
    clean: false,
    profile: false,
    sourceMaps: false,
};

test('one plugin', async () => {
    const settings: ProjectSettings = fillProjectSettings({driver: 'webpack', devServer: {}});
    const plugin = vi.fn((settings: ProjectSettings, cmd: ProjectAware): ProjectSettings => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                port: 8000,
                defaultProxyDomain: cmd.cwd,
            },
        };
    });
    const options = {...BUILD_CMD, cwd: 'cwd'};
    const output = await applyPlugins(settings, [plugin], options);
    expect(plugin).toHaveBeenCalled();
    expect(plugin.mock.calls[0][0]).toBe(settings);
    expect(plugin.mock.calls[0][1]).toBe(options);
    expect(output.devServer.port).toBe(8000);
});

test('multiple plugins', async () => {
    const settings: ProjectSettings = fillProjectSettings({driver: 'webpack', devServer: {}});
    const port = (settings: ProjectSettings): ProjectSettings => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                port: 8000,
            },
        };
    };
    const domain = async (settings: ProjectSettings): Promise<ProjectSettings> => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                defaultProxyDomain: 'random.api.js',
            },
        };
    };
    const output = await applyPlugins(settings, [port, domain], BUILD_CMD);
    expect(output.devServer.port).toBe(8000);
    expect(output.devServer.defaultProxyDomain).toBe('random.api.js');
});

test('plugins factory', async () => {
    const settings: ProjectSettings = fillProjectSettings({driver: 'webpack', devServer: {}});
    const port: SettingsPlugin = settings => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                port: 8000,
            },
        };
    };
    const domain: SettingsPlugin = settings => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                defaultProxyDomain: 'random.api.js',
            },
        };
    };
    const factory = vi.fn((commandName: string) => (commandName === 'build' ? [port, domain] : []));
    const output = await applyPlugins(settings, factory, {cwd: '', commandName: 'build'} as any);
    expect(factory).toHaveBeenCalled();
    expect(factory.mock.calls[0][0]).toBe('build');
    expect(output.devServer.port).toBe(8000);
    expect(output.devServer.defaultProxyDomain).toBe('random.api.js');
});
