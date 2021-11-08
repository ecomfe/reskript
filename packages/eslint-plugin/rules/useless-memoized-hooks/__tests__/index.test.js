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
ruleTester.run('useless-memoized-hooks', rule, {
    valid: [
        testCase('has-arguments-valid'),
        testCase('more-than-one-valid'),
        testCase('dep-more-valid'),
    ],
    invalid: [
        testCase(
            'only-depend-on-callee-invalid',
            ['uselessMemoizedHooks']
        ),
    ],
});
