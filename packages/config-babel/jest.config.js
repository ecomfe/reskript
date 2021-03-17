module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testMatch: ['**/src/**/__tests__/**/*.test.js'],
    transformIgnorePatterns: [
        '\\/dist\\/',
        'node_modules',
    ],
};
