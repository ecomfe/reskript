import eslintPrettyFormatter from 'eslint-formatter-pretty';
import {Linter, ESLint} from 'eslint';
import {execa} from 'execa';
import {logger, gitStatus, findGitRoot} from '@reskript/core';
import {LintCommandLineArgs, ResolveOptions} from './interface.js';
import lintScripts from './script.js';
import lintStyles from './style.js';

export {LintCommandLineArgs};

type LintResult = ESLint.LintResult;
type LintMessage = Linter.LintMessage;

const filterUnwantedReports = (report: LintResult[], cmd: LintCommandLineArgs): LintResult[] => {
    const omitReactUnsafe = cmd.allowUnsafeReactMethod
        ? ({ruleId, message}: LintMessage) => ruleId !== 'camelcase' || !message.startsWith('Identifier \'UNSAFE')
        : () => true;

    const filterMessage = (report: LintResult): LintResult => {
        const messages = report.messages.filter(omitReactUnsafe);
        return {...report, messages};
    };

    return report.map(filterMessage);
};

export const run = async (cmd: LintCommandLineArgs, files: string[]): Promise<void> => {
    const gitRoot = await findGitRoot() || process.cwd();
    const status = await gitStatus(process.cwd());
    const options: ResolveOptions = {...cmd, gitRoot, gitStatus: status};
    const [scriptResults, styleResults] = await Promise.all([lintScripts(files, options), lintStyles(files, options)]);
    const lintResults = filterUnwantedReports([...scriptResults, ...styleResults], cmd);

    const hasError = lintResults.some(v => v.errorCount > 0);
    const hasWarn = lintResults.some(v => v.warningCount > 0);
    const isLintFailed = cmd.strict ? hasError || hasWarn : hasError;

    if (cmd.autoStage) {
        // 把之前已经加入索引的部分加回去
        logger.debug(`stage ${status.stagedOnly.length} files`);
        await execa(
            'git',
            ['add', ...status.stagedOnly],
            {cwd: gitRoot}
        );
    }

    if (hasError || hasWarn) {
        const output = eslintPrettyFormatter(lintResults);
        logger.log(output);
    }

    if (isLintFailed) {
        process.exit(25);
    }

    if (hasWarn) {
        logger.log.yellow('(；′⌒`) Nice work, still looking forward to see all warnings fixed!');
    }
    else {
        logger.log.green('(๑ơ ₃ ơ)♥ Great! This is a clean lint over hundreds of rules!');
    }
};
