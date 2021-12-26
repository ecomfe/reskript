import path from 'path';
import {test, expect} from 'vitest';
import {dirFromImportMeta} from '@reskript/core';
import {collectEntries} from '../index';

const currentDirectory = dirFromImportMeta(import.meta.url);

test('collect all', async () => {
    const entryLocation = {
        cwd: path.join(currentDirectory, 'fixtures'),
        srcDirectory: 'src',
        entryDirectory: 'pages',
    };
    const entries = await collectEntries(entryLocation);
    const alice = entries.find(e => e.name === 'alice');
    expect(alice).toBeTruthy();
    expect(alice?.file.includes('src/pages/alice/index.jsx')).toBe(true);
    const bob = entries.find(e => e.name === 'bob');
    expect(bob).toBeTruthy();
    expect(bob?.template?.includes('bob/index.ejs')).toBe(true);
    expect(bob?.config?.html?.meta.title).toBe('bob');
    const foo = entries.find(e => e.name === 'foo');
    expect(foo).toBeTruthy();
    expect(foo?.config?.entry?.filename).toBe('foo.dist.js');
    const bar = entries.find(e => e.name === 'bar');
    expect(bar).toBeTruthy();
    expect(bar?.template?.includes('bar.ejs')).toBe(true);
});
