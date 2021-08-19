import {WorkMode} from '@reskript/core';
import {ThirdPartyUse} from '@reskript/settings';

export interface BabelConfigOptions {
    readonly uses?: ThirdPartyUse[];
    readonly mode?: WorkMode;
    readonly hot?: 'none' | 'simple' | 'all';
    readonly hostType?: 'application' | 'library';
    readonly polyfill?: boolean;
    readonly modules?: false | 'commonjs';
    // DEPRECATED: 2.0废弃
    readonly defaultImportOptimization?: boolean;
    readonly displayName?: boolean | 'auto';
    readonly cwd?: string;
    readonly srcDirectory?: string;
}

export type BabelConfigOptionsFilled = Required<BabelConfigOptions>;
