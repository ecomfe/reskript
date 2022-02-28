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

const appContainer = (id: string) => `<div id="${id}"></div>`;

interface Options extends ListenOptions {
    root: string;
    devElements: boolean;
    entry: string;
    favicon?: string;
    appContainerId?: string;
}

export default (html: string, {devElements, favicon, entry, root, appContainerId, ...listen}: Options) => {
    const head = [
        favicon ? faviconLink(favicon.startsWith('/') ? path.relative(root, favicon) : favicon) : '',
        devElements ? reactRefreshScript(listen) : '',
        devElements ? viteClientScript(listen) : '',
    ];
    const body = [
        entryScript(entry),
        appContainerId ? appContainer(appContainerId) : '',
    ];
    const options = {
        headEnd: head.filter(v => !!v).join('\n'),
        bodyEnd: body.filter(v => !!v).join('\n'),
    };
    return injectIntoHtml(html, options);
};
