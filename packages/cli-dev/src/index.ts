import {CommandConfig} from '@reskript/core';
import {DevCommandLineArgs} from './interface';
import run from './run';

const command: CommandConfig<DevCommandLineArgs> = {
    run,
    command: 'dev',
    description: 'Start dev server for debugging',
    args: [
        ['--cwd [value]', 'override current working directory', process.cwd()],
        ['--mode [value]', 'set build mode, default to "development"', 'development'],
        ['--src [value]', 'specify the dir containing source files relative to cwd', 'src'],
        ['--build-target [value]', 'set build target, default to "dev"', 'dev'],
        ['--proxy-domain [domain]', 'set api proxy domain, only domain part (www.example.com) is required'],
        ['--open [value]', 'choose open "local" (localhost) or "remote" (ip) browser page', 'local'],
    ],
};

export default command;
