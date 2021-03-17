module.exports = {
    testMatch: ['**/__tests__/**/*.test.js'],
    testEnvironment: 'node',
    transformIgnorePatterns: [
        '\\/dist\\/',
        'node_modules',
    ],
};
