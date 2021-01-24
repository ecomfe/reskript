module.exports = {
    extends: '../config-lint/config/eslint.js',
    ignorePatterns: [
        '**/fixtures/**',
    ],
    env: {
        jest: true,
    },
};
