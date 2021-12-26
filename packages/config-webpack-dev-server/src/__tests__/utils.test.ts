import {describe, test, expect} from 'vitest';
import {EntryObject} from 'webpack';
import {addHotModuleToEntry, constructProxyConfiguration} from '../utils';

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

describe('constructProxyConfiguration', () => {
    test('multiple prefixes', () => {
        const options = {
            https: false,
            prefixes: ['/foo', '/bar'],
            rewrite: {},
            targetDomain: 'app.me',
        };
        const proxy = constructProxyConfiguration(options);
        expect(proxy['/foo']).toBeTruthy();
        expect(proxy['/foo'].target).toBe('http://app.me');
        expect(proxy['/foo'].pathRewrite['^/foo']).toBe('/foo');
        expect(proxy['/foo'].changeOrigin).toBe(true);
        expect(proxy['/bar']).toBeTruthy();
    });

    test('rewrite', () => {
        const options = {
            https: false,
            prefixes: [],
            rewrite: {
                '/foo': 'app.me:8888/bar',
            },
            targetDomain: 'app.me',
        };
        const proxy = constructProxyConfiguration(options);
        expect(proxy['/foo']).toBeTruthy();
        expect(proxy['/foo'].target).toBe('http://app.me:8888');
        expect(proxy['/foo'].pathRewrite['^/foo']).toBe('bar');
    });

    test('agent', () => {
        const httpProxy = process.env.http_proxy;
        // eslint-disable-next-line camelcase
        process.env.http_proxy = 'http://localhost:8888';
        const options = {
            https: false,
            prefixes: ['/foo'],
            rewrite: {},
            targetDomain: 'app.me',
        };
        const proxy = constructProxyConfiguration(options);
        expect(proxy['/foo'].agent).toBeTruthy();
        // eslint-disable-next-line camelcase
        process.env.http_proxy = httpProxy;
    });

    test('https', () => {
        const options = {
            https: true,
            prefixes: ['/foo'],
            rewrite: {},
            targetDomain: 'app.me',
        };
        const proxy = constructProxyConfiguration(options);
        expect(proxy['/foo'].target).toBe('https://app.me');
    });
});
