import path from 'path';
import fs from 'fs';
import {json} from 'body-parser';
import {currentUserName} from '@reskript/core';
import {PlayCase, CasePatch, PlayCaseInfo} from '../interface';
import {parseMarkdownToCases, serializeCaseToMarkdown, replaceCodeBlockForCase, replaceLastRun} from '../utils/case';
import {resolveComponentName, resolveCasePath} from '../utils/path';
import {formatTime} from '../utils/time';
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
        saveCase: (infoToSave: PlayCaseInfo) => {
            const now = new Date();
            const user = currentUserName();
            const caseToSave: PlayCase = {
                ...infoToSave,
                createAt: formatTime(now),
                createBy: user,
                lastRunAt: formatTime(now),
                lastRunBy: user,
            };
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
        touchCase: (name: string) => {
            if (!fs.existsSync(casePath)) {
                return;
            }

            const content = fs.readFileSync(casePath, 'utf-8');
            const nextContent = replaceLastRun(content, name, formatTime(new Date()), currentUserName());
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
    app.put(
        '/play/cases/:name/TOUCH',
        (req, res) => {
            try {
                service.touchCase(req.params.name);
                res.status(204).end();
            }
            catch {
                res.status(500).end();
            }
        }
    );
};
