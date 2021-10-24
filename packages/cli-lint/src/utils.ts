import path from 'path';
import globby from 'globby';
import status, {GitStatusItem} from 'g-status';
import {isEmpty, flatMap, flatten} from 'lodash';
import {findGitRoot} from '@reskript/core';
import {LintCommandLineArgs} from './interface';

type LintType = 'script' | 'style';

const TYPE_TO_EXTENSIONS = {
    script: ['.js', '.jsx', '.ts', '.tsx'],
    style: ['.css', '.less'],
};

const isStaged = ({index}: GitStatusItem) => index !== '?' && index !== ' ';

const findChangedFiles = async (paths: string[]): Promise<GitStatusItem[]> => {
    const files = await status({path: paths});

    const extractTargetFile = (item: GitStatusItem): GitStatusItem | GitStatusItem[] => {
        const {path, index, workingTree} = item;
        const status = index === ' ' ? workingTree : index;
        switch (status) {
            case 'R':
                return {
                    ...item,
                    path: path.split('->')[1].trim(),
                };
            case 'D':
                return [];
            default:
                return item;
        }
    };

    return flatMap(files, extractTargetFile);
};

export const resolveLintFiles = async (
    type: LintType,
    files: string[],
    {staged, changed}: LintCommandLineArgs
): Promise<string[]> => {
    const extensions = TYPE_TO_EXTENSIONS[type];

    if (staged || changed) {
        // 当前目录可能不在git根目录下，所有的路径要相应做一次修复
        const gitRoot = await findGitRoot() || process.cwd();
        const cwdRelative = path.relative(gitRoot, process.cwd());
        const paths = extensions.map(extension => `${cwdRelative ? cwdRelative + '/' : ''}*${extension}`);
        const files = await findChangedFiles(paths);
        return files
            .filter(staged ? isStaged : () => true)
            .map(entry => path.relative(cwdRelative, entry.path))
            .filter(v => !v.startsWith('..'));
    }

    const pathToGlob = (file: string): string | string[] => {
        // 当前目录比较特殊，只要检查文件，不用去检查子目录
        if (file === '.') {
            return extensions.map(extension => `./*${extension}`);
        }

        if (path.extname(file)) {
            return file;
        }

        return extensions.map(extension => `${file}/**/*${extension}`);
    };

    const fileOrFolders = isEmpty(files) ? ['.', 'src'] : files;
    const globs = flatMap(fileOrFolders, pathToGlob);
    const matchedFiles = await Promise.all(globs.map(pattern => globby(pattern)));
    return flatten(matchedFiles)
        .filter(filename => !filename.includes('__tests__/'))
        .filter(filename => extensions.includes(path.extname(filename)));
};
