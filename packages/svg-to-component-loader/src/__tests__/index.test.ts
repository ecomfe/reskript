import compiler from './compiler';

test('default', async () => {
    const code = await compiler();
    expect(code.includes('export default function SVGToComponent(props)')).toBe(true);
});

test('display name', async () => {
    const code = await compiler({displayName: true});
    expect(code.includes('SVGToComponent.displayName = "IconTest";')).toBe(true);
});
