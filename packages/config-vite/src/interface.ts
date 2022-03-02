import {UserConfig} from 'vite';
import {BuildContext as BuildContextGeneric} from '@reskript/build-utils';
import {ViteProjectSettings} from '@reskript/settings';

export type BuildContext = BuildContextGeneric<unknown, ViteProjectSettings>;

export interface ViteOptions {
    clean: boolean;
    sourceMaps: boolean;
    publicPath: string;
    port?: number;
    cacheDirectory?: string;
    proxyDomain?: string;
    defaultEntry?: string;
}

export type ConfigFactory = (context: BuildContext, options: ViteOptions) => Promise<UserConfig>;
