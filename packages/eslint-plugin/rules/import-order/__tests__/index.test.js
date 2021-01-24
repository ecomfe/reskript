const path = require('path');
const fs = require('fs');
const rule = require('../index');
const {RuleTester} = require('eslint');

const code = file => fs.readFileSync(path.join(__dirname, 'fixtures', `${file}.js`), 'utf-8');

const testCase = (file, errors = []) => {
    return {
        code: code(file),
        errors: errors.map(message => ({message})),
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
        },
    };
};

const tester = new RuleTester();
tester.run(
    'import-order',
    rule,
    {
        valid: [
            testCase('single-import'),
        ],
        invalid: [
            testCase('simple-invalid', ['Import of fs should be placed before @/foo']),
            testCase(
                'multiple-invalid',
                [
                    'Import of fs should be placed before lodash',
                    'Import of react should be placed before @/foo',
                ]
            ),
            testCase(
                'relative-invalid',
                [
                    'Import of ../../foo should be placed before ./utils',
                    'Import of ../bar should be placed before ./utils',
                ]
            ),
        ],
    }
);
