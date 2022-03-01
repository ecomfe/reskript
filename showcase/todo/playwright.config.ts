import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    workers: 1,
    testMatch: 'e2e/*.test.ts',
};

export default config;
