import {Plugin} from 'vite';
import {PortalApplication} from '@reskript/portal';

export interface PortalOptions {
    app: PortalApplication;
}

export default function portalPlugin(options: PortalOptions): Plugin {
    return {
        name: 'reskript:portal',
        enforce: 'pre',
        configureServer(server) {
            server.middlewares.use('/__skr__', options.app);
        },
    };
}
