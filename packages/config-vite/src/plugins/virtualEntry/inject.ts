import path from 'node:path';
// @ts-expect-error
import dedent from 'dedent';
import {injectIntoHtml} from '@reskript/build-utils';

const reactRefreshScript = (publicPath: string) => dedent`
    <script type="module">
        import RefreshRuntime from '${publicPath}@react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
`;

const viteClientScript = (publicPath: string) => {
    return `<script type="module" src="${publicPath}@vite/client"></script>`;
};

const faviconLink = (favicon: string) => `<link rel="icon" href="${favicon}">`;

const entryScript = (entry: string, publicPath: string) => {
    const url = publicPath + entry;
    return `<script type="module" src="${url}"></script>`;
};

const appContainer = (id: string) => `<div id="${id}"></div>`;

interface Options {
    root: string;
    devElements: boolean;
    entry: string;
    publicPath: string;
    favicon?: string;
    appContainerId?: string;
}

export default (html: string, {devElements, favicon, entry, root, appContainerId, publicPath}: Options) => {
    const head = [
        favicon ? faviconLink(favicon.startsWith('/') ? path.relative(root, favicon) : favicon) : '',
        devElements ? reactRefreshScript(publicPath) : '',
        devElements ? viteClientScript(publicPath) : '',
    ];
    const body = [
        entryScript(entry, publicPath),
        appContainerId ? appContainer(appContainerId) : '',
    ];
    const options = {
        headEnd: head.filter(v => !!v).join('\n'),
        bodyEnd: body.filter(v => !!v).join('\n'),
    };
    return injectIntoHtml(html, options);
};
