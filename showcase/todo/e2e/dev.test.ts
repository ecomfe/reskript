import childProcess, {ChildProcess} from 'node:child_process';
import {test, expect} from '@playwright/test';

const devServer: {current: ChildProcess | null} = {current: null};

test.beforeAll(async () => {
    const process = childProcess.spawn('skr', ['dev', '--no-open', '--config=reskript-e2e.config.ts'], {stdio: 'pipe'});
    devServer.current = process;
    await new Promise(resolve => process.stdout.on('data', resolve));
});

test.afterAll(() => {
    devServer.current?.kill();
});

test('has footer', async ({page}) => {
    await page.goto('http://localhost:9876');
    await expect(page.locator('#app-footer')).toHaveText('TodoMVC by reSKRipt');
});

test('postcss works', async ({page}) => {
    await page.goto('http://localhost:9876');
    const styles = await page.locator('#app').evaluate(element => Object.values(getComputedStyle(element)));
    expect(styles).toContain('top');
    expect(styles).toContain('right');
    expect(styles).toContain('bottom');
    expect(styles).toContain('right');
    expect(styles).not.toContain('inset');
});

test('tailwind works', async ({page}) => {
    await page.goto('http://localhost:9876');
    const styles = await page.locator('#app-meta').evaluate(element => getComputedStyle(element));
    expect(styles.justifyContent).toBe('space-between');
    expect(styles.alignItems).toBe('center');
});

test('safe less works', async ({page}) => {
    await page.goto('http://localhost:9876');
    const styles = await page.locator('#create > input').evaluate(element => getComputedStyle(element));
    expect(styles.height).toBe('64px');
    expect(styles.fontSize).toBe('24px');
});
