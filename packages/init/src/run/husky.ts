import path from 'path';
import fs from 'fs';
import childProcess from 'child_process';
import {readPackageConfig} from '@reskript/core';
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

const gerritCompatible = async (cwd: string) => {
    const packageInfo = await readPackageConfig(cwd);
    const hooksInstalled = {
        ...packageInfo,
        husky: {
            hooks: {
                'pre-commit': 'skr lint --staged',
            },
        },
    };
    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(hooksInstalled, null, '  ') + '\n');
};

const noGerrit = (cwd: string) => {
    try {
        exec(cwd, 'npx --no-install husky install');
        exec(cwd, 'npx --no-install husky add .husky/pre-commit "npx --no-install skr lint --staged"');
    }
    catch {
        console.error('Husky install failed, maybe this is not a git enabled project.');
        console.error('You may run these scripts to enable husky later:');
        console.error('    npx --no-install husky install');
        console.error('    npx --no-install husky add .husky/pre-commit "npx --no-install skr lint --staged"');
    }
};

export default async (cwd: string, options: UserOptions) => {
    if (options.gerrit) {
        await gerritCompatible(cwd);
    }
    else {
        noGerrit(cwd);
    }
};
