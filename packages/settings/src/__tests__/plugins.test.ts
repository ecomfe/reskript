import {test, expect, vi} from 'vitest';
import {ProjectAware} from '@reskript/core';
import {fillProjectSettings} from '../defaults.js';
import {ProjectSettings, SettingsPlugin} from '../interface.js';
import {applyPlugins} from '../plugins.js';

test('one plugin', async () => {
    const settings: ProjectSettings = fillProjectSettings({provider: 'webpack', devServer: {}});
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
    const options = {cwd: 'cwd', command: 'build'};
    const output = await applyPlugins(settings, [plugin], options);
    expect(plugin).toHaveBeenCalled();
    // @ts-expect-error
    expect(plugin.mock.calls[0][0]).toBe(settings);
    // @ts-expect-error
    expect(plugin.mock.calls[0][1]).toBe(options);
    expect(output.devServer.port).toBe(8000);
});

test('multiple plugins', async () => {
    const settings: ProjectSettings = fillProjectSettings({provider: 'webpack', devServer: {}});
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
    const output = await applyPlugins(settings, [port, domain], {cwd: '', command: 'build'});
    expect(output.devServer.port).toBe(8000);
    expect(output.devServer.defaultProxyDomain).toBe('random.api.js');
});

test('plugins factory', async () => {
    const settings: ProjectSettings = fillProjectSettings({provider: 'webpack', devServer: {}});
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
    const factory = vi.fn(() => [port, domain]);
    const output = await applyPlugins(settings, factory, {cwd: '', command: 'build'});
    expect(factory).toHaveBeenCalled();
    expect(factory.mock.calls[0][0]).toBe('build');
    expect(output.devServer.port).toBe(8000);
    expect(output.devServer.defaultProxyDomain).toBe('random.api.js');
});
