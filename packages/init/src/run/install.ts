import childProcess from 'child_process';
import {promisify} from 'util';
import {compact} from 'lodash';
import ora from 'ora';
import {UserOptions} from '../interface';

const execAsync = promisify(childProcess.exec);

const PACKAGE_MANAGER_INSTALL_COMMAND: Record<string, string> = {
    npm: 'npm install',
    yarn: 'yarn add',
    pnpm: 'pnpm add',
};

const installWith = (cwd: string, packageManager: string) => {
    const command = PACKAGE_MANAGER_INSTALL_COMMAND[packageManager];

    return async (description: string, flags: string[], dependencies: Array<string | false>) => {
        const spinner = ora(description);
        spinner.start();
        await execAsync(`${command} ${flags.join(' ')} ${compact(dependencies).join(' ')}`, {cwd});
        spinner.succeed();
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
            'stylelint',
            'typescript',
            'webpack',
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
            options.tasks.includes('test') && '@reskript/cli-test',
            options.tasks.includes('play') && '@reskript/cli-play',
        ]
    );
};
