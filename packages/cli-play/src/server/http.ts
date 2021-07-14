import path from 'path';
import fs from 'fs';
import {json} from 'body-parser';
import {PlayCase, CasePatch} from '../interface';
import {parseMarkdownToCases, serializeCaseToMarkdown, replaceCodeBlockForCase} from '../utils/case';
import {resolveComponentName, resolveCasePath} from '../utils/path';
import {ExpressApp} from './interface';

const createService = (componentModulePath: string) => {
    const componentName = resolveComponentName(componentModulePath);
    const casePath = resolveCasePath(componentModulePath);
    const writeContent = (content: string) => {
        fs.mkdirSync(path.dirname(casePath), {recursive: true});
        fs.writeFileSync(casePath, content);
    };

    return {
        listCases: (): PlayCase[] => {
            if (fs.existsSync(casePath)) {
                const content = fs.readFileSync(casePath, 'utf-8');
                return parseMarkdownToCases(content);
            }

            return [];
        },
        saveCase: (caseToSave: PlayCase) => {
            const content = fs.existsSync(casePath)
                ? fs.readFileSync(casePath, 'utf-8').trim()
                : `# ${componentName} reSKRipt Case`;
            const nextContent = content + '\n\n' + serializeCaseToMarkdown(caseToSave) + '\n';
            writeContent(nextContent);
        },
        updateCase: (name: string, patch: CasePatch) => {
            if (!fs.existsSync(casePath)) {
                return;
            }

            const content = fs.readFileSync(casePath, 'utf-8');
            const nextContent = replaceCodeBlockForCase(content, name, patch.code);
            writeContent(nextContent);
        },
    };
};

export default (app: ExpressApp, componentModulePath: string): void => {
    const service = createService(componentModulePath);

    // HTTP接口
    app.get(
        '/play/cases',
        (req, res) => {
            const cases = service.listCases();
            res.json(cases);
        }
    );
    app.post(
        '/play/cases',
        json(),
        (req, res) => {
            const caseToSave = req.body as PlayCase;
            try {
                service.saveCase(caseToSave);
                res.status(204).end();
            }
            catch {
                res.status(500).end();
            }
        }
    );
    app.put(
        '/play/cases/:name',
        json(),
        (req, res) => {
            const caseToSave = req.body as CasePatch;
            try {
                service.updateCase(req.params.name, caseToSave);
                res.status(204).end();
            }
            catch {
                res.status(500).end();
            }
        }
    );
};
