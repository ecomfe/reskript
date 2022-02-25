import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {test, expect} from 'vitest';
import vite, {InlineConfig} from 'vite';
import {RollupOutput} from 'rollup';
import virtualEntry, {VirtualEntryOptions} from '../index.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const build = async (options: Omit<VirtualEntryOptions, 'port' | 'host' | 'protocol' | 'content'>) => {
    const entryOptions: VirtualEntryOptions = {
        ...options,
        protocol: 'http',
        host: 'localhost',
        port: 9998,
        content: '<!DOCTYPE html><html><body></body></html>',
    };
    const config: InlineConfig = {
        root: path.join(currentDirectory, 'fixtures'),
        logLevel: 'warn',
        build: {
            rollupOptions: {
                input: {
                    [options.name]: path.join(currentDirectory, 'fixtures', `${options.name}.html`),
                },
            },
        },
        plugins: [
            virtualEntry(entryOptions),
        ],
    };
    const bundle = await vite.build(config) as RollupOutput;
    const htmlAsset = bundle.output.find(v => path.extname(v.fileName) === '.html');
    return {
        code: bundle.output[0].code,
        html: htmlAsset?.type === 'asset' ? htmlAsset.source.toString() : '',
    };
};

test.only('entry', async () => {
    const {code} = await build({name: 'index', entry: 'index.ts'});
    expect(code.includes('Hello World')).toBe(true);
});

test('favicon', async () => {
    const {html} = await build({name: 'index', entry: 'index.ts', favicon: 'favicon.ico'});
    expect(html.includes('link rel="icon"')).toBe(true);
});
