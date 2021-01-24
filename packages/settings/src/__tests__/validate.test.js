import validate from '../validate';

describe('validate', () => {
    test('empty', () => {
        expect(() => validate({})).not.toThrow();
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

    test('additional properties in rollup', () => {
        const settings = {
            rollup: {
                foo: 'bar',
            },
        };

        expect(() => validate(settings)).toThrow();
    });

    test('additional properties in play', () => {
        const settings = {
            play: {
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
