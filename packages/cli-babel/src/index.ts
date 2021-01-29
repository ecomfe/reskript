import {CommandConfig} from '@reskript/core';
import {BabelCommandLineArgs} from './interface';
import run from './run';

const command: CommandConfig<BabelCommandLineArgs> = {
    run,
    command: 'babel [file]',
    description: 'Transform files with babel',
    args: [
        ['--mode [value]', 'set build mode, default to "development"', 'development'],
        ['--no-polyfill', 'transform without inserting core-js imports', false],
        ['--out [directory]', 'specify output to directory'],
        ['--clean', 'remove dist directory before build', false],
        ['--copy', 'copy non-script file to output directory', false],
    ],
};

export default command;
