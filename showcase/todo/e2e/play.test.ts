import childProcess, {ChildProcess} from 'node:child_process';
import {test, expect} from '@playwright/test';

const devServer: {current: ChildProcess | null} = {current: null};

test.beforeAll(async () => {
    const process = childProcess.spawn('npm', ['run', 'play'], {stdio: 'pipe'});
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

test('has component render', async ({page}) => {
    await page.goto('http://localhost:9875');
    await expect(page.locator('#create > input')).toHaveAttribute('placeholder', 'What needs to be done?');
});

test('play config works', async ({page}) => {
    await page.goto('http://localhost:9875');
    const value = await page.locator('#create').evaluate(element => element.parentElement?.style.cssText);
    expect(value).toBe('padding: 20px;');
});
