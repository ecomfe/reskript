import {WorkModeAware} from '@reskript/core';

export interface LegacyDevCommandLineArgs extends WorkModeAware {
    readonly src?: string;
    readonly srcDir: string;
    readonly entriesDir: string;
    readonly buildTarget: string;
    readonly proxyDomain?: string;
    readonly open: 'remote' | 'local';
    readonly entry: string;
}

export type DevCommandLineArgs = Omit<LegacyDevCommandLineArgs, 'src'>;
