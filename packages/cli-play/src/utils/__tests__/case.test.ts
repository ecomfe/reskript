import {expect, test} from 'vitest';
import dedent from 'dedent';
import {parseMarkdownToCases, replaceCodeBlockForCase} from '../case';

const markdown = dedent`
    # Loading reSKRipt Play Case

    ## 包括头部

    - Create: 2021-01-01 00:00:00 (otakustay)
    - Run: 2021-02-02 11:11:11 (otakustay)

    这个示例包含了头部，重点看一下动画效果会不会把头部的文字挡住。

    \`\`\`jsx
    export default function Repl() {
        return (
            <>
                <I.HeadingRow text="Hello" />
                <Loading />
            </>
        );
    };
    \`\`\`

    ## 延迟显示

    如果像这样发请求：

    \`\`\`text
    POST /api/users
    \`\`\`

    确认前0.5s不会显示出来。

    \`\`\`jsx
    export default function Repl() {
        return (
            <Loading lazy={500} />
        );
    };
    \`\`\`
`;

test('parse to cases', async () => {
    const cases = await parseMarkdownToCases(markdown);
    expect(cases.length).toBe(2);
    expect(cases[0].name).toBe('包括头部');
    expect(cases[0].createAt).toBe('2021-01-01 00:00:00');
    expect(cases[0].createBy).toBe('otakustay');
    expect(cases[0].lastRunAt).toBe('2021-02-02 11:11:11');
    expect(cases[0].lastRunBy).toBe('otakustay');
    expect(cases[1].description.includes('POST /api/users')).toBe(true);
    expect(cases[1].code.includes('lazy={500}')).toBe(true);
    expect(cases[1].createAt).toBeTruthy();
    expect(cases[1].createBy).toBeTruthy();
    expect(cases[1].lastRunAt).toBeTruthy();
    expect(cases[1].lastRunBy).toBeTruthy();
});

test('replace code block', () => {
    const replaced = replaceCodeBlockForCase(markdown, '包括头部', 'Replaced Code');
    expect(replaced.includes('```jsx\nReplaced Code\n```')).toBe(true);
});
