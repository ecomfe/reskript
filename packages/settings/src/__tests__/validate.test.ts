import {describe, test, expect} from 'vitest';
import validate from '../validate.js';

describe('validate', () => {
    test('empty', () => {
        expect(() => validate({})).not.toThrow();
    });

    test('uses pass', () => {
        expect(() => validate({build: {uses: ['antd']}})).not.toThrow();
    });

    test('uses invalid value', () => {
        expect(() => validate({build: {uses: ['unwanted']}})).toThrow();
    });

    test('additional properties', () => {
        const settings = {
            foo: 'bar',
        };

        expect(() => validate(settings)).toThrow();
    });

    test('additional properties in build', () => {
        const settings = {
            build: {
                foo: 'bar',
            },
        };

        expect(() => validate(settings)).toThrow();
    });

    test('additional properties in devServer', () => {
        const settings = {
            devServer: {
                foo: 'bar',
            },
        };

        expect(() => validate(settings)).toThrow();
    });

    test('invalid plugins', () => {
        const settings = {
            plugins: [
                {},
                123,
                421412,
            ],
        };

        expect(() => validate(settings)).toThrow();
    });

    test('feature matrix', () => {
        const settings = {
            featureMatrix: {
                stable: {
                    track: false,
                    date: '2020-06-01',
                },
                dev: {
                    track: true,
                    date: '2020-07-01',
                },
            },
        };

        expect(() => validate(settings)).not.toThrow();
    });

    test('plugin array', () => {
        const settings = {
            plugins: [
                () => ({}),
            ],
        };

        expect(() => validate(settings)).not.toThrow();
    });

    test('plugin factory', () => {
        const settings = {
            plugins: () => [],
        };

        expect(() => validate(settings)).not.toThrow();
    });
});
