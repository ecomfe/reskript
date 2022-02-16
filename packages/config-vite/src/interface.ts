import {UserConfig} from 'vite';
import {BuildContext as BuildContextGeneric} from '@reskript/build-utils';
import {HostType} from '@reskript/settings';

export type BuildContext = BuildContextGeneric<unknown>;

export interface ViteOptions {
    clean: boolean;
    sourceMaps: boolean;
    port?: number;
    host?: HostType;
    cacheDirectory?: string;
    proxyDomain?: string;
}

export type ConfigFactory = (context: BuildContext, options: ViteOptions) => Promise<UserConfig>;
