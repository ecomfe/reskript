import path from 'path';
import fs from 'fs';
import * as babel from '@babel/core';
import plugin from '../index';

const HOOK_MODULE = path.join(__dirname, '..', 'useComponentFile.js');

const BABEL_OPTIONS = {
    presets: ['@babel/preset-react'],
    plugins: [
        [
            plugin,
            {
                srcDirectory: path.join(__dirname, 'fixtures', 'src'),
            },
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-classes',
    ],
};

const testFixture = (name: string, shouldInject: boolean) => {
    const filename = path.join(__dirname, 'fixtures', name);
    const content = fs.readFileSync(filename, 'utf-8');
    const result = babel.transformSync(content, {...BABEL_OPTIONS, filename});
    expect((result?.code ?? '').includes('useComponentFile("')).toBe(shouldInject);
    expect((result?.code ?? '').includes(`import useComponentFile from "${HOOK_MODULE}"`)).toBe(shouldInject);
};

test('export default component', () => testFixture('src/export-default-component.js', true));

test('multiple components', () => testFixture('src/multiple-components.js', true));

test('no component with pascal case name', () => testFixture('src/no-component.js', false));

test('simple function', () => testFixture('src/simple-function.js', false));

test('call createElement', () => testFixture('src/create-element.js', true));

test('call React.createElement', () => testFixture('src/react-create-element.js', true));

test('call cloneElement', () => testFixture('src/clone-element.js', true));

test('call React.cloneElement', () => testFixture('src/react-clone-element.js', true));

test('has more than 1 parameters', () => testFixture('src/multiple-parameters.js', false));

test.only('class component', () => testFixture('src/class-component.js', false));

test('outside src directory', () => testFixture('outside-src.js', false));
