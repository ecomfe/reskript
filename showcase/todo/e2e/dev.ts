import childProcess, {ChildProcess} from 'node:child_process';
import {test, expect} from '@playwright/test';

interface Options {
    driver: string;
    config: string;
    port: number;
}

export default ({driver, config, port}: Options) => {
    const devServer: {current: ChildProcess | null} = {current: null};

    test.beforeAll(async () => {
        const process = childProcess.spawn(
            'skr',
            ['dev', '--no-open', `--config=${config}`],
            {stdio: 'pipe'}
        );
        const executor = (resolve: (value: void) => void, reject: (error: Error) => void) => {
            let output = '';
            process.stdout.on(
                'data',
                data => {
                    output += data.toString();
                    if (output.includes('Your application is running')) {
                        resolve();
                    }
                    else if (output.includes('ERROR')) {
                        reject(new Error('server failed to start'));
                    }
                }
            );
        };
        devServer.current = process;
        await new Promise(executor);
    });

    test.afterAll(() => {
        devServer.current?.kill();
    });

    test(`[${driver}] has footer`, async ({page}) => {
        await page.goto(`http://localhost:${port}`);
        await expect(page.locator('#app-footer')).toHaveText('TodoMVC by reSKRipt');
    });

    test(`[${driver}] less variable works`, async ({page}) => {
        await page.goto(`http://localhost:${port}`);
        const styles = await page.locator('#batch').evaluate(element => getComputedStyle(element));
        expect(styles.color).toBe('rgb(24, 144, 255)');
    });

    test(`[${driver}] emotion component selector works`, async ({page}) => {
        await page.goto(`http://localhost:${port}`);
        const styles = await page.locator('h1').evaluate(element => getComputedStyle(element));
        expect(styles.color).toBe('rgba(175, 47, 47, 0.15)');
    });

    test(`[${driver}] postcss works`, async ({page}) => {
        await page.goto(`http://localhost:${port}`);
        const styles = await page.locator('#app').evaluate(element => Object.values(getComputedStyle(element)));
        expect(styles).toContain('top');
        expect(styles).toContain('right');
        expect(styles).toContain('bottom');
        expect(styles).toContain('right');
        expect(styles).not.toContain('inset');
    });

    test(`[${driver}] tailwind works`, async ({page}) => {
        await page.goto(`http://localhost:${port}`);
        const styles = await page.locator('#app-meta').evaluate(element => getComputedStyle(element));
        expect(styles.justifyContent).toBe('space-between');
        expect(styles.alignItems).toBe('center');
    });

    test(`[${driver}] safe less works`, async ({page}) => {
        await page.goto(`http://localhost:${port}`);
        const styles = await page.locator('#create > input').evaluate(element => getComputedStyle(element));
        expect(styles.height).toBe('64px');
        expect(styles.fontSize).toBe('24px');
    });

    test(`[${driver}] worker`, async ({page}) => {
        await page.goto(`http://localhost:${port}`);
        const styles = await page.locator('#worker-status').evaluate(element => getComputedStyle(element));
        expect(styles.backgroundColor).toBe('rgb(40, 200, 64)');
    });

    test(`[${driver}] customize middleware works`, async ({request}) => {
        const response = await request.get(`http://localhost:${port}/ok`, {failOnStatusCode: true});
        const text = await response.text();
        expect(text).toBe('OK');
    });

    test(`[${driver}] portal works`, async ({request}) => {
        const response = await request.get(`http://localhost:${port}/__skr__/ok`, {failOnStatusCode: true});
        const text = await response.text();
        expect(text).toBe('OK');
    });

    test(`[${driver}] portal custom route works`, async ({request}) => {
        const response = await request.get(`http://localhost:${port}/__skr__/e2e`, {failOnStatusCode: true});
        const text = await response.text();
        expect(text).toBe('For Test');
    });
};
