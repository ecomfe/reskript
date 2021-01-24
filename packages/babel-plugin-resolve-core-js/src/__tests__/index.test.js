const {sync: resolve} = require('resolve');
const babel = require('@babel/core');

const transform = inputCode => {
    const {code} = babel.transformSync(
        inputCode,
        {
            presets: [],
            plugins: [
                [
                    resolve('../index', {extensions: ['.js', '.ts']}),
                    {
                        replacementName: 'custom-core-js',
                    },
                ],
            ],
        }
    );
    return code;
};

describe('babel-plugin-resolve-core-js', () => {
    test('works with require', () => {
        const output = transform('require("core-js/modules/es.typed-array.set.js");');
        expect(output).toBe('require("custom-core-js/modules/es.typed-array.set.js");');
    });

    test('works with import', () => {
        const output = transform('import "core-js/modules/es.typed-array.set.js";');
        expect(output).toBe('import "custom-core-js/modules/es.typed-array.set.js";');
    });
});
