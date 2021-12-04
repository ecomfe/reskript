// https://reskript.vercel.app/docs/settings/feature-matrix
exports.featureMatrix = {
    stable: {},
    dev: {},
};

// https://reskript.vercel.app/docs/settings/build
exports.build = {
    appTitle: '{{appTitle}}',
};

// https://reskript.vercel.app/docs/settings/dev-server
exports.devServer = {
    port: {{devServerPort}},
    // TODO: 修改后端API代理的配置
    apiPrefixes: ['/api'],
    defaultProxyDomain: 'example.com',
};
