import {sync as resolve} from 'resolve';
import * as babel from '@babel/core';

const transform = (inputCode: string) => {
    const result = babel.transformSync(
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
    return result?.code;
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
