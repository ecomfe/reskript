import childProcess from 'child_process';

const exec = (cwd: string, command: string) => {
    childProcess.execSync(
        command,
        {
            cwd,
            stdio: 'ignore',
        }
    );
};

export default async (cwd: string) => {
    exec(cwd, 'npx --no-install husky install');
    exec(cwd, 'npx --no-install husky add .husky/pre-commit "npx --no-install skr lint --staged"');
};
