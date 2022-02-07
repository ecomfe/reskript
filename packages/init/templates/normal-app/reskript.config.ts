import {configure} from '@reskript/settings';

export default configure(
    'webpack',
    {
        // https://reskript.vercel.app/docs/settings/feature-matrix
        featureMatrix: {
            stable: {},
            dev: {},
        },
        // https://reskript.vercel.app/docs/settings/build
        build: {
            appTitle: '{{appTitle}}',
        },
        // https://reskript.vercel.app/docs/settings/dev-server
        devServer: {
            port: {{devServerPort}},
            // TODO: 修改后端API代理的配置
            apiPrefixes: ['/api'],
            defaultProxyDomain: 'example.com',
        },
    }
)
