import {Configuration} from 'webpack';
import {BuildEntry, readProjectSettings} from '@reskript/settings';
import {createWebpackConfig} from '../index';
import {BuildContext} from '../interface';

describe('finalize', () => {
    test('can receive a fully resolved webpack config and modify it', async () => {
        const finalize = jest.fn(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (config: Configuration, entry: BuildEntry) => {
                return {...config, mode: 'production' as const};
            }
        );
        const projectSettings = await readProjectSettings({cwd: __dirname}, 'build');
        const withFinalize = {
            ...projectSettings,
            build: {
                ...projectSettings.build,
                finalize,
            },
        };
        const context: BuildContext = {
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
        const config = await createWebpackConfig(context);
        expect(finalize).toHaveBeenCalled();
        expect(typeof finalize.mock.calls[0][0]).toBe('object');
        expect(typeof finalize.mock.calls[0][0].module).toBe('object');
        expect(typeof finalize.mock.calls[0][1]).toBe('object');
        expect(config.mode).toBe('production');
    });

    test('can modify babel config', async () => {
        const finalize = jest.fn(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (config, buildEntry) => ({...config, comments: false})
        );
        const projectSettings = await readProjectSettings({cwd: __dirname}, 'build');
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
        const context: BuildContext = {
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
        await createWebpackConfig(context);
        expect(finalize).toHaveBeenCalled();
        expect(typeof finalize.mock.calls[0][0]).toBe('object');
        expect(typeof finalize.mock.calls[0][0].presets).toBe('object');
        expect(typeof finalize.mock.calls[0][1]).toBe('object');
    });
});
