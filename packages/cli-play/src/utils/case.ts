import {findLast, compact} from 'lodash';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import stringify from 'remark-stringify';
import unified from 'unified';
import {Content, Root, Text, Code} from 'mdast';
import {PlayCase} from '../interface';

const parser = unified().use(parse).use(gfm);
const serializer = unified().use(stringify);

const stringifyNodesToMarkdown = (nodes: Content[]): string => {
    const root: Root = {
        type: 'root',
        children: nodes,
    };
    return serializer.stringify(root);
};

const findReplCodeBlock = (nodes: Content[]) => findLast(nodes, v => v.type === 'code' && v.lang === 'jsx');

const parseToCase = ([heading, ...nodes]: Content[]): PlayCase | null => {
    if (heading.type !== 'heading' || heading.depth !== 2) {
        return null;
    }

    const replCodeBlock = findReplCodeBlock(nodes);

    if (!replCodeBlock) {
        return null;
    }

    const description = stringifyNodesToMarkdown(nodes.filter(v => v !== replCodeBlock));
    return {
        name: (heading.children[0] as Text).value,
        description: description.trim(),
        code: (replCodeBlock as Code).value,
    };
};

interface ParseContext {
    saved: Content[][];
    workingInProgress: Content[];
}

export const splitToCaseNodes = (markdown: string): Content[][] => {
    const root = parser.parse(markdown) as Root;
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

export const parseMarkdownToCases = (markdown: string): PlayCase[] => {
    const nodes = splitToCaseNodes(markdown);
    return compact(nodes.map(parseToCase));
};

export const serializeCaseToMarkdown = (caseToSerialize: PlayCase): string => {
    const description = caseToSerialize.description.trim();
    const lines = [];
    lines.push(`## ${caseToSerialize.name.trim()}`);
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
