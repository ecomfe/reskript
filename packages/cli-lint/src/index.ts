import {CommandConfig} from '@reskript/core';
import {LintCommandLineArgs} from './interface';
import run from './run';

const command: CommandConfig<LintCommandLineArgs> = {
    run,
    command: 'lint [files...]',
    description: 'Lint files, by default .js(x) files under src and webpack are linted',
    args: [
        ['--changed', 'lint only changed files in git workspace'],
        ['--staged', 'lint only staged (both partially and fully) files in git workspace'],
        ['--allow-unsafe-react-method', 'allow UNSAFE_* methods in react component'],
        ['--fix', 'fix possible lint errors'],
    ],
};

export default command;
