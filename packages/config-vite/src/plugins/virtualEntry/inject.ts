// @ts-expect-error
import dedent from 'dedent';
import {ListenOptions} from './interface.js';

const injectAtBodyEnd = (html: string, elements: string[]) => {
    if (!elements.length) {
        return html;
    }

    const regex = /(<\/body\s*>)/i;
    if (regex.test(html)) {
        return html.replace(regex, match => elements.join('\n') + match);
    }
    else {
        // 如果没有`<body>`标签，就可以直接在尾巴里追加内容，因为`</body>`是可省略的
        return html + elements.join('\n');
    }
};

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

const injectAtHeadEnd = (html: string, elements: string[]) => {
    if (!elements.length) {
        return html;
    }

    return html.replace(/(<\/head\s*>)/i, match => elements.join('\n') + match);
};

interface InjectionOptions {
    head?: string[];
    body?: string[];
}

const inject = (html: string, options: InjectionOptions) => {
    const {head = [], body = []} = options;
    const bodyInjected = injectAtBodyEnd(html, body);

    if (head.length) {
        return injectAtHeadEnd(ensureHeadElement(bodyInjected), head);
    }

    return bodyInjected;
};

const reactRefreshScript = ({protocol, host, port}: ListenOptions) => dedent`
    <script type="module">
        import RefreshRuntime from '${protocol}://${host}:${port}/@react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
`;

const viteClientScript = ({protocol, host, port}: ListenOptions) => {
    return `<script type="module" src="${protocol}://${host}:${port}/@vite/client"></script>`;
};

const faviconLink = (favicon: string) => `<link rel="icon" href="${favicon}">`;

const entryScript = (entry: string) => `<script type="module" src="${entry}"></script>`;

interface Options extends ListenOptions {
    devElements: boolean;
    favicon?: string;
    entry: string;
}

export default (html: string, {devElements, favicon, entry, ...listen}: Options) => {
    const head = [
        favicon ? faviconLink(favicon) : '',
        devElements ? reactRefreshScript(listen) : '',
        devElements ? viteClientScript(listen) : '',
    ];
    const options = {
        head: head.filter(v => !!v),
        body: [
            entryScript(entry),
        ],
    };
    return inject(html, options);
};
