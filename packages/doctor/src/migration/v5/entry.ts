import path from 'node:path';
import fs from 'node:fs/promises';
import {globby} from 'globby';
import {warn} from '../logger.js';

const checkEntryConfigIn = (cwd: string) => async (file: string) => {
    const content = await fs.readFile(file, 'utf-8');
    if (content.includes('export const html')) {
        const name = path.relative(cwd, file);
        warn(
            `export html inside ${name} should be changed to templateData if it provides data to html template`,
            'see: https://reskript.dev/docs/migration/v5#入口配置调整'
        );
    }
};

const checkTemplateIn = (cwd: string) => async (file: string) => {
    const content = await fs.readFile(file, 'utf-8');
    if (content.includes('htmlWebpackPlugin')) {
        const name = path.relative(cwd, file);
        warn(
            `use of htmlWebpackPlugin object is deprecated in ${name}, use templateData instead`,
            'see: https://reskript.dev/docs/migration/v5#入口配置调整'
        );
    }
};

export default async (cwd: string) => {
    const entryConfigFiles = await globby('src/entries/**/*.config.{ts,mjs}', {cwd, absolute: true});
    const entryTemplateFiles = await globby('src/entries/**/*.ejs', {cwd, absolute: true});
    await Promise.all(entryConfigFiles.map(checkEntryConfigIn(cwd)));
    await Promise.all(entryTemplateFiles.map(checkTemplateIn(cwd)));
};
