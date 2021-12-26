const path = require('path');
// const {default: ExtraScriptPlugin} = require('@reskript/webpack-plugin-extra-script');
const {default: qiankun} = require('@reskript/plugin-qiankun');

const EXTERNAL_NONE = 'https://code.bdstatic.com/npm/none@1.0.0/dist/none.min.js';

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
    appTitle: 'TodoMVC - reSKRipt',
    favicon: path.join(__dirname, 'favicon.ico'),
    uses: ['antd', 'styled-components', 'tailwind'],
    script: {
        polyfill: false,
    },
    finalize: webpackConfig => {
        // webpackConfig.plugins.push(new ExtraScriptPlugin({async: true, src: EXTERNAL_NONE}, {prepend: true}));
        webpackConfig.optimization.splitChunks = {
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    enforce: true,
                    test: /node_modules/,
                },
            },
        };
        return webpackConfig;
    },
    inspect: {
        duplicatePackages: ['warn', {excludes: ['tslib', 'immer', 'color-name', 'is-lite', 'tree-changes']}],
        htmlImportable: 'error',
    },
};

exports.devServer = {
    port: 8989,
    https: {
        client: true,
        serverOptions: {
            key: './localhost-key.pem',
            cert: './localhost.pem',
        },
    },
};

exports.plugins = [
    qiankun('TodoMVC'),
];
