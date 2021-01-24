import {fillProjectSettings} from '@reskript/settings';
import plugin from '../index';

test('build to umd', () => {
    const projectSettings = fillProjectSettings();
    const settings = plugin('test-app')(projectSettings);
    const webpackConfig = settings.build.finalize({}, {});
    expect(webpackConfig.output.libraryTarget).toBe('umd');
    expect(webpackConfig.output.globalObject).toBe('window');
});

test('dev server container', () => {
    const projectSettings = fillProjectSettings();
    const settings = plugin('test-app')(projectSettings);
    expect(typeof settings.devServer.finalize).toBe('function');
});

