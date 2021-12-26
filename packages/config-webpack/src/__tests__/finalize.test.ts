import {describe, test, expect, vi} from 'vitest';
import {TransformOptions} from '@babel/core';
import {Configuration} from 'webpack';
import {dirFromImportMeta} from '@reskript/core';
import {readProjectSettings} from '@reskript/settings';
import {createWebpackConfig} from '../index';
import {BuildContext} from '../interface';

const currentDirectory = dirFromImportMeta(import.meta.url);

describe('finalize', () => {
    test('can receive a fully resolved webpack config and modify it', async () => {
        const finalize = vi.fn((config: Configuration) => ({...config, mode: 'production' as const}));
        const projectSettings = await readProjectSettings({cwd: currentDirectory}, 'build');
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
        // @ts-expect-error
        expect(typeof finalize.mock.calls[0][0]).toBe('object');
        // @ts-expect-error
        expect(typeof finalize.mock.calls[0][0].module).toBe('object');
        // @ts-expect-error
        expect(typeof finalize.mock.calls[0][1]).toBe('object');
        expect(config.mode).toBe('production');
    });

    test('can modify babel config', async () => {
        const finalize = vi.fn((config: TransformOptions) => ({...config, comments: false}));
        const projectSettings = await readProjectSettings({cwd: currentDirectory}, 'build');
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
        // @ts-expect-error
        expect(typeof finalize.mock.calls[0][0]).toBe('object');
        // @ts-expect-error
        expect(typeof finalize.mock.calls[0][0].presets).toBe('object');
        // @ts-expect-error
        expect(typeof finalize.mock.calls[0][1]).toBe('object');
    });
});
