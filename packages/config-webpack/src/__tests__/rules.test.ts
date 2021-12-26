import {test, expect} from 'vitest';
import compiler from './compiler';

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

test('project source worker', async () => {
    const {entryModule} = await compiler(
        'src/busy.worker.js',
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

test('external no worker', async () => {
    const {entryModule} = await compiler('externals/lazy.worker.js');
    expect(entryModule?.identifier?.includes('worker-loader')).toBe(false);
});
