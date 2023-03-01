import path from 'node:path';
import fs from 'node:fs/promises';
import {globby} from 'globby';
import {tip} from '../logger.js';

const checkEntryConfigIn = (cwd: string) => async (file: string) => {
    const content = await fs.readFile(file, 'utf-8');
    if (content.includes('filename:')) {
        const name = path.relative(cwd, file);
        tip(
            `using filename config in ${name} may result different build output from previous version, `
                + 'check it carefully or add "assets/" prefix to filename value',
            'see: https://reskript.dev/docs/migration/v5#Webpack产出结构升级'
        );
    }
};

export default async (cwd: string) => {
    const entryConfigFiles = await globby('src/entries/**/*.config.{ts,mjs}', {cwd, absolute: true});
    await Promise.all(entryConfigFiles.map(checkEntryConfigIn(cwd)));
};
