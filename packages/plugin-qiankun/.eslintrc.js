module.exports = {
    extends: '../config-lint/config/eslint.js',
    env: {
        jest: true,
    },
    rules: {
        'no-console': 'off',
    },
};
