import {UserConfig} from 'vite';
import {ViteBuildEntry} from './shared.js';

type NotOptinal<T> = Exclude<T, undefined>;

export interface FinalizableViteConfiguration extends UserConfig {
    define: NotOptinal<UserConfig['define']>;
    plugins: NotOptinal<UserConfig['plugins']>;
    resolve: UserConfig['resolve'] & {alias: Record<string, string>};
    css: NotOptinal<UserConfig['css']>;
    server: NotOptinal<UserConfig['server']>;
    build: NotOptinal<UserConfig['build']>;
}

export type ViteFinalize = (
    config: FinalizableViteConfiguration,
    buildEntry: ViteBuildEntry,
) => FinalizableViteConfiguration | Promise<FinalizableViteConfiguration>;
