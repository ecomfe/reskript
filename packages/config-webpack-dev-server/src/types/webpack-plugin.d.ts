declare module '@soda/friendly-errors-webpack-plugin' {
    import {WebpackPluginFunction} from 'webpack';

    export default class FriendlyErrorsWebpackPlugin extends WebpackPluginFunction {
        constructor(options: any);
    }
}
