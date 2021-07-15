import marked from 'marked';
import './index.css';

interface Props {
    content?: string;
}

export default function CaseDescription({content}: Props) {
    if (!content) {
        return <article className="description">未选择用例</article>;
    }

    const html = marked(content);

    // eslint-disable-next-line react/no-danger
    return <article className="description markdown-body" dangerouslySetInnerHTML={{__html: html}} />;
}
