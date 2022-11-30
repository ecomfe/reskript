import {test, expect} from '@playwright/test';
import run from './dev';

run({driver: 'webpack', config: 'reskript-e2e.config.ts', port: 8976});

test('qiankun works', async ({page}) => {
    await page.goto('http://127.0.0.1:8976');
    await expect(page.locator('div[data-name="TodoMVC"]')).toHaveId(/qiankun/);
});
