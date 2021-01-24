import {getParseOnlyBabelConfig, getTransformBabelConfig, getBabelConfig} from '../index';

const findPluginByKeyword = (plugins, keyword) => {
    const isMatch = item => {
        const name = typeof item === 'string' ? item : item[0];
        return name.includes(keyword);
    };
    return plugins.some(isMatch);
};

const options = {
    cwd: __dirname,
    mode: 'production',
    hot: 'all',
    hostType: 'application',
    polyfill: true,
    defaultImportOptimization: true,
};

describe('base config', () => {
    test('getParseOnlyBabelConfig', () => {
        const config = getParseOnlyBabelConfig(options);
        expect(config).toBeTruthy();
        expect(config.presets).toBeTruthy();
        expect(config.plugins).toBeTruthy();
    });

    test('getTransformBabelConfig', () => {
        const config = getTransformBabelConfig(options);
        expect(config).toBeTruthy();
        expect(config.presets).toBeTruthy();
        expect(config.plugins).toBeTruthy();
    });

    test('getBabelConfig', () => {
        const config = getBabelConfig(options);
        expect(config).toBeTruthy();
        expect(config.presets).toBeTruthy();
        expect(config.plugins).toBeTruthy();
    });
});

describe('defaultImportOptimization', () => {
    test('enabled', () => {
        const config = getBabelConfig({...options});
        expect(findPluginByKeyword(config.plugins, 'babel-plugin-import')).toBe(true);
        expect(findPluginByKeyword(config.plugins, 'babel-plugin-lodash')).toBe(true);
    });

    test('disabled', () => {
        const config = getBabelConfig({...options, defaultImportOptimization: false});
        expect(findPluginByKeyword(config.plugins, 'babel-plugin-import')).toBe(false);
        expect(findPluginByKeyword(config.plugins, 'babel-plugin-lodash')).toBe(false);
    });
});
