import fs from 'node:fs';
import babel from '@babel/core';
import {globSync} from 'glob';

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
            ? globSync(`${cwd}/fixtures/${suite}/**/*.{js,tsx}`)
            : globSync(`${cwd}/fixtures/**/*.{js,tsx}`);
        for (const fixture of fixtures) {
            const code = fs.readFileSync(fixture, 'utf-8');
            const description = code.split('\n')[0].substring(3);
            transformAndSnapshot(description, code, fixture);
        }
    };
};
