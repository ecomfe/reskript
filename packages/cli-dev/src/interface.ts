import {WorkModeAware} from '@reskript/core';

export interface LegacyDevCommandLineArgs extends WorkModeAware {
    readonly src?: string;
    readonly srcDir: string;
    readonly entriesDir: string;
    readonly buildTarget: string;
    readonly proxyDomain?: string;
    readonly open?: 'remote' | 'local';
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly host?: 'localhost' | 'loopback' | 'ip' | {} & string;
    readonly entry: string;
}

export type DevCommandLineArgs = Omit<LegacyDevCommandLineArgs, 'src' | 'open'>;
