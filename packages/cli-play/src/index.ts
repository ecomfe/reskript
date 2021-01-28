import {CommandConfig} from '@reskript/core';
import {PlayCommandLineArgs} from './interface';
import run from './run';

const command: CommandConfig<PlayCommandLineArgs> = {
    run,
    command: 'play [target]',
    description: 'Start a playground to debug a certain component',
    args: [
        ['--cwd [value]', 'override current working directory', process.cwd()],
        ['--build-target [value]', 'set build target, default to "dev"', 'dev'],
    ],
};

export default command;
