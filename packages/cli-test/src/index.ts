import {CommandConfig} from '@reskript/core';
import {TestCommandLineArgs} from './interface';
import run from './run';

const command: CommandConfig<TestCommandLineArgs> = {
    run,
    command: 'test',
    description: 'Test with jest',
    args: [
        ['--cwd [value]', 'override current working directory', process.cwd()],
        ['--coverage', 'indicates test coverage information', false],
        ['--watch', 'watch files for changes and rerun tests related to changed files', false],
        ['--target [value]', 'specify test environment of the project is "react" or "node"', 'node'],
        ['--changedSince [value]', 'runs tests related to the changes since the provided branch.', ''],
    ],
};

export default command;
