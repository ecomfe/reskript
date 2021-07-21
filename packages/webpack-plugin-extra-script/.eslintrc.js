require('../config-lint/dist/patch');

module.exports = {
    extends: '../config-lint/config/eslint.js',
    ignorePatterns: [
        '**/output/**',
    ],
    env: {
        jest: true,
    },
};
