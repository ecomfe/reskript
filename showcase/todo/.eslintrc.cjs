require('@reskript/config-lint/patch');

module.exports = {
    extends: require.resolve('@reskript/config-lint/config/eslint'),
    rules: {
        'no-sparse-arrays': 'off',
    },
};
