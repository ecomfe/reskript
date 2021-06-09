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
        ['--src [value]', '[DEPRECATED] use --src-dir instead'],
        ['--src-dir [value]', 'specify the directory containing source files relative to cwd', 'src'],
        ['--entries-dir [value]', 'specify the directory containing entry files', 'entries'],
        ['--build-target [value]', 'set build target, default to "dev"', 'dev'],
        ['--proxy-domain [domain]', 'set api proxy domain, only domain part (www.example.com) is required'],
        ['--open [value]', '[DEPRECATED] use --host instead'],
        ['--host [value]', 'default server host, "localhost" or "loopback" or "ip" or custom host string'],
        ['--entry [value]', 'specify an entry as the default page', 'index'],
    ],
};

export default command;
