import path from 'node:path';
import {fileURLToPath} from 'node:url';
import injectHtml, {InjectHtmlOptions} from '@reskript/plugin-inject-html';
import {configure} from '@reskript/settings';

const injectOptions: InjectHtmlOptions = {
    headStart: [
        {
            tag: 'script',
            attributes: {
                async: true,
                src: 'https://code.bdstatic.com/npm/none@1.0.0/dist/none.min.js',
            },
        },
    ],
};

export default configure(
    'vite',
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
            uses: ['antd', 'emotion', 'tailwind'],
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
        },
        devServer: {
            port: 8989,
            https: {
                client: true,
                serverOptions: {
                    key: path.resolve('./localhost-key.pem'),
                    cert: path.resolve('./localhost.pem'),
                },
            },
        },
        plugins: [
            injectHtml(injectOptions),
        ],
    }
);
