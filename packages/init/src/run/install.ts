import ora from 'ora';
import {execa} from 'execa';
import padStream from 'pad-stream';
import {isInDebugMode, compact} from '@reskript/core';
import {UserOptions} from '../interface.js';

const PACKAGE_MANAGER_INSTALL_COMMAND: Record<string, string[]> = {
    npm: ['npm', 'install', '--legacy-peer'],
    yarn: ['yarn', 'add'],
    pnpm: ['pnpm', 'add'],
};

const installWith = (cwd: string, packageManager: string) => {
    const [command, route, ...args] = PACKAGE_MANAGER_INSTALL_COMMAND[packageManager];

    return async (description: string, flags: string[], dependencies: Array<string | false>) => {
        const spinner = ora(description);
        const cmd = execa(command, [route, ...args, ...flags, ...compact(dependencies)], {cwd});

        if (isInDebugMode()) {
            spinner.stopAndPersist();
            cmd.stdout?.pipe(padStream(2, '   ')).pipe(process.stdout);
            cmd.stderr?.pipe(padStream(2, '   ')).pipe(process.stderr);
        }
        else {
            spinner.start();
        }

        await cmd;

        if (!isInDebugMode()) {
            spinner.succeed();
        }
    };
};


export default async (cwd: string, options: UserOptions) => {
    const install = installWith(cwd, options.packageManager);
    await install(
        'Installing runtime dependencies',
        [],
        [
            'core-js',
            'react',
            'react-dom',
        ]
    );
    await install(
        'Installing development dependencies',
        ['-D'],
        [
            'eslint',
            'stylelint@15.x',
            'typescript',
            options.driver === 'vite' ? 'vite@4.x' : 'webpack',
            options.gerrit ? 'husky@4.x' : 'husky',
            '@types/react',
            '@types/react-dom',
        ]
    );
    await install(
        'Installing reSKRipt packages',
        ['-D', '-E'],
        [
            '@reskript/cli',
            '@reskript/cli-dev',
            '@reskript/cli-build',
            '@reskript/cli-lint',
            '@reskript/config-lint',
            '@reskript/settings',
            options.tasks.includes('test') && '@reskript/cli-test',
            options.tasks.includes('play') && '@reskript/cli-play',
        ]
    );
};
