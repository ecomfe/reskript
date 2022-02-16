import path from 'path';
import {Plugin} from 'vite';
import history from 'connect-history-api-fallback';
import {interpolateEntryContent} from '@reskript/build-utils';
import {ListenOptions} from './interface.js';
import injectElements from './inject.js';

export interface VirtualEntryOptions extends ListenOptions {
    name: string;
    content: string;
    entry: string;
    favicon?: string;
    appContainerId?: string;
}

export default function viertualEntryPlugin(options: VirtualEntryOptions): Plugin {
    const root = {value: process.cwd()};
    const historyOPtions = {
        index: `/${options.name}.html`,
        disableDotRule: true,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    };
    const render = (devElements: boolean) => {
        const html = injectElements(options.content, {...options, devElements});
        return interpolateEntryContent(html, process.env);
    };

    return {
        name: 'reskript:virtual-entry',
        enforce: 'pre',
        async configResolved(config) {
            root.value = config.root;
        },
        configureServer(server) {
            // @ts-expect-error
            server.middlewares.use(history(historyOPtions));
            server.middlewares.use(
                `/${options.name}.html`,
                (req, res) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(render(true));
                }
            );
        },
        resolveId(id) {
            if (id === path.join(root.value, `${options.name}.html`)) {
                // 此处必须是原路径，因为最后Vite是依赖它来产出具体文件的
                return id;
            }
        },
        load(id) {
            if (id === path.join(root.value, `${options.name}.html`)) {
                return render(false);
            }
        },
    };
}
