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
        // 在`dev`模式下，根据`--host`参数不同，这里可能需要绝对路径（比如配合qiankun这种跨域加载），
        // 但在`build`下，一定是固定的路径，不然会找不到资源
        entryScript(entry, devElements ? publicPath : '/'),
        appContainerId ? appContainer(appContainerId) : '',
    ];
    const options = {
        headEnd: head.filter(v => !!v).join('\n'),
        bodyEnd: body.filter(v => !!v).join('\n'),
    };
    return injectIntoHtml(html, options);
};
