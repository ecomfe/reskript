import {WorkModeAware} from '@reskript/core';

export interface DevCommandLineArgs extends WorkModeAware {
    readonly srcDir: string;
    readonly entriesDir: string;
    readonly buildTarget: string;
    readonly proxyDomain?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly host?: 'localhost' | 'loopback' | 'ip' | {} & string;
    readonly entry: string;
}
