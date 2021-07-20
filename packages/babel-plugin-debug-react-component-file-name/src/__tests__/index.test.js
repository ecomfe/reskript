import path from 'path';
import fs from 'fs';
import * as babel from '@babel/core';
import plugin from '../index';

const HOOK_MODULE = path.join(__dirname, '..', 'useComponentFile');

const BABEL_OPTIONS = {
    presets: ['@babel/preset-react'],
    plugins: [
        [
            plugin,
            {
                srcDirectory: path.join(__dirname, 'fixtures', 'src'),
            },
        ],
    ],
};

const testFixture = (name, shouldInject) => {
    const filename = path.join(__dirname, 'fixtures', name);
    const content = fs.readFileSync(filename);
    const {code} = babel.transformSync(content, {...BABEL_OPTIONS, filename});
    expect(/useComponentFile("[^"]+")/.test(code)).toBe(shouldInject);
    expect(code.includes(`import useComponentFile from "${HOOK_MODULE}"`)).toBe(shouldInject);
};

test('export default component', () => testFixture('src/export-default-component.js', true));

test('multiple components', () => testFixture('src/multiple-components.js', true));

test('no component', () => testFixture('src/no-component.js', false));

test('outside src directory', () => testFixture('outside-src.js', false));
