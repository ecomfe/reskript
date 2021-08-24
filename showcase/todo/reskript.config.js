const path = require('node:path');
const {default: qiankun} = require('@reskript/plugin-qiankun');

exports.featureMatrix = {
    stable: {
        batch: false,
    },
    insiders: {
        batch: true,
    },
    dev: {
        batch: true,
    },
};

exports.build = {
    reportLintErrors: false,
    appTitle: 'TodoMVC - reSKRipt',
    favicon: path.join(__dirname, 'favicon.ico'),
    uses: ['antd', 'styled-components', 'tailwind'],
    script: {
        polyfill: false,
    },
    inspect: {
        duplicatePackages: ['warn', {excludes: ['tslib', 'immer', 'color-name', 'is-lite', 'tree-changes']}],
    },
};

exports.devServer = {
    port: 8989,
};

exports.plugins = [
    qiankun('TodoMVC'),
];
