import path from 'path';
import {existsSync} from 'fs';
import fs from 'fs/promises';
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
    const writeContent = async (content: string) => {
        await fs.mkdir(path.dirname(casePath), {recursive: true});
        await fs.writeFile(casePath, content);
    };

    return {
        listCases: async (): Promise<PlayCase[]> => {
            if (existsSync(casePath)) {
                const content = await fs.readFile(casePath, 'utf-8');
                return parseMarkdownToCases(content);
            }

            return [];
        },
        saveCase: async (infoToSave: PlayCaseInfo) => {
            const now = new Date();
            const user = await currentUserName();
            const caseToSave: PlayCase = {
                ...infoToSave,
                createAt: formatTime(now),
                createBy: user,
                lastRunAt: formatTime(now),
                lastRunBy: user,
            };
            const content = existsSync(casePath)
                ? await fs.readFile(casePath, 'utf-8')
                : `# ${componentName} reSKRipt Case`;
            const nextContent = content.trim() + '\n\n' + serializeCaseToMarkdown(caseToSave) + '\n';
            writeContent(nextContent);
        },
        updateCase: async (name: string, patch: CasePatch) => {
            if (!existsSync(casePath)) {
                return;
            }

            const content = await fs.readFile(casePath, 'utf-8');
            const nextContent = replaceCodeBlockForCase(content, name, patch.code);
            writeContent(nextContent);
        },
        touchCase: async (name: string) => {
            if (!existsSync(casePath)) {
                return;
            }

            const [content, currentUser] = await Promise.all([fs.readFile(casePath, 'utf-8'), currentUserName()]);
            const nextContent = await replaceLastRun(content, name, formatTime(new Date()), currentUser);
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
