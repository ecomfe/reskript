import path from 'path';
import {existsSync} from 'fs';
import fs from 'fs/promises';
import bodyParser from 'body-parser';
import {currentUserName} from '@reskript/core';
import {PlayCase, CasePatch, PlayCaseInfo} from '../interface.js';
import {parseMarkdownToCases, serializeCaseToMarkdown, replaceCodeBlockForCase, replaceLastRun} from '../utils/case.js';
import {resolveComponentName, resolveCasePath} from '../utils/path.js';
import {formatTime} from '../utils/time.js';
import {ExpressApp} from './interface.js';

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
    app.get('/play/ok', (req, res) => res.end('OK'));
    app.get(
        '/play/cases',
        async (req, res) => {
            const cases = await service.listCases();
            res.json(cases);
        }
    );
    app.post(
        '/play/cases',
        bodyParser.json(),
        async (req, res) => {
            const caseToSave = req.body as PlayCase;
            try {
                await service.saveCase(caseToSave);
                res.status(204).end();
            }
            catch {
                res.status(500).end();
            }
        }
    );
    app.put(
        '/play/cases/:name',
        bodyParser.json(),
        async (req, res) => {
            const caseToSave = req.body as CasePatch;
            try {
                await service.updateCase(req.params.name, caseToSave);
                res.status(204).end();
            }
            catch {
                res.status(500).end();
            }
        }
    );
    app.put(
        '/play/cases/:name/TOUCH',
        async (req, res) => {
            try {
                await service.touchCase(req.params.name);
                res.status(204).end();
            }
            catch {
                res.status(500).end();
            }
        }
    );
};
