import path from 'node:path';
import {globby} from 'globby';
import {warn} from '../logger.js';

export default async (cwd: string) => {
    const entryFiles = await globby('src/entries/**/*.config.js', {cwd, absolute: true});
    if (entryFiles.length) {
        warn(
            'entry configurations have to change to .ts (recommended) or .mjs and be written in ESM',
            'see: https://reskript.vercel.app/docs/migration/v4#入口配置调整',
            ...entryFiles.map(v => path.relative(cwd, v))
        );
    }
};
