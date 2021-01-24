import chalk from 'chalk';
import {sumBy, stubTrue} from 'lodash';
import eslintPrettyFormatter from 'eslint-formatter-pretty';
import {Linter, ESLint} from 'eslint';
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

    const isCleanLint = sumBy(lintResults, ({errorCount, warningCount}) => errorCount + warningCount) === 0;
    if (isCleanLint) {
        console.log(chalk.green.bold('(๑ơ ₃ ơ)♥ Great! This is a clean lint over hundreds of rules!'));
    }
    else {
        const output = eslintPrettyFormatter(lintResults);
        console.log(output);
        process.exit(1);
    }
};
