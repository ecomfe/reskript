import {ESLint} from 'eslint';
import {resolveCacheLocation, pFilter} from '@reskript/core';
import {getScriptLintBaseConfig} from '@reskript/config-lint';
import {resolveLintFiles} from './utils.js';
import {ResolveOptions} from './interface.js';

type LintResult = ESLint.LintResult;
type LintOptions = ESLint.Options;

export default async (files: string[], cmd: ResolveOptions): Promise<LintResult[]> => {
    const resolvedFiles = await resolveLintFiles('script', files, cmd);

    // 因为`ESLint`的创建和调用非常消耗时间（500ms+），所以这里做一个快速短路，在没有文件的时候就跳过了
    if (!resolvedFiles.length) {
        return [];
    }

    const cliConfig: LintOptions = {
        baseConfig: getScriptLintBaseConfig({cwd: process.cwd()}),
        cache: true,
        fix: cmd.fix,
        cacheLocation: await resolveCacheLocation('eslint'),
    };
    const cli = new ESLint(cliConfig);
    const lintingFiles = await pFilter(resolvedFiles, file => cli.isPathIgnored(file).then(ignored => !ignored));

    if (!lintingFiles.length) {
        return [];
    }

    const report = await cli.lintFiles(lintingFiles);

    if (cmd.fix) {
        ESLint.outputFixes(report);
    }

    return report;
};
