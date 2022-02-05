import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {test, expect} from 'vitest';
import vite, {InlineConfig} from 'vite';
import {RollupOutput} from 'rollup';
import virtualEntry, {Options} from '../index.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const build = async (options: Omit<Options, 'port' | 'host'>) => {
    const config: InlineConfig = {
        root: path.join(currentDirectory, 'fixtures'),
        logLevel: 'warn',
        plugins: [
            virtualEntry({...options, host: 'localhost', port: 9998}),
        ],
    };
    const bundle = await vite.build(config) as RollupOutput;
    const htmlAsset = bundle.output.find(v => path.extname(v.fileName) === '.html');
    return {
        code: bundle.output[0].code,
        html: htmlAsset?.type === 'asset' ? htmlAsset.source : '',
    };
};

test('entry', async () => {
    const {code} = await build({entry: '/index.ts'});
    expect(code).includes('Hello World');
});

test('title', async () => {
    const {html} = await build({entry: '/index.ts', title: 'App Title'});
    expect(html).includes('App Title');
});

test('favicon', async () => {
    const {html} = await build({entry: '/index.ts', favicon: '/favicon.ico'});
    expect(html).includes('<link rel="icon"');
});

test('container element', async () => {
    const {html} = await build({entry: '/index.ts', appContainerId: 'app'});
    expect(html).includes('<div id="app"></div>');
});
