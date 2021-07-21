import {readProjectSettings} from '@reskript/settings';
import {createWebpackConfig} from '../index';

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

test('can specify a custom webpack entry descriptor', () => {
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
        projectSettings: readProjectSettings({cwd: __dirname}, 'build'),
        entries: [
            {
                name: 'service-worker',
                file: './service-worker.js',
                config: {
                    entry: {
                        filename: 'service-worker.js',
                    },
                },
            },
        ],
    };
    const config = createWebpackConfig(context);
    expect(config.entry['service-worker'].filename).toBe('service-worker.js');
});
