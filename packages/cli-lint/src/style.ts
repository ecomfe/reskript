import {lint, LintResult as StyleLintResult, Warning, WarningOptions} from 'stylelint';
import {isEmpty} from 'ramda';
import {ESLint, Linter} from 'eslint';
import {resolveCacheLocation} from '@reskript/core';
import {getStyleLintBaseConfig} from '@reskript/config-lint';
import {ResolveOptions} from './interface.js';
import {resolveLintFiles} from './utils.js';

type LintResult = ESLint.LintResult;
type LintMessage = Linter.LintMessage;

const isLintWarning = (value: Warning | WarningOptions): value is Warning => 'text' in value;

const adaptStyleErrorToScriptError = (warning: Warning | WarningOptions): LintMessage => {

    if (isLintWarning(warning)) {
        const {line, column, rule, severity, text} = warning;
        const severityInNumber = severity === 'error' ? 2 : 1;
        return {
            line,
            column,
            ruleId: rule,
            severity: severityInNumber,
            message: text,
            nodeType: '',
            source: null,
        };
    }

    return {
        line: warning.start?.line ?? 0,
        column: warning.start?.line ?? 0,
        ruleId: 'parse-error',
        severity: 2,
        message: warning.word ?? 'Parse error',
        nodeType: '',
        source: null,
    };
};

const adaptStyleResultToScriptResult = (result: StyleLintResult): LintResult => {
    const {source, warnings, parseErrors} = result;
    const errorCount = warnings.length + parseErrors.length;

    return {
        errorCount,
        filePath: source ?? '',
        messages: [...parseErrors, ...warnings].map(adaptStyleErrorToScriptError),
        warningCount: 0,
        fixableErrorCount: 0,
        fixableWarningCount: 0,
        fatalErrorCount: 0,
        usedDeprecatedRules: [],
    };
};

export default async (files: string[], cmd: ResolveOptions): Promise<LintResult[]> => {
    const lintingFiles = await resolveLintFiles('style', files, cmd);

    if (isEmpty(lintingFiles)) {
        return [];
    }

    const lintConfig = {
        config: getStyleLintBaseConfig({cwd: process.cwd()}),
        files: lintingFiles,
        // 当前stylelint的cache有问题，如果一个文件有语法错误，则第一次会被检查出来，第二次错误就消失了
        cache: false,
        cacheLocation: await resolveCacheLocation('stylelint'),
    };
    const report = await lint(lintConfig);
    return report.results.map(adaptStyleResultToScriptResult);
};
