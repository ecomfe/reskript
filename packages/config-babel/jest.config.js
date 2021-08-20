module.exports = {
    preset: 'ts-jest/presets/default',
    testMatch: ['**/src/**/__tests__/**/*.test.ts'],
    transformIgnorePatterns: [
        '\\/dist\\/',
        'node_modules',
    ],
};
