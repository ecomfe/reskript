import path from 'path';
import {Plugin} from 'vite';
// @ts-expect-error
import dedent from 'dedent';
import history from 'connect-history-api-fallback';

interface ListenOptions {
    host: string;
    port: number;
}

const reactRefreshScript = ({host, port}: ListenOptions) => dedent`
    <script type="module">
    import RefreshRuntime from 'http://${host}:${port}/@react-refresh'
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
    </script>
`;

const viteClientScript = ({host, port}: ListenOptions) => dedent`
    <script type="module" src="http://${host}:${port}/@vite/client"></script>
`;

interface EntryOptions extends ListenOptions {
    devElements: boolean;
    entry: string;
    title?: string;
    favicon?: string;
    appContainerId?: string;
}

const entryHtml = (options: EntryOptions) => {
    const {devElements, entry, title, favicon, appContainerId} = options;

    return dedent`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            ${favicon ? `<link rel="icon" type="image/svg+xml" href="${favicon}" />` : ''}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            ${title ? `<title>${title}</title>` : ''}
            ${devElements ? reactRefreshScript(options) : ''}
            ${devElements ? viteClientScript(options) : ''}
        </head>
        <body>
            ${appContainerId ? `<div id="${appContainerId}"></div>` : ''}
            <script type="module" src="${entry}"></script>
        </body>
        </html>
    `;
};

export type Options = Omit<EntryOptions, 'devElements'>;

export default function viertualEntryPlugin(options: Options): Plugin {
    const root = {value: process.cwd()};
    const historyOPtions = {
        index: '/index.html',
        disableDotRule: true,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    };

    return {
        name: 'reskript:virtual-entry',
        enforce: 'pre',
        configResolved(config) {
            root.value = config.root;
        },
        configureServer(server) {
            // @ts-expect-error
            server.middlewares.use(history(historyOPtions));
            server.middlewares.use(
                '/index.html',
                (req, res) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(entryHtml({...options, devElements: true}));
                }
            );
        },
        resolveId(id) {
            if (id === path.join(root.value, 'index.html')) {
                // 此处必须是原路径，因为最后Vite是依赖它来产出具体文件的
                return id;
            }
        },
        load(id) {
            if (id === path.join(root.value, 'index.html')) {
                return entryHtml({...options, devElements: false});
            }
        },
    };
}
