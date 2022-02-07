import path from 'node:path';
import fs from 'node:fs/promises';
import {uniq} from 'ramda';
import {globby} from 'globby';
import {findGitRoot} from '@reskript/core';
import {ResolveOptions} from './interface.js';

type LintType = 'script' | 'style';

const TYPE_TO_EXTENSIONS = {
    script: ['js', 'jsx', 'ts', 'tsx'],
    style: ['css', 'less'],
};

const TYPE_TO_EXTENSION_NAMES = {
    script: new Set(TYPE_TO_EXTENSIONS.script.map(v => '.' + v)),
    style: new Set(TYPE_TO_EXTENSIONS.style.map(v => '.' + v)),
};

export const resolveLintFiles = async (
    type: LintType,
    files: string[],
    {staged, changed, gitStatus}: ResolveOptions
): Promise<string[]> => {
    const extensions = TYPE_TO_EXTENSIONS[type];
    const extensionNames = TYPE_TO_EXTENSION_NAMES[type];
    const isLintable = (file: string) => extensionNames.has(path.extname(file));

    if (staged || changed) {
        // 当前目录可能不在git根目录下，所有的路径要相应做一次修复
        const gitRoot = await findGitRoot() || process.cwd();
        const cwdRelative = path.relative(gitRoot, process.cwd());
        const files = staged ? gitStatus.staged : gitStatus.modified;
        return files.filter(isLintable).map(v => path.relative(cwdRelative, v)).filter(v => !v.startsWith('..'));
    }

    const matchFiles = async (file: string): Promise<string[]> => {
        // 当前目录比较特殊，只要检查文件，不用去检查子目录
        if (file === '.') {
            return globby(`*.{${extensions.join(',')}}`);
        }

        const stat = await fs.stat(file);

        if (stat.isFile()) {
            return [file];
        }

        const found = await globby(`**/*.{${extensions.join(',')}}`, {cwd: file});
        return found.map(v => path.join(file, v));
    };
    const fileOrFolders = files.length ? files : ['.', 'src'];
    const matchedFiles = await Promise.all(fileOrFolders.map(matchFiles));
    return uniq(matchedFiles.flatMap(v => v).filter(isLintable));
};
