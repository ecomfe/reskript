import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {test, expect} from 'vitest';
import {build as viteBuild, InlineConfig} from 'vite';
import {RollupOutput} from 'rollup';
import cssForceModules from '../index.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const build = async () => {
    const config: InlineConfig = {
        root: path.join(currentDirectory, 'fixtures'),
        logLevel: 'warn',
        plugins: [
            cssForceModules(),
        ],
    };
    const bundle = await viteBuild(config) as RollupOutput;
    const cssAsset = bundle.output.find(v => path.extname(v.fileName) === '.css');
    return cssAsset?.type === 'asset' ? cssAsset.source.toString() : '';
};

test('css', async () => {
    const css = await build();
    expect(css.includes('._css_')).toBe(true);
});

test('less', async () => {
    const css = await build();
    expect(css.includes('_bar_')).toBe(true);
    expect(css.includes('_foo_')).toBe(true);
});

test('global', async () => {
    const css = await build();
    expect(css.includes('.global{')).toBe(true);
});
