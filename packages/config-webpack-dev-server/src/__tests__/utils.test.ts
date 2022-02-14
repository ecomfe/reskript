import {describe, test, expect} from 'vitest';
import {EntryObject} from 'webpack';
import {addHotModuleToEntry} from '../utils.js';

type EntryDescription = Exclude<EntryObject[string], string | string[]>;

describe('addHotModuleToEntry', () => {
    test('string entry', async () => {
        const entry = await addHotModuleToEntry('src/index.js', process.cwd()) as string[];
        expect(Array.isArray(entry)).toBe(true);
        expect(entry.some(v => v.includes('webpack/hot/dev-server.js'))).toBe(true);
        expect(entry.some(v => v.includes('webpack-dev-server/client/index.js'))).toBe(true);
    });

    test('object entry', async () => {
        const entry = await addHotModuleToEntry({import: 'src/index.js'}, process.cwd()) as EntryDescription;
        expect(entry.import).toBeTruthy();
        const imports = entry.import as string[];
        expect(Array.isArray(imports)).toBe(true);
        expect(imports.some(v => v.includes('webpack/hot/dev-server.js'))).toBe(true);
        expect(imports.some(v => v.includes('webpack-dev-server/client/index.js'))).toBe(true);
    });
});
