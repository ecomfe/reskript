/* eslint-disable */
declare module 'webpack-bundle-analyzer' {
    import webpack = require('webpack');

    export class BundleAnalyzerPlugin extends webpack.Plugin {
        constructor(options: any);
    }
}

declare module 'unused-files-webpack-plugin' {
    import webpack = require('webpack');

    export class UnusedFilesWebpackPlugin extends webpack.Plugin {
        constructor(options: any);
    }
}

declare module 'friendly-errors-webpack-plugin' {
    import webpack = require('webpack');

    export default class FriendlyErrorsWebpackPlugin extends webpack.Plugin {
        constructor(options: any);
    }
}

declare module 'case-sensitive-paths-webpack-plugin' {
    import webpack = require('webpack');

    export default class CaseSensitivePathsPlugin extends webpack.Plugin {
    }
}

declare module 'monaco-editor-webpack-plugin' {
    import webpack = require('webpack');

    export default class MonacoEditorWebpackPlugin extends webpack.Plugin {
        constructor(options: any);
    }
}

declare module '@pmmmwh/react-refresh-webpack-plugin' {
    import webpack = require('webpack');

    export default class ReactRefreshWebpackPlugin extends webpack.Plugin {
        constructor(options: any);
    }
}
