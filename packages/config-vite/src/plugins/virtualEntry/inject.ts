import path from 'node:path';
// @ts-expect-error
import dedent from 'dedent';
import {injectIntoHtml} from '@reskript/build-utils';
import {ListenOptions} from './interface.js';

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

const entryScript = (entry: string) => `<script type="module" src="/${entry}"></script>`;

interface Options extends ListenOptions {
    root: string;
    devElements: boolean;
    favicon?: string;
    entry: string;
}

export default (html: string, {devElements, favicon, entry, root, ...listen}: Options) => {
    const head = [
        favicon ? faviconLink(favicon.startsWith('/') ? path.relative(root, favicon) : favicon) : '',
        devElements ? reactRefreshScript(listen) : '',
        devElements ? viteClientScript(listen) : '',
    ];
    const options = {
        headEnd: head.filter(v => !!v).join('\n'),
        bodyEnd: entryScript(entry),
    };
    return injectIntoHtml(html, options);
};
