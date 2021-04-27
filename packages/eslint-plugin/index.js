/* eslint-disable global-require */
module.exports = {
    processors: {
        '.d.ts': {
            preprocess() {
                return [];
            },
            supportsAutofix: false,
        },
    },
    rules: {
        'import-order': require('./rules/import-order'),
        'no-excessive-hook': require('./rules/no-excessive-hook'),
        'hooks-deps-break-line': require('./rules/hooks-deps-break-line'),
    },
};
