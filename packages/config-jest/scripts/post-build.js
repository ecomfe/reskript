const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const {getJestPresetConfig} = require('../dist');

const dumpAsModule = (json, destination) => {
    // 有几个东西是用了`resolve('xxx')`变成了绝对路径，在这里要换回来再替换成`require.resolve`
    const modified = {
        ...json,
        snapshotSerializers: [
            '%REQUIRE(\'enzyme-to-json/serializer\')%',
        ],
        moduleNameMapper: {
            ...json.moduleNameMapper,
            '\\.(css|less)$': '%REQUIRE(\'identity-obj-proxy\')%',
            '\\$internal/core-js/(.*)$': '%REQUIRE_PATH(\'core-js\')%/$1',
        },
    };
    const jsonText = JSON.stringify(modified, null, '  ');
    const body = jsonText
        .replace(/"%REQUIRE\((.*)\)%"/g, 'require.resolve($1)')
        .replace(/"%REQUIRE_PATH\((.*)\)%(.+)"/g, 'require.resolve($1).replace(/\\/[\\w.]+$/, \'\') + \'$2\'')
        .replace(/"%RESKRIPT_NODE_MODULE_JEST_PATH%\/(.*)"/g, 'require.resolve(\'../dist/$1\')');
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

const jestPresetConfig = target => getJestPresetConfig(target, '%RESKRIPT_NODE_MODULE_JEST_PATH%');
const destination = path.join(__dirname, '..', 'config');
fs.mkdirSync(destination, {recursive: true});
dumpAsModule(jestPresetConfig('react'), path.join(destination, 'jest-react.js'));
dumpAsModule(jestPresetConfig('node'), path.join(destination, 'jest-node.js'));
