const path = require('path');
const fs = require('fs');
const rule = require('../index');
const {RuleTester} = require('eslint');

const code = file => {
    const filePath = path.join(__dirname, 'fixtures', `${file}.js`);
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    }
    return null;
};

const testCase = (file, errors = []) => {
    return {
        code: code(file),
        errors: errors.map(message => ({message})),
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
        },
        settings: {
            localPackageNames: [
                '@i/*',
            ],
        },
        output: code(`${file}.output`),
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
            testCase('node-invalid', ['Import of node:fs should be placed before path']),
            testCase('local-package', ['Import of lodash should be placed before @i/util']),
            testCase('native-children-invalid', ['Import of fs/promises should be placed before lodash']),
        ],
    }
);
