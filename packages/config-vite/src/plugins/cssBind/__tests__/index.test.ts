import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {test, expect} from 'vitest';
import {build as viteBuild, InlineConfig} from 'vite';
import {RollupOutput} from 'rollup';
import cssBind from '../index.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const build = async (classNamesModule: string) => {
    const config: InlineConfig = {
        root: path.join(currentDirectory, 'fixtures'),
        logLevel: 'warn',
        plugins: [
            cssBind({classNamesModule}),
        ],
    };
    const bundle = await viteBuild(config) as RollupOutput;
    return bundle.output[0].code;
};

test('bind to function', async () => {
    const code = await build('classnames/bind');
    expect(code.includes('Unable to assign class name')).toBe(true);
});

test('custom classNames module', async () => {
    const code = await build(path.join(currentDirectory, 'fixtures', 'classNames'));
    expect(code.includes('internal-class-')).toBe(true);
});
