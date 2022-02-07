import {WorkMode} from '@reskript/core';
import {ThirdPartyUse} from '@reskript/settings';

export interface BabelConfigOptions {
    readonly uses?: ThirdPartyUse[];
    readonly mode?: WorkMode;
    readonly hot?: boolean;
    readonly hostType?: 'application' | 'library';
    readonly polyfill?: boolean;
    readonly modules?: false | 'commonjs';
    readonly displayName?: boolean | 'auto';
    readonly cwd?: string;
    readonly srcDirectory?: string;
    readonly openInEditorPrefix?: string;
}

export type BabelConfigOptionsFilled = Required<BabelConfigOptions>;
