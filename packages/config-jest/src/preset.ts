import path from 'path';
import {merge} from 'lodash';
import {sync as resolve} from 'resolve';
import unixify from 'unixify';
import {JestConfigOptions} from './interface';

const STATIC_EXTENSIONS = [
    'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp',
    'eot', 'otf', 'ttf', 'woff', 'woff2',
    'mp4', 'webm', 'wav', 'mp3', 'm4a', 'aac', 'oga',
];

const reactJestConfig = (configBasePath: string, jestConfigOptions?: JestConfigOptions) => {
    return {
        moduleNameMapper: {
            '\\.(css|less)$': resolve('identity-obj-proxy'),
            [`\\.(${STATIC_EXTENSIONS.join('|')})$`]: `${unixify(configBasePath)}/mock`,
            '@/(.*)$': '<rootDir>/src/$1',
            '\\$internal/core-js/(.*)$': path.dirname(resolve('core-js')) + '/$1',
        },
        testEnvironment: 'jsdom',
        setupFiles: [`${unixify(configBasePath)}/setUp`],
        snapshotSerializers: [
            resolve('enzyme-to-json/serializer'),
        ],
        globals: {
            $build: {
                mode: 'production',
            },
            // 如果自己有`jest.config.js`，需要自己写`global.$features`才行
            $features: jestConfigOptions && jestConfigOptions.features || {},
        },
        transformIgnorePatterns: [
            // `node_modules`下所有有`es`目录的包，认为发布的是ES代码，要过babel，下面的正则再看一下怎么优化
            'node_modules/[^/]+?/(?!(es|node_modules)/)',
        ],
    };
};

// configs for node projects
const nodeJestConfig = {
    testEnvironment: 'node',
};

export const getJestPresetConfig = (target: 'react' | 'node', configBasePath: string, options?: JestConfigOptions) => {
    const baseConfig = {
        moduleDirectories: ['src', 'node_modules'],
        moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx', 'd.ts'],
        moduleNameMapper: {
            '\\$internal/core-js/(.*)$': path.dirname(resolve('core-js')) + '/$1',
        },
        transform: {
            '^.+\\.(js|jsx|ts|tsx)$': `${unixify(configBasePath)}/transformer`,
            '^.+\\.(md|mdx|txt|tpl)$': resolve('jest-raw-loader'),
        },
        coverageReporters: ['json-summary', 'lcov', 'text', 'clover'],
        testMatch: ['**/__tests__/**/*.test.{js,jsx,ts,tsx}'],
        collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
        coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
    };
    const targetConfig = target === 'react' ? reactJestConfig(configBasePath, options) : nodeJestConfig;
    return merge(baseConfig, targetConfig);
};
