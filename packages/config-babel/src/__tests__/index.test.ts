import {PluginItem} from '@babel/core';
import {getParseOnlyBabelConfig, getTransformBabelConfig, getBabelConfig, BabelConfigOptions} from '../index';

const findPluginByKeyword = (plugins: PluginItem[] | null | undefined, keyword: string) => {
    if (!plugins) {
        return false;
    }

    const isMatch = (item: PluginItem) => {
        if (typeof item === 'string') {
            return item.includes(keyword);
        }

        if (Array.isArray(item)) {
            const name = item[0];
            return typeof name === 'string' && name.includes(keyword);
        }

        // 不处理其它情况了，测试里不会发生
        return false;
    };
    return plugins.some(isMatch);
};

const options: BabelConfigOptions = {
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

describe('third party use', () => {
    test('reflect-metadata', () => {
        const config = getTransformBabelConfig({...options, uses: ['reflect-metadata']});
        expect(findPluginByKeyword(config.plugins, 'babel-plugin-transform-typescript-metadata')).toBe(true);
    });
});
