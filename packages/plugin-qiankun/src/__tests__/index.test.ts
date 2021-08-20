import {fillProjectSettings} from '@reskript/settings';
import plugin from '../index';

test('build to umd', () => {
    const projectSettings = fillProjectSettings();
    const settings = plugin('test-app')(projectSettings, {cwd: process.cwd()});
    const webpackConfig = settings.build.finalize({}, {} as any, {} as any);
    expect(webpackConfig.output?.libraryTarget).toBe('umd');
    expect(webpackConfig.output?.globalObject).toBe('window');
});

test('dev server container', () => {
    const projectSettings = fillProjectSettings();
    const settings = plugin('test-app')(projectSettings, {cwd: process.cwd()});
    expect(typeof settings.devServer.finalize).toBe('function');
});
