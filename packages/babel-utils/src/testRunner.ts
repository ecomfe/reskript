import fs from 'fs';
import babel from '@babel/core';
import glob from 'glob';

type Test = (description: string, execute: () => void) => void;

interface Expectable {
    toMatchSnapshot(): void;
}

type Expect = (code: string) => Expectable;

interface TestTools {
    test: Test;
    expect: Expect;
}

export const createTestRunner = (cwd: string, tools: TestTools, babelOptions: babel.TransformOptions) => {
    const {test, expect} = tools;
    const transformAndSnapshot = (description: string, inputCode: string, filename?: string) => test(
        description,
        () => {
            const output = babel.transformSync(
                inputCode,
                {
                    filename,
                    ...babelOptions,
                }
            );

            expect(output?.code ?? '').toMatchSnapshot();
        }
    );

    return (suite?: string) => {
        const fixtures = suite
            ? glob.sync(`${cwd}/fixtures/${suite}/**/*.{js,tsx}`)
            : glob.sync(`${cwd}/fixtures/**/*.{js,tsx}`);
        for (const fixture of fixtures) {
            const code = fs.readFileSync(fixture, 'utf-8');
            const description = code.split('\n')[0].substring(3);
            transformAndSnapshot(description, code, fixture);
        }
    };
};
