const path = require('path');
const fs = require('fs');
const rule = require('../index');
const RuleTester = require('eslint').RuleTester;

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
