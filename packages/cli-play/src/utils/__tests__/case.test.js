import dedent from 'dedent';
import {parseMarkdownToCases} from '../case';

test('parse to cases', () => {
    const markdown = dedent`
        # Loading reSKRipt Play Case

        ## 包括头部

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
    const cases = parseMarkdownToCases(markdown);
    expect(cases.length).toBe(2);
    expect(cases[0].name).toBe('包括头部');
    expect(cases[1].description.includes('POST /api/users')).toBe(true);
    expect(cases[1].code.includes('lazy={500}')).toBe(true);
});
