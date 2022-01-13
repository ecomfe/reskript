import {fillProjectSettings} from '@reskript/settings';
import plugin from '../index';

test('build to umd', async () => {
    const projectSettings = fillProjectSettings({provider: 'webpack'});
    const settings = await plugin('test-app')(projectSettings, {cwd: process.cwd(), command: 'dev'});
    const webpackConfig = settings.build.finalize({}, {} as any, {} as any);
    expect(webpackConfig.output?.libraryTarget).toBe('umd');
    expect(webpackConfig.output?.globalObject).toBe('window');
});

test('dev server container', async () => {
    const projectSettings = fillProjectSettings({provider: 'webpack'});
    const settings = await plugin('test-app')(projectSettings, {cwd: process.cwd(), command: 'dev'});
    expect(typeof settings.devServer.finalize).toBe('function');
});
