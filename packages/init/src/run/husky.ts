import path from 'path';
import fs from 'fs';
import childProcess from 'child_process';
import {readPackageConfig} from '@reskript/core';
import {UserOptions} from '../interface.js';

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
                'pre-commit': 'npm run lint-staged',
            },
        },
    };
    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(hooksInstalled, null, '  ') + '\n');
};

const HUSKY_CMD = {
    install: 'npx --no-install husky install',
    add: 'npx --no-install husky add .husky/pre-commit "npm run lint-staged"',
};

const noGerrit = (cwd: string) => {
    try {
        exec(cwd, HUSKY_CMD.install);
        exec(cwd, HUSKY_CMD.add);
    }
    catch {
        console.error('Husky install failed, maybe this is not a git enabled project.');
        console.error('You may run these scripts to enable husky later:');
        console.error(`    ${HUSKY_CMD.install}`);
        console.error(`    ${HUSKY_CMD.add}`);
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
