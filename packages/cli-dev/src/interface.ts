import {WorkModeAware} from '@reskript/core';

export interface DevCommandLineArgs extends WorkModeAware {
    readonly srcDirectory: string;
    readonly entriesDirectory: string;
    readonly buildTarget: string;
    readonly proxyDomain?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly host?: 'localhost' | 'loopback' | 'ip' | {} & string;
    readonly entry: string;
}
