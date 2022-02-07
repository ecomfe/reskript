import {describe, test, expect} from 'vitest';
import {GitStatusItem} from 'g-status';
import {filterChanged, filterStaged, filterStagedOnly, extractName} from '../utils.js';

// Changes to be committed:
//     modified:   1
//     new file:   2
//     renamed:    4 -> 5
//     deleted:    6
//     modified:   7
//     new file:   9
//     new file:   10
//     deleted:    11
//     deleted:    13
// Changes not staged for commit:
//     deleted:    1
//     deleted:    3
//     modified:   7
//     modified:   8
// Untracked files:
//     12
//     13
const diff: GitStatusItem[] = [
    {path: '1', index: 'M', workingTree: 'D'},
    {path: '2', index: 'A', workingTree: ' '},
    {path: '3', index: ' ', workingTree: 'D'},
    {path: '4 -> 5', index: 'R', workingTree: ' '},
    {path: '6', index: 'D', workingTree: ' '},
    {path: '7', index: 'M', workingTree: 'M'},
    {path: '8', index: ' ', workingTree: 'M'},
    {path: '9', index: 'A', workingTree: ' '},
    {path: '10', index: 'A', workingTree: ' '},
    {path: '11', index: 'D', workingTree: ' '},
    {path: '13', index: 'D', workingTree: ' '},
    {path: '12', index: '?', workingTree: '?'},
    {path: '13', index: '?', workingTree: '?'},
];

describe('filterChanged', () => {
    test('ignore deleted', () => {
        const names = filterChanged(diff).map(v => v.path);
        expect(names).toEqual(['2', '4 -> 5', '7', '8', '9', '10', '12', '13']);
    });
});

describe('filterStaged', () => {
    test('include modified', () => {
        const names = filterStaged(diff).map(v => v.path);
        expect(names).toEqual(['2', '4 -> 5', '7', '9', '10']);
    });
});

describe('filterStagedOnly', () => {
    test('exclude modified', () => {
        const names = filterStagedOnly(diff).map(v => v.path);
        expect(names).toEqual(['2', '4 -> 5', '9', '10']);
    });
});

describe('extractName', () => {
    test('simple name', () => {
        expect(extractName({path: 'abc', index: ' ', workingTree: ' '})).toBe('abc');
    });

    test('quoted', () => {
        expect(extractName({path: '"abc"', index: ' ', workingTree: ' '})).toBe('abc');
    });

    test('start quote only', () => {
        expect(extractName({path: '"abc', index: ' ', workingTree: ' '})).toBe('"abc');
    });

    test('end quote only', () => {
        expect(extractName({path: 'abc"', index: ' ', workingTree: ' '})).toBe('abc"');
    });

    test('rename', () => {
        expect(extractName({path: 'xyz -> "abc"', index: 'R', workingTree: ' '})).toBe('abc');
    });

    test('copy', () => {
        expect(extractName({path: 'xyz -> "abc"', index: 'C', workingTree: ' '})).toBe('abc');
    });
});
