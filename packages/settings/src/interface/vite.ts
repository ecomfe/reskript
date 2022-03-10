import {UserConfig} from 'vite';
import {ViteBuildEntry} from './shared.js';

type NotOptional<T> = Exclude<T, undefined>;

type Build = NotOptional<UserConfig['build']>;

interface FinalizableBuild extends Build {
    rollupOptions: NotOptional<Build['rollupOptions']>;
}

export interface FinalizableViteConfiguration extends UserConfig {
    define: NotOptional<UserConfig['define']>;
    plugins: NotOptional<UserConfig['plugins']>;
    resolve: UserConfig['resolve'] & {alias: Record<string, string>};
    css: NotOptional<UserConfig['css']>;
    server: NotOptional<UserConfig['server']>;
    build: FinalizableBuild;
    optimizeDeps: NotOptional<UserConfig['optimizeDeps']>;
}

export type ViteFinalize = (
    config: FinalizableViteConfiguration,
    buildEntry: ViteBuildEntry,
) => FinalizableViteConfiguration | Promise<FinalizableViteConfiguration>;
