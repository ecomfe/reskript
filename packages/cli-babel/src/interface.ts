import {WorkMode} from '@reskript/core';

export interface BabelCommandLineArgs {
    mode: WorkMode;
    polyfill: boolean;
    clean: boolean;
    outDirectory?: string;
    copy: boolean;
}
