// https://ecomfe.github.io/reskript/docs/settings/feature-matrix
exports.featureMatrix = {
    stable: {},
    dev: {},
};

// https://ecomfe.github.io/reskript/docs/settings/build
exports.build = {
    appTitle: '{{appTitle}}',
};

// https://ecomfe.github.io/reskript/docs/settings/dev-server
exports.devServer = {
    port: {{devServerPort}},
    // TODO: 修改后端API代理的配置
    apiPrefixes: ['/api'],
    defaultProxyDomain: 'example.com',
};
