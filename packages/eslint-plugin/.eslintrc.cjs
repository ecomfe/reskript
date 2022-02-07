require('../config-lint/config/patch.cjs');

module.exports = {
    extends: '../config-lint/config/eslint.cjs',
    ignorePatterns: [
        '**/__tests__/fixtures/*.js',
    ],
};
