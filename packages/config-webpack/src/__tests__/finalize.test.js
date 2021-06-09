import {readProjectSettings} from '@reskript/settings';
import {createWebpackConfig} from '../index';

describe('finalize', () => {
    test('can receive a fully resolved webpack config and modify it', () => {
        const finalize = jest.fn(config => ({...config, mode: 'none'}));
        const projectSettings = readProjectSettings({cwd: __dirname}, 'build');
        const withFinalize = {
            ...projectSettings,
            build: {
                ...projectSettings.build,
                finalize,
            },
        };
        const context = {
            cwd: __dirname,
            mode: 'development',
            usage: 'build',
            srcDirectory: 'src',
            hostPackageName: 'test',
            buildVersion: '000000',
            buildTime: (new Date()).toISOString(),
            features: {},
            buildTarget: 'stable',
            isDefaultTarget: false,
            entries: [],
            projectSettings: withFinalize,
        };
        const config = createWebpackConfig(context);
        expect(finalize).toHaveBeenCalled();
        expect(typeof finalize.mock.calls[0][0]).toBe('object');
        expect(typeof finalize.mock.calls[0][0].module).toBe('object');
        expect(typeof finalize.mock.calls[0][1]).toBe('object');
        expect(config.mode).toBe('none');
    });

    test('can modify babel config', () => {
        const finalize = jest.fn(config => ({...config, comments: false}));
        const projectSettings = readProjectSettings({cwd: __dirname}, 'build');
        const withFinalize = {
            ...projectSettings,
            build: {
                ...projectSettings.build,
                script: {
                    ...projectSettings.build.script,
                    finalize,
                },
            },
        };
        const context = {
            cwd: __dirname,
            mode: 'development',
            usage: 'build',
            srcDirectory: 'src',
            hostPackageName: 'test',
            buildVersion: '000000',
            buildTime: (new Date()).toISOString(),
            features: {},
            buildTarget: 'stable',
            isDefaultTarget: false,
            entries: [],
            projectSettings: withFinalize,
        };
        createWebpackConfig(context);
        expect(finalize).toHaveBeenCalled();
        expect(typeof finalize.mock.calls[0][0]).toBe('object');
        expect(typeof finalize.mock.calls[0][0].presets).toBe('object');
        expect(typeof finalize.mock.calls[0][1]).toBe('object');
    });
});
