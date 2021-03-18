import path from 'path';
import chalk from 'chalk';
import globby from 'globby';
import dedent from 'dedent';

const ALLOWED_EXISTING_FILES = new Set(['package.json', 'README.md', 'LICENSE', '.gitignore', '.npmrc', '.yarnrc']);

const checkDirectoryHasTooManyFiles = async (cwd: string) => {
    const files = await globby(`${cwd}/**`);

    if (files.length > ALLOWED_EXISTING_FILES.size) {
        return true;
    }

    return files.some(f => !ALLOWED_EXISTING_FILES.has(path.basename(f)));
};

export default async (cwd: string) => {
    const directoryHasTooManyFiles = await checkDirectoryHasTooManyFiles(cwd);
    if (directoryHasTooManyFiles) {
        const message = dedent`
            Your directory has too many file existing
            all files allowed before initialization are: ${[...ALLOWED_EXISTING_FILES.values()].join(', ')}
        `;
        console.error(chalk.red(message));
        process.exit(24);
    }
};

