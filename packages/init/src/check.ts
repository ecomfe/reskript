import path from 'path';
import {logger} from '@reskript/core';

const ALLOWED_EXISTING_FILES = new Set([
    'package.json',
    'README.md',
    'LICENSE',
    '.gitignore',
    '.npmrc',
    '.yarnrc',
    '.yarnrc.yml',
    '.yarn',
    '.git',
]);

const checkDirectoryHasTooManyFiles = async (cwd: string) => {
    const {globby} = await import('globby');
    const files = await globby(`${cwd}/**`, {dot: true, onlyFiles: false, deep: 1});

    if (files.length > ALLOWED_EXISTING_FILES.size) {
        return true;
    }

    return files.some(f => !ALLOWED_EXISTING_FILES.has(path.basename(f)));
};

export default async (cwd: string) => {
    const directoryHasTooManyFiles = await checkDirectoryHasTooManyFiles(cwd);
    if (directoryHasTooManyFiles) {
        const message = `
            Your directory has too many file existing
            all files allowed before initialization are: ${[...ALLOWED_EXISTING_FILES.values()].join(', ')}
        `;
        logger.error(message);
        process.exit(24);
    }
};

