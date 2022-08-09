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

test('url', async () => {
    const {assets} = await compiler('src/importUrl.js');
    expect(assets?.length).toBe(2);
    expect(assets?.[1].name.includes('.svg')).toBe(true);
    expect(assets?.[1].name.includes('?url')).toBe(false);
});

test('raw', async () => {
    const {assets} = await compiler('src/importRaw.js');
    expect(assets?.length).toBe(1);
});
