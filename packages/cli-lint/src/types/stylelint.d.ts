declare module 'stylelint' {
    interface LintMessage {
        line: number;
        column: number;
        rule: string;
        severity: string;
        text: string;
    }

    interface LintResult {
        source: string;
        warnings: LintMessage[];
        parseErrors: LintMessage[];
    }

    interface LintReport {
        results: LintResult[];
    }

    export function lint(config: Record<string, any>): Promise<LintReport>;
}
