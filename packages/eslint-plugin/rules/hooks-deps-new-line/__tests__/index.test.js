const path = require('path');
const fs = require('fs');
const rule = require('../index');
const RuleTester = require('eslint').RuleTester;

const code = file => {
    try {
        return fs.readFileSync(path.join(__dirname, 'fixtures', `${file}.js`), 'utf-8');
    } catch (err) {
        return null;
    }
};

const testCase = (file, errors = []) => {
    return {
        code: code(file),
        errors: errors.map(messageId => ({messageId})),
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
        },
        output: code(file + '.output'),
    };
};

const ruleTester = new RuleTester();
ruleTester.run('deps-break-line', rule, {
    valid: [
        testCase('valid'),
    ],
    invalid: [
        testCase(
            'invalid',
            ['hookArgumentsBreakLine']
        ),
        testCase(
            'variable-invalid',
            ['hookArgumentsBreakLine']
        ),
    ],
});
