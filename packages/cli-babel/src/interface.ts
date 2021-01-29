import {WorkMode} from '@reskript/core';

export interface BabelCommandLineArgs {
    mode: WorkMode;
    noPolyfill: boolean;
    clean: boolean;
    out: string;
    copy: boolean;
}
