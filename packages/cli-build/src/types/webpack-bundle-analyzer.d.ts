declare module 'webpack-bundle-analyzer' {
    import webpack = require('webpack');

    export class BundleAnalyzerPlugin extends webpack.Plugin {
        constructor(options: any);
    }
}
