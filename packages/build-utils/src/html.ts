const ensureHeadElement = (html: string) => {
    // `<head>`是不能省的，如果没了就会把标签解析到`<body>`里去，所以要提前准备一个
    const htmlRegex = /(<html[^>]*>)/i;

    if (/(<\/head\s*>)/i.test(html)) {
        return html;
    }

    if (htmlRegex.test(html)) {
        return html.replace(htmlRegex, match => match + '<head></head>');
    }

    return '<head></head>' + html;
};

const injectHeadStart = (html: string, content?: string) => {
    if (!content) {
        return html;
    }

    return html.replace(/(<head\s*>)/i, match => match + content);
};

const injectHeadEnd = (html: string, content?: string) => {
    if (!content) {
        return html;
    }

    return html.replace(/(<\/head\s*>)/i, match => content + match);
};

const injectBodyStart = (html: string, content?: string) => {
    if (!content) {
        return html;
    }

    const regex = /(<body\s*>)/i;

    if (regex.test(html)) {
        return html.replace(regex, match => match + content);
    }
    else {
        // 如果没有`<body>`标签，要找`</head>`并插在它后面
        return html.replace(/(<\/head\s*>)/i, match => match + content);
    }
};

const injectBodyEnd = (html: string, content?: string) => {
    if (!content) {
        return html;
    }

    const htmlRegex = /(<\/html\s*>)/i;
    const bodyRegex = /(<\/body\s*>)/i;

    if (bodyRegex.test(html)) {
        return html.replace(bodyRegex, match => content + match);
    }
    else if (htmlRegex.test(html)) {
        return html.replace(htmlRegex, match => content + match);
    }
    else {
        // 如果没有`<body>`标签，就可以直接在尾巴里追加内容，因为`</body>`是可省略的
        return html + content;
    }
};

interface InjectionOptions {
    headStart?: string;
    headEnd?: string;
    bodyStart?: string;
    bodyEnd?: string;
}

export const injectIntoHtml = (html: string, options: InjectionOptions) => {
    const {headStart, headEnd, bodyStart, bodyEnd} = options;
    const prepared = (headStart || headEnd || bodyStart) ? ensureHeadElement(html) : html;
    return injectHeadStart(
        injectHeadEnd(
            injectBodyStart(
                injectBodyEnd(prepared, bodyEnd),
                bodyStart
            ),
            headEnd
        ),
        headStart
    );
};

interface ServiceWorkerLocation {
    publicPath?: string;
    path: string;
}

export const serviceWorkerRegistryScript = ({publicPath, path}: ServiceWorkerLocation) => {
    const baseUrl = (publicPath && publicPath !== 'auto') ? publicPath : '/';
    return `
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener(
                    'load',
                    function () {
                        navigator.serviceWorker.register('${baseUrl + path}');
                    }
                );
            }
        </script>
    `;
};
