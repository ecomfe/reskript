import {marked} from 'marked';
import {PlayCase} from '../../interface.js';
import './index.css';

interface Props {
    currentCase?: PlayCase;
}

export default function CaseDescription({currentCase}: Props) {
    if (!currentCase) {
        return <article className="description">未选择用例</article>;
    }

    const markdown = [
        `## ${currentCase.name}`,
        '',
        `- 创建：${currentCase.createAt} (${currentCase.createBy})`,
        `- 最后执行：${currentCase.lastRunAt} (${currentCase.lastRunBy})`,
        '',
        currentCase.description,
    ];
    const html = marked(markdown.join('\n'));

    // eslint-disable-next-line react/no-danger
    return <article className="description markdown-body" dangerouslySetInnerHTML={{__html: html}} />;
}
