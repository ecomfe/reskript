import path from 'path';
import fs from 'fs';
import babel from '@babel/core';
import {expect, test} from 'vitest';
import {dirFromImportMeta} from '@reskript/core';
import plugin from '../index';

const HOOK_MODULE = path.join(dirFromImportMeta(import.meta.url), '..', 'useComponentFile.js');

const BABEL_OPTIONS = {
    presets: ['@babel/preset-react'],
    plugins: [
        [
            plugin,
            {
                srcDirectory: path.join(dirFromImportMeta(import.meta.url), 'fixtures', 'src'),
            },
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-classes',
    ],
};

const testFixture = (name: string, shouldInject: boolean) => {
    const filename = path.join(dirFromImportMeta(import.meta.url), 'fixtures', name);
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
