module.exports = {
    extends: '../config-lint/config/eslint.js',
    ignorePatterns: [
        '**/output/**',
    ],
    env: {
        jest: true,
    },
    rules: {
        'no-console': 'off',
    },
};
