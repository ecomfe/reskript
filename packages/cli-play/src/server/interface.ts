import {Configuration} from 'webpack-dev-server';

export type ExpressApp = Parameters<Exclude<Configuration['onBeforeSetupMiddleware'], undefined>>[0]['app'];
