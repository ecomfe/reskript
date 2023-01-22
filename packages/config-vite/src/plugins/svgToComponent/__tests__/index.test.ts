import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {test, expect} from 'vitest';
import {build as viteBuild, InlineConfig} from 'vite';
import {RollupOutput} from 'rollup';
import svgToComponent, {Options} from '../index.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const build = async (options?: Options) => {
    const config: InlineConfig = {
        root: path.join(currentDirectory, 'fixtures'),
        logLevel: 'warn',
        plugins: [
            svgToComponent(options),
        ],
    };
    const bundle = await viteBuild(config) as RollupOutput;
    return bundle;
};

test('to component', async () => {
    const bundle = await build();
    const code = bundle.output[0].code;
    expect(code.includes('dangerouslySetInnerHTML')).toBe(true);
    expect(code.includes('displayName="')).toBe(false);
});

test('display name', async () => {
    const bundle = await build({displayName: true});
    const code = bundle.output[0].code;
    expect(code.includes('displayName="')).toBe(true);
});

test('no svg assest', async () => {
    const bundle = await build({displayName: true});
    const svgAsset = bundle.output.find(v => path.extname(v.fileName) === '.svg');
    expect(svgAsset).toBeUndefined();
});
