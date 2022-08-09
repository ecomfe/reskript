import {describe, test, expect, vi} from 'vitest';
import {TransformOptions} from '@babel/core';
import {dirFromImportMeta} from '@reskript/core';
import {
    readProjectSettings,
    CommandInput,
    FinalizableWebpackConfiguration,
    WebpackProjectSettings,
} from '@reskript/settings';
import {createWebpackConfig} from '../index.js';
import {BuildContext} from '../interface.js';

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
    watch: false,
};

const currentDirectory = dirFromImportMeta(import.meta.url);

describe('finalize', () => {
    test('can receive a fully resolved webpack config and modify it', async () => {
        const finalize = vi.fn((config: FinalizableWebpackConfiguration) => ({...config, mode: 'production' as const}));
        const options = {...BUILD_CMD, cwd: currentDirectory};
        const projectSettings = await readProjectSettings(options) as WebpackProjectSettings;
        const withFinalize = {
            ...projectSettings,
            build: {
                ...projectSettings.build,
                finalize,
            },
        };
        const context: BuildContext = {
            cwd: currentDirectory,
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
        expect(config.mode).toBe('production');
    });

    test('can modify babel config', async () => {
        const finalize = vi.fn((config: TransformOptions) => ({...config, comments: false}));
        const options = {...BUILD_CMD, cwd: currentDirectory};
        const projectSettings = await readProjectSettings(options) as WebpackProjectSettings;
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
            cwd: currentDirectory,
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
    });
});
