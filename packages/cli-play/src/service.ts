import fs from 'fs';
import path from 'path';
import {PlayCase} from './interface';
import {parseMarkdownToCases, serializeCaseToMarkdown} from './utils/case';

export default (componentModulePath: string) => {
    const directory = path.dirname(componentModulePath);
    const file = path.basename(componentModulePath, path.extname(componentModulePath));
    const caseFileName = path.join(directory, '__repl__', `${file}.case.md`);

    return {
        listCases: (): PlayCase[] => {
            if (fs.existsSync(caseFileName)) {
                const content = fs.readFileSync(caseFileName, 'utf-8');
                return parseMarkdownToCases(content);
            }

            return [];
        },
        saveCase: (caseToSave: PlayCase) => {
            const content = fs.existsSync(caseFileName)
                ? fs.readFileSync(caseFileName, 'utf-8').trim()
                : `# ${file} reSKRipt Case`;
            const nextConetnt = content + '\n\n' + serializeCaseToMarkdown(caseToSave) + '\n';
            fs.writeFileSync(caseFileName, nextConetnt);
        },
    };
};
