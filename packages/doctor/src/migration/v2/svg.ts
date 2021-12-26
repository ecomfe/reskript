import path from 'path';
import fs from 'fs/promises';
import {globby} from 'globby';
import {pFilter} from '@reskript/core';
import {tip, warn} from '../logger.js';

const containsLegacySvgImport = async (file: string) => {
    const content = await fs.readFile(file, 'utf-8');
    return /import.+\{ReactComponent.+\.svg'/.test(content);
};

const checkScriptImport = async (cwd: string) => {
    const files = await globby('src/**/*.{js,jsx,tsx}', {cwd});
    const warnings = await pFilter(files, containsLegacySvgImport);
    if (warnings.length) {
        warn(
            'found files contain {ReactComponent} named import from svg, change to default import from .svg?react',
            ...warnings.map(v => path.relative(cwd, v))
        );
    }
};

const containsLegacySvgUrl = async (file: string) => {
    const content = await fs.readFile(file, 'utf-8');
    return /svg\.?asset'/.test(content);
};

const checkCssUrl = async (cwd: string) => {
    const files = await globby('src/**/*.{css,less}', {cwd});
    const warnings = await pFilter(files, containsLegacySvgUrl);
    if (warnings.length) {
        tip(
            'found css files contain .svg?asset url, you can now safely remove the ?asset part',
            ...warnings.map(v => path.relative(cwd, v))
        );
    }
};

export default async (cwd: string) => {
    await checkScriptImport(cwd);
    await checkCssUrl(cwd);
};
