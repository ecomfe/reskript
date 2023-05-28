declare module 'case-sensitive-paths-webpack-plugin' {
    import {WebpackPluginInstance} from 'webpack';

    type WebpackPlugin = new () => WebpackPluginInstance;
    const CaseSensitivePathsPlugin: WebpackPlugin;
    export default CaseSensitivePathsPlugin;
}
