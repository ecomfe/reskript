import {dirFromImportMeta} from '@reskript/core';
import {readProjectSettings} from '@reskript/settings';
import {test, expect} from 'vitest';
import {BuildContext} from '../interface';
import {createWebpackConfig} from '../index';

const currentDirectory = dirFromImportMeta(import.meta.url);

test('returns configuration', async () => {
    const projectSettings = await readProjectSettings({cwd: currentDirectory}, 'build');
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
        projectSettings,
    };
    const config = await createWebpackConfig(context);
    expect(config).toBeTruthy();
    expect(config.output).toBeTruthy();
    expect(config.module).toBeTruthy();
    expect(config.entry).toBeTruthy();
    expect(config.resolve).toBeTruthy();
});

test('can specify a custom webpack entry descriptor', async () => {
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
        projectSettings: await readProjectSettings({cwd: currentDirectory}, 'build'),
        entries: [
            {
                name: 'service-worker',
                file: './service-worker.js',
                template: '',
                config: {
                    entry: {
                        filename: 'service-worker.js',
                    },
                },
            },
        ],
    };
    const config = await createWebpackConfig(context);
    expect((config.entry as Record<string, any>)['service-worker'].filename).toBe('service-worker.js');
});
