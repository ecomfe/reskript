import {isEnum} from 'typanion';
import {Option} from 'clipanion';
import {TestCommandLineArgs} from '@reskript/cli-test';
import DynamicImportCommand from './DynamicImportCommand';

export default class LintCommand extends DynamicImportCommand<TestCommandLineArgs> {
    static paths = [['test']];

    static usage = {
        description: 'Test with jest',
    };

    packageName = '@reskript/cli-test';

    cwd = Option.String('--cwd', process.cwd(), {description: 'override current working directory'});

    coverage = Option.Boolean('--coverage', false, {description: 'indicates test coverage information'});

    watch = Option.Boolean(
        '--watch',
        false,
        {description: 'watch files for changes and rerun tests related to changed files'}
    );

    target = Option.String<TestCommandLineArgs['target']>(
        '--target',
        'node',
        {
            validator: isEnum(['node', 'react']),
            description: 'specify test environment of the project is "react" or "node", default to "node"',
        }
    );

    changedSince = Option.String(
        '--changedSince',
        '',
        {description: 'runs tests related to the changes since the provided branch'}
    );

    collectCoverageFrom = Option.String(
        '--collect-coverage-from',
        '',
        {description: 'only collect coverage from given glob'}
    );

    maxWorkers = Option.String(
        '--maxWorkers',
        {description: 'Max used worker count'}
    );

    files = Option.Rest();

    buildCommandLineArgs() {
        return {
            cwd: this.cwd,
            coverage: this.coverage,
            watch: this.watch,
            target: this.target,
            changedSince: this.changedSince,
            collectCoverageFrom: this.collectCoverageFrom,
            maxWorkers: this.maxWorkers,
        };
    }

    resolveRestArgs() {
        return this.files;
    }
}
