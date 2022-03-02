import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {test, expect} from 'vitest';
import vite, {InlineConfig} from 'vite';
import {RollupOutput, OutputAsset, OutputChunk} from 'rollup';
import virtualEntry, {VirtualEntryOptions} from '../index.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const createEntry = (name: string) => {
    return {
        name,
        entry: path.join(currentDirectory, 'fixtures', `${name}-stable.html`),
        content: `<!DOCTYPE html><html><body><script type="module" src="/${name}.ts"></script></body></html>`,
    };
};

const build = async (options: Pick<VirtualEntryOptions, 'favicon'>) => {
    const entries = [
        createEntry('index'),
        createEntry('about'),
    ];
    const entryOptions: VirtualEntryOptions = {
        ...options,
        entries,
        publicPath: '/',
        defaultEntry: entries[0],
        buildTarget: 'stable',
        customizeMiddleware: () => {},
    };
    const config: InlineConfig = {
        root: path.join(currentDirectory, 'fixtures'),
        logLevel: 'warn',
        build: {
            rollupOptions: {
                input: Object.entries(entries).reduce(
                    (input, [name, {entry}]) => Object.assign(input, {[name]: entry}),
                    {} as Record<string, string>
                ),
            },
        },
        plugins: [
            virtualEntry(entryOptions),
        ],
    };
    const bundle = await vite.build(config) as RollupOutput;
    return {
        assets: bundle.output.filter((v: any): v is OutputAsset => v.type === 'asset'),
        chunks: bundle.output.filter((v: any): v is OutputChunk => v.type === 'chunk'),
    };
};

test('entry', async () => {
    const {chunks} = await build({});
    expect(chunks.some(v => v.code.includes('Hello World'))).toBe(true);
    expect(chunks.some(v => v.code.includes('About Me'))).toBe(true);
});

test('favicon', async () => {
    const {assets} = await build({favicon: 'favicon.ico'});
    expect(assets.every(v => v.source.toString().includes('link rel="icon"'))).toBe(true);
});

test('multiple entries', async () => {
    const {assets} = await build({});
    expect(assets.length).toBe(2);
});
