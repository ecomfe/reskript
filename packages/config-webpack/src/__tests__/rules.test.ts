import {test, expect} from 'vitest';
import compiler from './compiler.js';

test('project source babel', async () => {
    const {entryModule} = await compiler('src/plain.js');
    expect(entryModule?.identifier?.includes('babel-loader')).toBe(true);
});

test('externals no babel', async () => {
    const {entryModule} = await compiler('externals/3rd.js');
    expect(entryModule?.identifier?.includes('babel-loader')).toBe(false);
});

test('external babel included', async () => {
    const {entryModule} = await compiler(
        'externals/3rd.js',
        {
            build: {
                script: {
                    babel: () => true,
                },
            },
        }
    );
    expect(entryModule?.identifier?.includes('babel-loader')).toBe(true);
});

test('project source babel excluded', async () => {
    const {entryModule} = await compiler(
        'src/plain.js',
        {
            build: {
                script: {
                    babel: () => false,
                },
            },
        }
    );
    expect(entryModule?.identifier?.includes('babel-loader')).toBe(false);
});

test('worker query', async () => {
    const {entryModule} = await compiler(
        'src/busy.js?worker',
        {
            build: {
                script: {
                    babel: () => false,
                },
            },
        }
    );
    expect(entryModule?.identifier?.includes('worker-loader')).toBe(true);
});
