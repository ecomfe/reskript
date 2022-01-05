import compiler from './compiler';

test('default', async () => {
    const code = await compiler();
    expect(code.includes('export default SVGToComponent')).toBe(true);
});

test('display name', async () => {
    const code = await compiler({displayName: true});
    expect(code.includes('SVGToComponent.displayName = "IconTest";')).toBe(true);
});

test('attribute name camel case', async () => {
    const code = await compiler();
    expect(code.includes('"strokeWidth"')).toBe(true);
});

test('class attribute', async () => {
    const code = await compiler();
    expect(code.includes('"className":"test-class"')).toBe(true);
});
