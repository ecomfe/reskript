const rule = require('../index');
const RuleTester = require('eslint').RuleTester;

const ERROR_MESSAGE = [{messageId: 'hooksDepsNewLine'}];
const testCase = (code, output) => {
    return {
        code,
        output,
        errors: output ? ERROR_MESSAGE : [],
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
        },
    };
};

const ruleTester = new RuleTester();
ruleTester.run('deps-break-line', rule, {
    valid: [
        testCase('useMemo(\n()=>{},\n[deps]\n)'),
        testCase('useDemo(()=>{}, argument2)'),
        testCase('f(()=>{},[2])'),
        testCase('const value = useMemo(\n()=>{},\n[deps]\n)'),
        testCase('const value = useDemo(()=>{}, argument2)'),
        testCase('const value = f(()=>{},[2])'),
    ],
    invalid: [
        testCase(
            'useMemo(()=>{},[argument2]);',
            'useMemo(\n()=>{},\n[argument2]\n);'
        ),
        testCase(
            'useMemo(()=>{\n},[argument2]);',
            'useMemo(\n()=>{\n},\n[argument2]\n);'
        ),
        testCase(
            'useMemo(()=>{},[\nargument2\n]);',
            'useMemo(\n()=>{},\n[\nargument2\n]\n);'
        ),
        testCase(
            'useMemo(\n()=>{\n},[\nargument2\n]);',
            'useMemo(\n()=>{\n},\n[\nargument2\n]\n);'
        ),
        testCase(
            'const value = useMemo(()=>{},[argument2]);',
            'const value = useMemo(\n()=>{},\n[argument2]\n);'
        ),
        testCase(
            'const value = useMemo(()=>{\n},[argument2]);',
            'const value = useMemo(\n()=>{\n},\n[argument2]\n);'
        ),
        testCase(
            'const value = useMemo(()=>{},[\nargument2\n]);',
            'const value = useMemo(\n()=>{},\n[\nargument2\n]\n);'
        ),
        testCase(
            'const value = useMemo(\n()=>{\n},[\nargument2\n]);',
            'const value = useMemo(\n()=>{\n},\n[\nargument2\n]\n);'
        ),
    ],
});
