import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    testMatch: 'e2e/*',
    use: {
        ignoreHTTPSErrors: true,
    },
};

export default config;
