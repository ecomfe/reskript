import childProcess from 'child_process';
import {compact} from 'lodash';
import ora from 'ora';
import {UserOptions} from '../interface';

const exec = (cwd: string, command: string) => {
    childProcess.execSync(
        command,
        {
            cwd,
            stdio: 'ignore',
        }
    );
};

export default async (cwd: string, options: UserOptions) => {
    const spinner = ora('Installing dependencies');
    spinner.start();

    const dependencies = [
        'react',
        'react-dom',
    ];
    const devDependencies = [
        'eslint',
        'stylelint',
        'typescript',
        'webpack',
        'husky',
        '@reskript/cli@next',
        '@reskript/cli-dev@next',
        '@reskript/cli-build@next',
        '@reskript/cli-lint@next',
        '@reskript/config-lint@next',
        options.tasks.includes('test') && '@reskript/cli-test@next',
        options.tasks.includes('play') && '@reskript/cli-play@next',
        '@types/react',
        '@types/react-dom',
    ];

    if (options.packageManager === 'npm') {
        exec(cwd, `npm install ${dependencies.join(' ')}`);
        exec(cwd, `npm install -D ${compact(devDependencies).join(' ')}`);
    }
    else {
        exec(cwd, `yarn add ${dependencies.join(' ')}`);
        exec(cwd, `yarn add -D ${compact(devDependencies).join(' ')}`);
    }

    spinner.succeed();
};
