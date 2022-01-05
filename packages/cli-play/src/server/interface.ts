import WebpackDevServer from 'webpack-dev-server';

export type ExpressApp = Exclude<WebpackDevServer['app'], undefined>;
