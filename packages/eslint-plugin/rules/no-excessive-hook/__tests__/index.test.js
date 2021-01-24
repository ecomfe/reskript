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
    'no-excessive-hook',
    rule,
    {
        valid: [
            testCase('valid'),
            testCase('non-hook'),
        ],
        invalid: [
            testCase('no-hook-call', ['Hook useFoo never call other hooks, it should be a plain function']),
            testCase('inside-block', ['Hook useFoo never call other hooks, it should be a plain function']),
        ],
    }
);
