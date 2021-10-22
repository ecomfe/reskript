import {GitStatusResult} from '@reskript/core';

export interface LintCommandLineArgs {
    readonly changed: boolean;
    readonly staged: boolean;
    readonly allowUnsafeReactMethod: boolean;
    readonly fix: boolean;
    readonly strict: boolean;
    readonly autoStage: boolean;
}

export interface ResolveOptions extends LintCommandLineArgs {
    gitStatus: GitStatusResult;
    gitRoot: string;
}
