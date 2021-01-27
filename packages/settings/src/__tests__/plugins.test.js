import {applyPlugins} from '../plugins';

test('one plugin', () => {
    const settings = {
        devServer: {},
    };
    const plugin = jest.fn(settings => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                port: 8000,
            },
        };
    });
    const options = {cwd: '', command: 'build'};
    const output = applyPlugins(settings, [plugin], options);
    expect(plugin).toHaveBeenCalled();
    expect(plugin.mock.calls[0][0]).toBe(settings);
    expect(plugin.mock.calls[0][1]).toBe(options);
    expect(output.devServer.port).toBe(8000);
});

test('multiple plugins', () => {
    const settings = {
        devServer: {},
    };
    const port = settings => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                port: 8000,
            },
        };
    };
    const domain = settings => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                defaultProxyDomain: 'random.api.js',
            },
        };
    };
    const output = applyPlugins(settings, [port, domain], {cwd: '', command: 'build'});
    expect(output.devServer.port).toBe(8000);
    expect(output.devServer.defaultProxyDomain).toBe('random.api.js');
});

test('plugins factory', () => {
    const settings = {
        devServer: {},
    };
    const port = settings => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                port: 8000,
            },
        };
    };
    const domain = settings => {
        return {
            ...settings,
            devServer: {
                ...settings.devServer,
                defaultProxyDomain: 'random.api.js',
            },
        };
    };
    const factory = jest.fn(() => [port, domain]);
    const output = applyPlugins(settings, factory, {cwd: '', command: 'build'});
    expect(factory).toHaveBeenCalled();
    expect(factory.mock.calls[0][0]).toBe('build');
    expect(output.devServer.port).toBe(8000);
    expect(output.devServer.defaultProxyDomain).toBe('random.api.js');
});
