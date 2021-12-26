import path from 'path';
import {globby} from 'globby';
import {pFilter} from '@reskript/core';
import {warn} from '../logger.js';

const isEntryBroken = async (file: string) => {
    const {default: config} = await import(file);
    const keys = Object.keys(config);
    return keys.some(v => v !== 'entry' && v !== 'html');
};

export default async (cwd: string) => {
    const entryFiles = await globby('src/entries/**/*.config.js', {cwd, absolute: true});
    const brokenEntries = await pFilter(entryFiles, isEntryBroken);
    if (brokenEntries.length) {
        warn(
            'found some legacy entry configurations, move all exports into a single exports.html object',
            'see: https://reskript.vercel.app/docs/migration/v2#入口配置相关',
            ...brokenEntries.map(v => path.relative(cwd, v))
        );
    }
};
