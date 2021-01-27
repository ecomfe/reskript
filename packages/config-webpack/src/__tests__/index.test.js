import {readProjectSettings} from '@reskript/settings';
import {createWebpackConfig} from '../index';
import compiler from './compiler';

jest.useFakeTimers();

describe('createWebpackConfig', () => {
    test('returns configuration', () => {
        const projectSettings = readProjectSettings({cwd: __dirname}, 'build');
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
            projectSettings,
        };
        const config = createWebpackConfig(context);
        expect(config).toBeTruthy();
        expect(config.output).toBeTruthy();
        expect(config.module).toBeTruthy();
        expect(config.entry).toBeTruthy();
        expect(config.resolve).toBeTruthy();
    });
});

describe('rules', () => {
    test('project source babel', async () => {
        const {entryModule} = await compiler('src/plain.js');
        expect(entryModule.identifier.includes('babel-loader')).toBe(true);
    });

    test('externals no babel', async () => {
        const {entryModule} = await compiler('externals/3rd.js');
        expect(entryModule.identifier.includes('babel-loader')).toBe(false);
    });

    test('external babel included', async () => {
        const {entryModule} = await compiler(
            'externals/3rd.js',
            {
                build: {
                    script: {
                        babel: () => true,
                    },
                },
            }
        );
        expect(entryModule.identifier.includes('babel-loader')).toBe(true);
    });

    test('project source babel excluded', async () => {
        const {entryModule} = await compiler(
            'src/plain.js',
            {
                build: {
                    script: {
                        babel: () => false,
                    },
                },
            }
        );
        expect(entryModule.identifier.includes('babel-loader')).toBe(false);
    });

    test('project source worker', async () => {
        const {entryModule} = await compiler(
            'src/busy.worker.js',
            {
                build: {
                    script: {
                        babel: () => false,
                    },
                },
            }
        );
        expect(entryModule.identifier.includes('worker-loader')).toBe(true);
    });

    test('external no worker', async () => {
        const {entryModule} = await compiler('externals/lazy.worker.js');
        expect(entryModule.identifier.includes('worker-loader')).toBe(false);
    });
});

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
