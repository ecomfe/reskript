import fs from 'fs/promises';

test('entry config', async () => {
    const files = await fs.readdir('dist/assets');
    expect(files.some(v => v.includes('todo-index'))).toBe(true);
});

test('image compress', async () => {
    const files = await fs.readdir('dist/assets');
    const image = files.find(v => v.endsWith('.png'));
    expect(image).toBeTruthy();
    const originalStat = await fs.stat('src/components/App/decoration.png');
    const artifactStat = await fs.stat(`dist/assets/${image}`);
    expect(artifactStat.size).toBeLessThan(originalStat.size);
});
