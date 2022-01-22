import childProcess, {ChildProcess} from 'child_process';
import {test, expect} from '@playwright/test';

const devServer: {current: ChildProcess | null} = {current: null};

test.beforeAll(async () => {
    const process = childProcess.spawn('skr', ['dev', '--no-open'], {stdio: 'pipe'});
    await new Promise(resolve => process.stdout.on('data', resolve));
    devServer.current = process;
});

test.afterAll(() => {
    devServer.current?.kill();
});

test('has footer', async ({page}) => {
    await page.goto('https://localhost:8989');
    await expect(page.locator('#app-footer')).toHaveText('TodoMVC by reSKRipt');
});

test('postcss works', async ({page}) => {
    await page.goto('https://localhost:8989');
    const styles = await page.locator('#app').evaluate(element => Object.values(getComputedStyle(element)));
    expect(styles).toContain('top');
    expect(styles).toContain('right');
    expect(styles).toContain('bottom');
    expect(styles).toContain('right');
    expect(styles).not.toContain('inset');
});

test('tailwind works', async ({page}) => {
    await page.goto('https://localhost:8989');
    const styles = await page.locator('#app-meta').evaluate(element => getComputedStyle(element));
    expect(styles.justifyContent).toBe('space-between');
    expect(styles.alignItems).toBe('center');
});
