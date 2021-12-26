import path from 'path';
import {findGitRoot} from '@reskript/core';
import {ResolveOptions} from './interface.js';

type LintType = 'script' | 'style';

const TYPE_TO_EXTENSIONS = {
    script: ['.js', '.jsx', '.ts', '.tsx'],
    style: ['.css', '.less'],
};

export const resolveLintFiles = async (
    type: LintType,
    files: string[],
    {staged, changed, gitStatus}: ResolveOptions
): Promise<string[]> => {
    const {globby} = await import('globby');
    const extensions = TYPE_TO_EXTENSIONS[type];

    if (staged || changed) {
        // 当前目录可能不在git根目录下，所有的路径要相应做一次修复
        const gitRoot = await findGitRoot() || process.cwd();
        const cwdRelative = path.relative(gitRoot, process.cwd());
        const files = staged ? gitStatus.staged : gitStatus.modified;
        return files
            .filter(v => extensions.includes(path.extname(v)))
            .map(v => path.relative(cwdRelative, v))
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
    const fileOrFolders = files.length ? files : ['.', 'src'];
    const globs = fileOrFolders.map(pathToGlob);
    const matchedFiles = await Promise.all(globs.map(pattern => globby(pattern)));
    return matchedFiles.flatMap(v => v).filter(v => extensions.includes(path.extname(v)));
};
