require('../config-lint/config/patch.cjs');

module.exports = {
    extends: '../config-lint/config/eslint.cjs',
    rules: {
        'new-cap': 'off',
    },
};
