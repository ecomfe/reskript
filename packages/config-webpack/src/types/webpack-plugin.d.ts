declare module 'webpack-bundle-analyzer' {
    import {WebpackPluginFunction} from 'webpack';

    export class BundleAnalyzerPlugin extends WebpackPluginFunction {
        constructor(options: any);
    }
}

declare module 'friendly-errors-webpack-plugin' {
    import {WebpackPluginFunction} from 'webpack';

    export default class FriendlyErrorsWebpackPlugin extends WebpackPluginFunction {
        constructor(options: any);
    }
}

declare module 'case-sensitive-paths-webpack-plugin' {
    import {WebpackPluginFunction} from 'webpack';

    export default class CaseSensitivePathsPlugin extends WebpackPluginFunction {
    }
}

declare module 'monaco-editor-webpack-plugin' {
    import {WebpackPluginFunction} from 'webpack';

    export default class MonacoEditorWebpackPlugin extends WebpackPluginFunction {
        constructor(options: any);
    }
}

declare module '@pmmmwh/react-refresh-webpack-plugin' {
    import {WebpackPluginFunction} from 'webpack';

    export default class ReactRefreshWebpackPlugin extends WebpackPluginFunction {
        constructor(options: any);
    }
}
