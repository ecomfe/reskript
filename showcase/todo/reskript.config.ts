import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {configure} from '@reskript/settings';
import ExtraScriptPlugin from '@reskript/webpack-plugin-extra-script';
import qiankun from '@reskript/plugin-qiankun';

const EXTERNAL_NONE = 'https://code.bdstatic.com/npm/none@1.0.0/dist/none.min.js';

export default configure(
    'webpack',
    {
        featureMatrix: {
            stable: {
                batch: false,
            },
            insiders: {
                batch: true,
            },
            dev: {
                batch: true,
            },
        },
        build: {
            appTitle: 'TodoMVC - reSKRipt',
            favicon: path.join(path.dirname(fileURLToPath(import.meta.url)), 'favicon.ico'),
            appContainerId: 'root',
            uses: ['antd', 'styled-components', 'tailwind'],
            script: {
                polyfill: false,
            },
            style: {
                resources: [
                    path.join(path.dirname(fileURLToPath(import.meta.url)), 'src', 'styles', 'inject.less'),
                ],
                lessVariables: {
                    '@app-primary-color': '#1890ff',
                    '@app-primary-color-active': '#40a9ff',
                    '@app-primary-color-hover': '#096dd9',
                },
            },
            finalize: webpackConfig => {
                webpackConfig.plugins.push(new ExtraScriptPlugin({async: true, src: EXTERNAL_NONE}, {prepend: true}));
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
        },
        devServer: {
            port: 8989,
            https: {
                client: true,
                serverOptions: {
                    key: './localhost-key.pem',
                    cert: './localhost.pem',
                },
            },
        },
        plugins: commandName => [
            commandName !== 'play' && qiankun('TodoMVC'),
        ],
    }
);
