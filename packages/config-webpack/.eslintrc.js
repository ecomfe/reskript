require('../config-lint/dist/patch');

module.exports = {
    extends: '../config-lint/config/eslint.js',
    env: {
        jest: true,
    },
    ignorePatterns: [
        '**/__tests__/output/*',
    ],
};
