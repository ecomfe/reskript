import {describe, test, expect} from 'vitest';
import {TransformOptions} from '@babel/core';
import {dirFromImportMeta} from '@reskript/core';
import {getParseOnlyBabelConfig, getTransformBabelConfig, getBabelConfig, BabelConfigOptions} from '../index';

const pluginLengthDifference = (from: TransformOptions, to: TransformOptions) => {
    return (to.plugins?.length ?? 0) - (from.plugins?.length ?? 0);
};

const options: BabelConfigOptions = {
    cwd: dirFromImportMeta(import.meta.url),
    mode: 'production',
    hot: true,
    hostType: 'application',
    polyfill: true,
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

describe('third party use', () => {
    test('antd', () => {
        const base = getTransformBabelConfig({...options, uses: []});
        const config = getTransformBabelConfig({...options, uses: ['antd']});
        expect(pluginLengthDifference(base, config)).toBe(1);
    });

    test('lodash', () => {
        const base = getTransformBabelConfig({...options, uses: []});
        const config = getTransformBabelConfig({...options, uses: ['lodash']});
        expect(pluginLengthDifference(base, config)).toBe(1);
    });

    test('emotion', () => {
        const base = getTransformBabelConfig({...options, uses: []});
        const config = getTransformBabelConfig({...options, uses: ['emotion']});
        expect(pluginLengthDifference(base, config)).toBe(1);
    });

    test('reflect-metadata', () => {
        const base = getTransformBabelConfig({...options, uses: []});
        const config = getTransformBabelConfig({...options, uses: ['reflect-metadata']});
        expect(pluginLengthDifference(base, config)).toBe(1);
    });
});
