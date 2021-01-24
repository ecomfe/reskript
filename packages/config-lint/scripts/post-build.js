const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const {getScriptLintConfig} = require('../dist');

const dumpAsModule = (json, destination) => {
    const body = JSON.stringify(json, null, '  ').replace(/"%(.+)%"/g, '$1');
    const moduleCode = `module.exports = ${body}`;
    const prettyOptions = {
        parser: 'babel',
        tabWidth: 4,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: false,
    };
    fs.writeFileSync(
        destination,
        // 不要问为啥自动生成的代码还要格式化，问就是强迫症。
        prettier.format(moduleCode, prettyOptions),
        'utf-8'
    );
};

const config = getScriptLintConfig();
config.extends = config.extends.map(v => `%require.resolve('${v.replace(/^.+node_modules\//, '')}')%`);
config.parserOptions.babelOptions = '%require(\'@reskript/config-babel\').getParseOnlyBabelConfig(),%';

const destination = path.join(__dirname, '..', 'config');
fs.mkdirSync(destination, {recursive: true});
dumpAsModule(config, path.join(destination, 'eslint.js'));
