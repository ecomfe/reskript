import path from 'node:path';
import fs from 'node:fs/promises';
import {globby} from 'globby';
import {warn} from '../logger.js';

const scanIn = (cwd: string) => async (file: string) => {
    const content = await fs.readFile(file, 'utf-8');
    const name = path.relative(cwd, file);

    if (content.includes('$features') || content.includes('$build')) {
        warn(
            `use of $features or $build inside ${name} should be replaced with skr.features or skr.build`,
            'see: https://reskript.dev/docs/migration/v5#常量变更'
        );
    }

    if (/import .+\.worker'/.test(content)) {
        warn(
            `worker imports inside ${name} should be changed to xxx?worker`,
            'see: https://reskript.dev/docs/migration/v5#Worker引入调整'
        );
    }
};

export default async (cwd: string) => {
    const files = await globby('src/**/*.{js,jsx,ts,tsx}', {cwd, absolute: true});
    await Promise.all(files.map(scanIn(cwd)));
};
