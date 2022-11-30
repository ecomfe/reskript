import childProcess, {ChildProcess} from 'node:child_process';
import {test, expect, Page} from '@playwright/test';

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
            ['play', `--port=${port}`, `--config=${config}`, 'src/components/Create/index.tsx'],
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

    const waitElementVisible = async (page: Page, start?: number) => {
        const startTime = start ?? Date.now();

        try {
            await page.waitForSelector('#create', {timeout: 1000});
        }
        catch {
            if (Date.now() - startTime > 3000) {
                throw new Error('Wait for element visible timeout');
            }

            await page.reload();
            await waitElementVisible(page, startTime);
        }
    };

    test(`[${driver}] has component render`, async ({page}) => {
        await page.goto(`http://127.0.0.1:${port}`);
        await waitElementVisible(page);
        await expect(page.locator('#create > input')).toHaveAttribute('placeholder', 'What needs to be done?');
    });

    test(`[${driver}] play config works`, async ({page}) => {
        await page.goto(`http://127.0.0.1:${port}`);
        await waitElementVisible(page);
        const value = await page.locator('#create').evaluate(element => element.parentElement?.style.cssText);
        expect(value).toBe('padding: 20px;');
    });

    test(`[${driver}] play api works`, async ({request}) => {
        const response = await request.get(`http://127.0.0.1:${port}/__skr__/play/ok`);
        const text = await response.text();
        expect(text).toBe('OK');
    });
};
