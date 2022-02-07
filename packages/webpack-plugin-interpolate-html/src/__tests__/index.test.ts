import {test, expect} from 'vitest';
import compiler from './compiler.js';

test('replace', async () => {
    const html = await compiler({FOO: '"foo"', BAR: '1'});
    expect(html.includes('<div>"foo"</div>')).toBe(true);
    expect(html.includes('<div>1</div>')).toBe(true);
});
