import {findLast} from 'lodash';
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

const parseToCase = ([heading, ...nodes]: Content[]): PlayCase | null => {
    if (heading.type !== 'heading' || heading.depth !== 2) {
        return null;
    }

    const replCodeBlock = findLast(nodes, v => v.type === 'code' && v.lang === 'jsx');

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
    cases: PlayCase[];
    workingInProgress: Content[];
}

export const parseMarkdownToCases = (markdown: string) => {
    const root = parser.parse(markdown) as Root;
    const {cases, workingInProgress} = root.children.reduce(
        (context, node) => {
            // 每个二级标题是一个用例
            if (node.type === 'heading' && node.depth === 2) {
                const currentCase = parseToCase(context.workingInProgress);
                if (currentCase) {
                    context.cases.push(currentCase);
                }
                context.workingInProgress = [node];
            }
            else {
                context.workingInProgress.push(node);
            }
            return context;
        },
        {cases: [], workingInProgress: []} as ParseContext
    );
    const lastCase = parseToCase(workingInProgress);
    return lastCase ? [...cases, lastCase] : cases;
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
