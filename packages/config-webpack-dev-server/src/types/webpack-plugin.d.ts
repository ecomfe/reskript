/* eslint-disable */
declare module 'friendly-errors-webpack-plugin' {
    import webpack = require('webpack');

    export default class FriendlyErrorsWebpackPlugin extends webpack.Plugin {
        constructor(options: any);
    }
}
