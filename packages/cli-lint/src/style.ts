import fs from 'fs';
import {lint, LintResult as StyleLintResult, LintMessage as StyleLintMessage} from 'stylelint';
import {isEmpty, flatten} from 'lodash';
import {ESLint, Linter} from 'eslint';
import {resolveCacheLocation} from '@reskript/core';
import {getStyleLintConfig} from '@reskript/config-lint';
import {LintCommandLineArgs} from './interface';
import {resolveLintFiles} from './utils';

type LintResult = ESLint.LintResult;
type LintMessage = Linter.LintMessage;

const adaptStyleErrorToScriptError = (message: StyleLintMessage): LintMessage => {
    const {line, column, rule, severity, text} = message;
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
};

const adaptStyleResultToScriptResult = (result: StyleLintResult): LintResult => {
    const {source, warnings, parseErrors} = result;
    const errorCount = warnings.length + parseErrors.length;

    return {
        errorCount,
        filePath: source,
        messages: [...parseErrors, ...warnings].map(adaptStyleErrorToScriptError),
        warningCount: 0,
        fixableErrorCount: 0,
        fixableWarningCount: 0,
        usedDeprecatedRules: [],
    };
};

const CUSTOM_STYLE_LINT_CONFIG_FILE = './stylelint.config.js';

const hasCustomStyleLintConfig = () => fs.existsSync(CUSTOM_STYLE_LINT_CONFIG_FILE);

const allowCustomConfig = (baseConfig: Record<string, any>) => (
    hasCustomStyleLintConfig()
        ? {...baseConfig, extends: flatten([baseConfig.extends || [], CUSTOM_STYLE_LINT_CONFIG_FILE])}
        : baseConfig
);

export default async (files: string[], cmd: LintCommandLineArgs): Promise<LintResult[]> => {
    const lintingFiles = await resolveLintFiles('style', files, cmd);

    if (isEmpty(lintingFiles)) {
        return [];
    }

    const baseConfig = getStyleLintConfig();
    const lintConfig = {
        config: allowCustomConfig(baseConfig),
        files: lintingFiles,
        // 当前stylelint的cache有问题，如果一个文件有语法错误，则第一次会被检查出来，第二次错误就消失了
        cache: false,
        cacheLocation: await resolveCacheLocation('stylelint'),
    };
    const report = await lint(lintConfig);
    return report.results.map(adaptStyleResultToScriptResult);
};
