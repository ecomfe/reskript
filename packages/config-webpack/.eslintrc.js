module.exports = {
    extends: '../config-lint/config/eslint.js',
    rules: {
        'no-console': 'off',
    },
    env: {
        jest: true,
    },
    ignorePatterns: [
        '**/__tests__/output/*',
    ],
};
