import {describe, test, expect} from 'vitest';
import loader from '../index.js';

describe('loader', () => {
    test('is a loader function', () => {
        expect(typeof loader).toBe('function');
    });
});
