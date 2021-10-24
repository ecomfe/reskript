require('../config-lint/dist/patch');

module.exports = {
    extends: '../config-lint/config/eslint.js',
    ignorePatterns: [
        '**/__tests__/output/*',
    ],
};
