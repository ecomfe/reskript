import {ProjectAware} from '@reskript/core';
import {ary} from 'lodash';
import {fillProjectSettings} from '../defaults';
import {ProjectSettings, SettingsPlugin} from '../interface';
import {applyPlugins} from '../plugins';

test('one plugin', async () => {
    const settings: ProjectSettings = fillProjectSettings({provider: 'webpack', devServer: {}});
    const plugin = jest.fn((settings: ProjectSettings, cmd: ProjectAware): ProjectSettings => {
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
    expect(plugin.mock.calls[0][0]).toBe(settings);
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
    const factory = jest.fn(ary(() => [port, domain], 1));
    const output = await applyPlugins(settings, factory, {cwd: '', command: 'build'});
    expect(factory).toHaveBeenCalled();
    expect(factory.mock.calls[0][0]).toBe('build');
    expect(output.devServer.port).toBe(8000);
    expect(output.devServer.defaultProxyDomain).toBe('random.api.js');
});
