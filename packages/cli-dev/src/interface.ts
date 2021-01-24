import {WorkModeAware} from '@reskript/core';

export interface DevCommandLineArgs extends WorkModeAware {
    readonly src: string;
    readonly buildTarget: string;
    readonly proxyDomain?: string;
    readonly open: 'remote' | 'local';
}
