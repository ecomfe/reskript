require('../config-lint/config/patch.cjs');

module.exports = {
    extends: '../config-lint/config/eslint.cjs',
    ignorePatterns: [
        '**/output/**',
    ],
};
