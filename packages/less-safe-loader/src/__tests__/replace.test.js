import replace from '../replace';

describe('replace', () => {
    test('safe calc double quote', () => {
        const input = 'width: ~"calc(100vh - 20px)"';
        expect(replace(input)).toBe(input);
    });

    test('safe calc single quote', () => {
        const input = 'width: ~\'calc(100vh - 20px)\'';
        expect(replace(input)).toBe(input);
    });

    test('unsafe calc', () => {
        const input = 'width: calc(100vh - 20px)';
        expect(replace(input)).toBe('width: ~\'calc(100vh - 20px)\'');
    });

    test('naked variable', () => {
        const input = 'width: calc(100vh - @min-width)';
        expect(replace(input)).toBe('width: ~\'calc(100vh - @{min-width})\'');
    });

    test('nested bracket', () => {
        const input = 'padding-right: calc(@drawer-header-close-padding - var(--scroll-bar))';
        expect(replace(input)).toBe('padding-right: ~\'calc(@{drawer-header-close-padding} - var(--scroll-bar))\'');
    });
});
