import path from 'node:path';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {test, expect} from 'vitest';
import transform from '../transformSvgToComponent.js';

interface TransformOptions {
    displayName?: boolean;
}

const transformToCode = async ({displayName = false}: TransformOptions = {}) => {
    const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
    const resource = path.join(currentDirectory, 'fixtures', 'icon-test.svg');
    const source = await fs.readFile(resource, 'utf8');
    const code = await transform(source, {resource, displayName});
    return code;
};

test('default', async () => {
    const code = await transformToCode();
    expect(code.includes('export default SVGToComponent')).toBe(true);
});

test('display name', async () => {
    const code = await transformToCode({displayName: true});
    expect(code.includes('SVGToComponent.displayName = "IconTest";')).toBe(true);
});

test('attribute name camel case', async () => {
    const code = await transformToCode();
    expect(code.includes('"strokeWidth"')).toBe(true);
});

test('class attribute', async () => {
    const code = await transformToCode();
    expect(code.includes('"className":"test-class"')).toBe(true);
});
