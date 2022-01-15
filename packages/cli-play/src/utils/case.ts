import {findLast, reject, isNil} from 'ramda';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import stringify from 'remark-stringify';
import {unified} from 'unified';
import {Content, Root, Text, Code, List} from 'mdast';
import {currentUserName, pMap} from '@reskript/core';
import {PlayCase, PlayCaseMeta} from '../interface.js';
import {formatTime} from './time.js';

const parser = unified().use(parse).use(gfm);
const serializer = unified().use(stringify);

const stringifyNodesToMarkdown = (nodes: Content[]): string => {
    const root: Root = {
        type: 'root',
        children: nodes,
    };
    return serializer.stringify(root);
};

const findReplCodeBlock = (nodes: Content[]) => findLast(v => v.type === 'code' && v.lang === 'jsx', nodes);

const isListItem = (node: Content) => node.type === 'listItem';

const parseMetaText = (text: string): [string, string, string] | null => {
    const matches = /^(\w+): (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \(([^)]+)\)$/.exec(text);
    return matches ? [matches[1], matches[2], matches[3]] : null;
};

const parseMeta = (metaNode: List): PlayCaseMeta => {
    const items = metaNode.children.filter(isListItem);
    const meta = items.reduce<PlayCaseMeta>(
        (meta, item) => {
            const childNode = item.children[0];
            const textNode = childNode.type === 'paragraph' ? childNode.children[0] : null;

            if (textNode?.type !== 'text') {
                return meta;
            }

            const parsed = parseMetaText(textNode.value);

            if (parsed) {
                const [name, date, user] = parsed;
                switch (name) {
                    case 'Create':
                        meta.createAt = date;
                        meta.createBy = user;
                        break;
                    case 'Run':
                        meta.lastRunAt = date;
                        meta.lastRunBy = user;
                        break;
                }
            }

            return meta;
        },
        {createAt: '', createBy: '', lastRunAt: '', lastRunBy: ''}
    );
    return meta;
};

const extractMeta = async (metaNode: Content): Promise<PlayCaseMeta> => {
    const parsedMeta: PlayCaseMeta = metaNode.type === 'list'
        ? parseMeta(metaNode)
        : {createAt: '', createBy: '', lastRunAt: '', lastRunBy: ''};
    const now = new Date();
    const user = await currentUserName();
    if (!parsedMeta.createAt) {
        parsedMeta.createAt = formatTime(now);
        parsedMeta.createBy = user;
    }
    if (!parsedMeta.lastRunAt) {
        parsedMeta.lastRunAt = formatTime(now);
        parsedMeta.lastRunBy = user;
    }
    return parsedMeta;
};

const parseToCase = async ([heading, meta, ...nodes]: Content[]): Promise<PlayCase | null> => {
    if (heading.type !== 'heading' || heading.depth !== 2) {
        return null;
    }

    const replCodeBlock = findReplCodeBlock(nodes);

    if (!replCodeBlock) {
        return null;
    }

    const description = stringifyNodesToMarkdown(nodes.filter(v => v !== replCodeBlock));
    const metaInfo = await extractMeta(meta);
    return {
        name: (heading.children[0] as Text).value,
        description: description.trim(),
        code: (replCodeBlock as Code).value,
        ...metaInfo,
    };
};

interface ParseContext {
    saved: Content[][];
    workingInProgress: Content[];
}

export const splitToCaseNodes = (markdown: string): Content[][] => {
    const root = parser.parse(markdown);
    const {saved, workingInProgress} = root.children.reduce(
        (context, node) => {
            // 每个二级标题是一个用例
            if (node.type === 'heading' && node.depth === 2) {
                context.saved.push(context.workingInProgress);
                context.workingInProgress = [node];
            }
            else {
                context.workingInProgress.push(node);
            }
            return context;
        },
        {saved: [], workingInProgress: []} as ParseContext
    );
    return [...saved, workingInProgress];
};

export const parseMarkdownToCases = async (markdown: string): Promise<PlayCase[]> => {
    if (!markdown) {
        return [];
    }

    const nodes = splitToCaseNodes(markdown);
    const cases = await pMap(nodes, parseToCase);
    return reject(isNil, cases);
};

export const serializeCaseToMarkdown = (caseToSerialize: PlayCase): string => {
    const description = caseToSerialize.description.trim();
    const lines = [
        `## ${caseToSerialize.name.trim()}`,
        '',
        `- Create: ${caseToSerialize.createAt} (${caseToSerialize.createBy})`,
        `- Run: ${caseToSerialize.lastRunAt} (${caseToSerialize.lastRunBy})`,
    ];
    if (description) {
        lines.push('', description);
    }
    lines.push('', '```jsx', caseToSerialize.code.trim(), '```');
    return lines.join('\n');
};

const isMatchCaseName = (nodes: Content[], name: string): boolean => {
    const [heading] = nodes;
    return heading.type === 'heading' && heading.depth === 2 && (heading.children[0] as Text).value === name;
};

export const replaceLastRun = async (markdown: string, caseName: string, time: string, user: string) => {
    const nodes = splitToCaseNodes(markdown);
    const nodesToUpdate = nodes.find(v => isMatchCaseName(v, caseName));
    const caseToUpdate = nodesToUpdate ? await parseToCase(nodesToUpdate) : null;

    if (!caseToUpdate || !nodesToUpdate) {
        throw new Error(`Cannot find a case named ${caseName}`);
    }


    const mayBeMetaNode = nodesToUpdate[1];
    const newMetaContent = [
        `- Create: ${caseToUpdate.createAt} (${caseToUpdate.createBy})`,
        `- Run: ${time} (${user})`,
    ];

    if (mayBeMetaNode.type === 'list') {
        const start = mayBeMetaNode?.position?.start.offset;
        const end = mayBeMetaNode?.position?.end.offset;
        return markdown.slice(0, start) + newMetaContent.join('\n') + markdown.slice(end);
    }

    const headingEnd = nodesToUpdate[0].position?.end.offset;

    if (!headingEnd) {
        throw new Error(`Cannot find a place to insert meta to case ${caseName}`);
    }

    return markdown.slice(0, headingEnd) + '\n\n' + newMetaContent.join('\n') + '\n' + markdown.slice(headingEnd + 1);
};

export const replaceCodeBlockForCase = (markdown: string, caseName: string, newCode: string) => {
    const nodes = splitToCaseNodes(markdown);
    const nodesToUpdate = nodes.find(v => isMatchCaseName(v, caseName));

    if (!nodesToUpdate) {
        throw new Error(`Cannot find a case named ${caseName}`);
    }

    const replCodeBlock = findReplCodeBlock(nodesToUpdate);
    const start = replCodeBlock?.position?.start.offset;
    const end = replCodeBlock?.position?.end.offset;

    if (!start || !end) {
        throw new Error(`Cannot find code block in case named ${caseName}`);
    }

    const newCodeBlockContent = [
        '```jsx',
        newCode.trim(),
        '```',
    ];

    return markdown.slice(0, start) + newCodeBlockContent.join('\n') + markdown.slice(end);
};
