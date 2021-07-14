import {Configuration} from 'webpack-dev-server';

export type ExpressApp = Parameters<Exclude<Configuration['before'], undefined>>[0];
