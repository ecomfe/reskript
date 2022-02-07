import path from 'node:path';
import {existsSync} from 'node:fs';
import fs from 'node:fs/promises';
import ora from 'ora';
import {globby} from 'globby';
import {dirFromImportMeta} from '@reskript/core';
import {UserOptions} from '../interface.js';

export default async (cwd: string, options: UserOptions) => {
    const spinner = ora('Copying initial files');
    spinner.start();

    const templateDirectory = path.join(dirFromImportMeta(import.meta.url), '..', '..', 'templates', 'normal-app');
    const files = await globby('**', {cwd: templateDirectory, dot: true});
    const copyFile = async (file: string) => {
        const destination = path.join(cwd, file);
        await fs.mkdir(path.dirname(destination), {recursive: true});
        const content = await fs.readFile(path.join(templateDirectory, file), 'utf-8');
        await fs.writeFile(
            destination,
            content.replace(/\{\{(\w+)\}\}/g, (match, key) => (options as any)[key].toString())
        );
    };
    await Promise.all(files.map(copyFile));

    const gitignoreExists = existsSync(path.join(cwd, '.gitignore'));
    if (gitignoreExists) {
        const data = await fs.readFile(path.join(cwd, 'gitignore'));
        await fs.appendFile(path.join(cwd, '.gitignore'), data);
        await fs.unlink(path.join(cwd, 'gitignore'));
    }
    else {
        await fs.rename(
            path.join(cwd, 'gitignore'),
            path.join(cwd, '.gitignore')
        );
    }

    spinner.succeed();
};
