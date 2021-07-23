import fs from 'fs';
import path from 'path';
import env from 'dotenv';
import expand from 'dotenv-expand';
import {findMonorepoRoot, isMonorepo} from './project';
import {WorkMode} from './interface';

export const prepareEnvironment = (cwd: string, mode: WorkMode) => {
    const files = [
        path.join(cwd, '.env'),
        path.join(cwd, `.env.${mode}`),
        path.join(cwd, '.env.local'),
        path.join(cwd, `.env.${mode}.local`),
    ];

    if (isMonorepo(cwd)) {
        const root = findMonorepoRoot(cwd);
        files.unshift(
            path.join(root, '.env'),
            path.join(root, `.env.${mode}`),
            path.join(root, '.env.local'),
            path.join(root, `.env.${mode}.local`)
        );
    }

    for (const file of files) {
        if (fs.existsSync(file)) {
            expand(env.config({path: file}));
        }
    }
};
