import {describe, test, expect} from 'vitest';
import {constructProxyConfiguration} from '../proxy.js';

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
        expect(proxy['/foo'].pathRewrite['^/foo']).toBe('/bar');
        expect(proxy['/foo'].rewrite('/foo')).toBe('/bar');
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
