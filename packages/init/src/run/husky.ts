import path from 'path';
import fs = require('fs');
import childProcess from 'child_process';
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

const gerritCompatible = (cwd: string) => {
    const packageInfo = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));
    packageInfo.husky = {
        hooks: {
            'pre-commit': 'skr lint --staged',
        },
    };
    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(packageInfo, null, '  ') + '\n');
};

const noGerrit = (cwd: string) => {
    exec(cwd, 'npx --no-install husky install');
    exec(cwd, 'npx --no-install husky add .husky/pre-commit "npx --no-install skr lint --staged"');
};

export default async (cwd: string, options: UserOptions) => {
    if (options.gerrit) {
        gerritCompatible(cwd);
    }
    else {
        noGerrit(cwd);
    }
};
