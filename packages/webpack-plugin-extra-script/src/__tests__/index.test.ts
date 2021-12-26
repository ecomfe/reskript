import {test, expect, vi} from 'vitest';
import compiler from './compiler';

test('remote script', async () => {
    const html = await compiler({src: '/extra.js'});
    expect(html.includes('src="/extra.js"')).toBe(true);
});

test('inline script', async () => {
    const html = await compiler({content: 'alert("extra")'});
    expect(html.includes('alert("extra")')).toBe(true);
});

test('array of scripts', async () => {
    const html = await compiler([{src: '/extra-1.js'}, {src: '/extra-2.js'}]);
    expect(html.includes('src="/extra-1.js"')).toBe(true);
    expect(html.includes('src="/extra-2.js"')).toBe(true);
});

test('factory', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const factory = vi.fn(() => ({src: '/extra.js'}));
    const html = await compiler(factory);
    expect(html.includes('src="/extra.js"')).toBe(true);
    expect(factory).toHaveBeenCalled();
    // @ts-expect-error
    expect(typeof factory.mock.calls[0][0]).toBe('object');
});

test('prepend', async () => {
    const html = await compiler({src: '/extra.js'}, {prepend: true});
    expect(html.includes('src="/extra.js"')).toBe(true);
    expect(html.indexOf('extra.js')).toBeLessThan(html.indexOf('bundle.js'));
});
