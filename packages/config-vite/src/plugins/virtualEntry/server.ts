import {Plugin} from 'vite';
import history from 'connect-history-api-fallback';
import {createMiddlewareHook} from '@reskript/build-utils';
import {ServerOptions} from './interface.js';

export default function viertualEntryServerPlugin(options: ServerOptions): Plugin {
    const historyOptions = {
        index: `/${options.name}.html`,
        disableDotRule: true,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    };

    return {
        name: 'reskript:virtual-entry-server',
        enforce: 'pre',
        configureServer(server) {
            const before = createMiddlewareHook();
            const after = createMiddlewareHook();
            options.customizeMiddleware({before, after});
            before.items().forEach(v => server.middlewares.use(v.path, v.middleware));
            // @ts-expect-error
            server.middlewares.use(history(historyOptions));
            server.middlewares.use(
                `/${options.name}.html`,
                async (req, res) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(options.content);
                }
            );
            after.items().forEach(v => server.middlewares.use(v.path, v.middleware));
        },
    };
}
