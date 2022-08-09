import {Configuration, RuleSetRule, RuleSetUseItem} from 'webpack';
import {WebpackBuildEntry} from './shared.js';

type NotOptinal<T> = Exclude<T, undefined>;

type Module = NotOptinal<Configuration['module']>;

type Resolve = NotOptinal<Configuration['resolve']>;

interface FinalizableModule extends Module {
    rules: NotOptinal<Module['rules']>;
}

interface FinalizableResolve extends Resolve {
    alias: Record<string, string | false | string[]>;
}

export interface FinalizableWebpackConfiguration extends Configuration {
    module: FinalizableModule;
    resolve: FinalizableResolve;
    output: NotOptinal<Configuration['output']>;
    plugins: NotOptinal<Configuration['plugins']>;
    optimization: NotOptinal<Configuration['optimization']>;
}

export type RuleFactory = (buildEntry: WebpackBuildEntry) => Promise<RuleSetRule>;

export type LoaderFactory = (buildEntry: WebpackBuildEntry) => Promise<RuleSetUseItem | null>;

export interface InternalRules {
    readonly url: RuleFactory;
    readonly raw: RuleFactory;
    readonly script: RuleFactory;
    readonly less: RuleFactory;
    readonly css: RuleFactory;
    readonly image: RuleFactory;
    readonly svg: RuleFactory;
    readonly file: RuleFactory;
}

export type LoaderType =
    | 'babel'
    | 'style'
    | 'css'
    | 'cssModules'
    | 'postcss'
    | 'less'
    | 'img'
    | 'worker'
    | 'classNames'
    | 'cssExtract'
    | 'svgo'
    | 'svgToComponent';

export interface BuildInternals {
    readonly rules: InternalRules;
    readonly loader: (name: LoaderType, buildEntry: WebpackBuildEntry) => Promise<RuleSetUseItem | null>;
    readonly loaders: (names: Array<LoaderType | false>, buildEntry: WebpackBuildEntry) => Promise<RuleSetUseItem[]>;
}

export type WebpackFinalize = (
    webpackConfig: FinalizableWebpackConfiguration,
    buildEntry: WebpackBuildEntry,
    internals: BuildInternals
) => FinalizableWebpackConfiguration | Promise<FinalizableWebpackConfiguration>;
