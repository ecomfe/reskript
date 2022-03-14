import {configure} from '@reskript/settings';

export default configure(
    '{{driver}}',
    {
        // https://reskript.dev/docs/settings/feature-matrix
        featureMatrix: {
            stable: {},
            dev: {},
        },
        // https://reskript.dev/docs/settings/build
        build: {
            appTitle: '{{appTitle}}',
        },
        // https://reskript.dev/docs/settings/dev-server
        devServer: {
            port: {{devServerPort}},
            // TODO: 修改后端API代理的配置
            apiPrefixes: ['/api'],
            defaultProxyDomain: 'example.com',
        },
    }
)
