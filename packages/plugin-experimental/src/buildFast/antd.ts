import path from 'node:path';
import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolveFrom, dirFromImportMeta, compact} from '@reskript/core';

const currentDirectory = dirFromImportMeta(import.meta.url);

interface AntdExport {
    componentName: string;
    moduleName: string;
}

const parseModulesFromEntry = async (entry: string): Promise<AntdExport[]> => {
    const content = await fs.readFile(entry, 'utf8');
    const lines = content.trim().split('\n');
    const parseLine = (line: string) => {
        // 每一行是形如`export { default as Statistic } from './statistic';`的结构
        const match = /export \{ default as (\w+) \} from '\.\/([\w-]+)';/.exec(line);
        return match && {componentName: match[1], moduleName: match[2]};
    };
    return compact(lines.map(parseLine));
};

const prepareComponent = ({componentName, moduleName}: AntdExport) => {
    const file = path.join(currentDirectory, 'exports', componentName) + '.js';

    if (existsSync(file)) {
        return;
    }

    if (componentName === 'version') {
        fs.writeFile(file, 'export {default} from `antd/es/version/index.js');
    }
    else {
        const lines = [
            `import 'antd/es/${moduleName}/style/index.js';`,
            `export {default} from 'antd/es/${moduleName}/index.js';`,
        ];
        fs.writeFile(file, lines.join('\n'));
    }
};

export const prepareAntdReplacement = async (cwd: string) => {
    const resolve = resolveFrom(cwd);
    const entry = await resolve('antd/es/index.js');
    const modules = await parseModulesFromEntry(entry);
    await fs.mkdir(path.join(currentDirectory, 'exports'), {recursive: true});
    await Promise.all(modules.map(prepareComponent));
};
