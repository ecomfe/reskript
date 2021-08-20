import compiler from './compiler';

test('default', async () => {
    const code = await compiler();
    expect(code.includes('export const url = new URL(')).toBe(true);
    expect(code.includes('export function ReactComponent(props) {')).toBe(true);
    expect(code.includes('export default url')).toBe(true);
});

test('deprecation warning', async () => {
    const code = await compiler({deprecationWarning: true});
    expect(code.includes('is deprecated')).toBe(true);
});

test('display name', async () => {
    const code = await compiler({displayName: true});
    expect(code.includes('ReactComponent.displayName = "IconTest";')).toBe(true);
});
