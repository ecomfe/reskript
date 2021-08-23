const path = require('node:path');

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
    appContainerId: 'app',
    favicon: path.join(__dirname, 'favicon.ico'),
    uses: ['antd', 'styled-components'],
    inspect: {
        duplicatePackages: ['warn', {excludes: ['tslib', 'immer', 'color-name', 'is-lite', 'tree-changes']}],
    },
};

exports.devServer = {
    port: 8989,
};
