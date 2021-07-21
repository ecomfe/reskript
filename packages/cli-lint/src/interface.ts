export interface LintCommandLineArgs {
    readonly changed: boolean;
    readonly staged: boolean;
    readonly allowUnsafeReactMethod: boolean;
    readonly fix: boolean;
    readonly strict: boolean;
}
