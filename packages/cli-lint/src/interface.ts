import {GitStatusResult} from '@reskript/core';
import {LintCommandLineArgs} from '@reskript/settings';

export interface ResolveOptions extends LintCommandLineArgs {
    gitStatus: GitStatusResult;
    gitRoot: string;
}
