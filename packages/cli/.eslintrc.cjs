require('../config-lint/dist/patch');

module.exports = {
    extends: '../config-lint/config/eslint.js',
    rules: {
        'new-cap': 'off',
    },
};
