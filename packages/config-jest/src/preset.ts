import {merge} from 'lodash';
import {sync as resolve} from 'resolve';
import unixify from 'unixify';
import {JestConfigOptions} from './interface';

const STATIC_EXTENSIONS = [
    'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp',
    'eot', 'otf', 'ttf', 'woff', 'woff2',
    'mp4', 'webm', 'wav', 'mp3', 'm4a', 'aac', 'oga',
];

const reactJestConfig = (configBasePath: string) => {
    return {
        testEnvironment: 'jsdom',
        setupFiles: [`${unixify(configBasePath)}/setUp`],
        snapshotSerializers: [
            resolve('enzyme-to-json/serializer'),
        ],
        // 默认会忽略`node_modules`，所以这里要设置
        transformIgnorePatterns: [],
    };
};

const nodeJestConfig = {
    testEnvironment: 'node',
};

export const getJestPresetConfig = (target: 'react' | 'node', configBasePath: string, options?: JestConfigOptions) => {
    const baseConfig = {
        moduleNameMapper: {
            '\\.(css|less)$': resolve('identity-obj-proxy'),
            [`\\.(${STATIC_EXTENSIONS.join('|')})$`]: `${unixify(configBasePath)}/mock`,
            '@/(.*)$': '<rootDir>/src/$1',
        },
        globals: {
            $build: {
                mode: 'production',
            },
            // 如果自己有`jest.config.js`，需要自己写`global.$features`才行
            $features: options?.features ?? {},
        },
        moduleDirectories: ['src', 'node_modules'],
        moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx', 'd.ts'],
        transform: {
            'node_modules/.+\\.(js|jsx|ts|tsx)$': `${unixify(configBasePath)}/thirdPartyTransformer`,
            '^.+\\.(js|jsx|ts|tsx)$': `${unixify(configBasePath)}/transformer`,
            '^.+\\.(md|mdx|txt|tpl)$': resolve('jest-raw-loader'),
        },
        coverageReporters: ['json-summary', 'lcov', 'text', 'clover'],
        testMatch: ['**/__tests__/**/*.test.{js,jsx,ts,tsx}'],
        collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
        coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
    };
    const targetConfig = target === 'react' ? reactJestConfig(configBasePath) : nodeJestConfig;
    return merge(baseConfig, targetConfig);
};
