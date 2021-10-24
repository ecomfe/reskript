module.exports = {
    preset: 'ts-jest/presets/default',
    testMatch: ['**/__tests__/**/*.test.ts'],
    testEnvironment: 'node',
    transformIgnorePatterns: [
        '\\/dist\\/',
        'node_modules',
    ],
};
