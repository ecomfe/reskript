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
        output: code(file + '.output'),
    };
};

const tester = new RuleTester();
tester.run(
    'spell-check',
    rule,
    {
        valid: [
            testCase('valid'),
        ],
        invalid: [
            testCase(
                'single-invalid',
                [
                    '\'auther\' may be a typo for \'author\'',
                    '\'_nmae\' may be a typo for \'_name\'',
                    '\'articel$\' may be a typo for \'article$\'',
                    '\'MODLE\' may be a typo for \'MODEL\'',
                ]
            ),
            testCase(
                'capital-invalid',
                [
                    '\'getAutherNmae\' may be a typo for \'getAuthorName\'',
                    '\'DoccumentRequest\' may be a typo for \'DocumentRequest\'',
                    '\'__Doccument__\' may be a typo for \'__Document__\'',
                ]
            ),
            testCase(
                'lowercase-invalid',
                [
                    '\'user_nmae\' may be a typo for \'user_name\'',
                    '\'_auther\' may be a typo for \'_author\'',
                    '\'originallData\' may be a typo for \'originalData\'',
                    '\'originallDATA\' may be a typo for \'originalDATA\'',
                ]
            ),
            testCase(
                'uppercase-invalid',
                [
                    '\'USER_NMAE\' may be a typo for \'USER_NAME\'',
                    '\'__DOCCUMENT__\' may be a typo for \'__DOCUMENT__\'',
                    '\'getDOCCUMENTEntity\' may be a typo for \'getDOCUMENTEntity\'',
                ]
            ),
            testCase(
                'properties-invalid',
                [
                    '\'nmae\' may be a typo for \'name\'',
                    '\'getNmae\' may be a typo for \'getName\'',
                ]
            ),
            testCase(
                'declared-invalid',
                [
                    '\'nmae\' may be a typo for \'name\'',
                    '\'auther\' may be a typo for \'author\'',
                    '\'getAuther\' may be a typo for \'getAuthor\'',
                    '\'auther\' may be a typo for \'author\'',
                ]
            ),
        ],
    }
);
