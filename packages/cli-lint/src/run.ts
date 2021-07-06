import {stubTrue} from 'lodash';
import eslintPrettyFormatter from 'eslint-formatter-pretty';
import {Linter, ESLint} from 'eslint';
import {logger} from '@reskript/core';
import {LintCommandLineArgs} from './interface';
import lintScripts from './script';
import lintStyles from './style';

type LintResult = ESLint.LintResult;
type LintMessage = Linter.LintMessage;

const filterUnwantedReports = (report: LintResult[], cmd: LintCommandLineArgs): LintResult[] => {
    const omitReactUnsafe = cmd.allowUnsafeReactMethod
        ? ({ruleId, message}: LintMessage) => ruleId !== 'camelcase' || !message.startsWith('Identifier \'UNSAFE')
        : stubTrue;

    const filterMessage = (report: LintResult): LintResult => {
        const messages = report.messages.filter(omitReactUnsafe);
        return {...report, messages};
    };

    return report.map(filterMessage);
};

export default async (files: string[], cmd: LintCommandLineArgs): Promise<void> => {
    const [scriptResults, styleResults] = await Promise.all([lintScripts(files, cmd), lintStyles(files, cmd)]);
    const lintResults = filterUnwantedReports([...scriptResults, ...styleResults], cmd);

    const hasError = lintResults.some(v => v.errorCount > 0);
    const hasWarn = lintResults.some(v => v.warningCount > 0);
    const isLintPassed = cmd.strict ? hasError || hasWarn : hasError;
    if (isLintPassed) {
        if (hasWarn) {
            logger.log.yellow('(；′⌒`) Nice work, still looking forward to see all warnings fixed!');
        }
        else {
            logger.log.green('(๑ơ ₃ ơ)♥ Great! This is a clean lint over hundreds of rules!');
        }
    }
    else {
        const output = eslintPrettyFormatter(lintResults);
        logger.log(output);
        process.exit(25);
    }
};
