import {existsSync} from 'node:fs';
import path from 'node:path';
import env from 'dotenv';
import {expand} from 'dotenv-expand';
import {findMonorepoRoot, isMonorepo} from './project.js';
import {WorkMode} from './interface.js';

export const prepareEnvironment = async (cwd: string, mode: WorkMode, custom: string[] | undefined) => {
    const files = [
        path.join(cwd, `.env.${mode}.local`),
        path.join(cwd, '.env.local'),
        path.join(cwd, `.env.${mode}`),
        path.join(cwd, '.env'),
    ];

    const isWorkspace = await isMonorepo(cwd);
    if (isWorkspace) {
        const root = await findMonorepoRoot(cwd);
        files.unshift(
            path.join(root, '.env'),
            path.join(root, `.env.${mode}`),
            path.join(root, '.env.local'),
            path.join(root, `.env.${mode}.local`)
        );
    }

    if (custom) {
        // 自定义的优先级最高，越往后的越高，所以正好要反过来
        files.unshift(...custom.slice().reverse().map(v => path.resolve(cwd, v)));
    }

    for (const file of files) {
        if (existsSync(file)) {
            expand(env.config({path: file}));
        }
    }
};
