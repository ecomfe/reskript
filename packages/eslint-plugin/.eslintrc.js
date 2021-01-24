module.exports = {
    extends: '../config-lint/config/eslint.js',
    ignorePatterns: '**/__tests__/fixtures/*.js',
    rules: {
        'no-console': 'off',
    },
    env: {
        jest: true,
    },
};
