import {test, expect} from 'vitest';
import runtimeEntry from '../runtimeEntry.js';

test('output bundle', async () => {
    const content = await runtimeEntry('test-app');
    expect(typeof content).toBe('string');
    expect(content?.length).toBeGreaterThan(0);
    expect(content?.includes('test-app')).toBe(true);
    expect(content?.includes('registerMicroApps(')).toBe(true);
});
