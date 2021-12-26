import {warn, tip} from '../logger.js';
import {importClientSettings} from '../utils.js';

export default async (cwd: string) => {
    const settings = await importClientSettings(cwd);

    if (typeof settings.devServer?.https === 'boolean') {
        warn(
            'devServer.https in reskript.config.js is no longer of type boolean',
            'see: https://reskript.vercel.app/docs/migration/v3#devServer相关'
        );
    }

    if (typeof settings.devServer?.hot === 'string') {
        warn(
            'devServer.hot in reskript.config.js has changed to boolean',
            'see: https://reskript.vercel.app/docs/migration/v2#devServer相关'
        );
    }

    if (typeof settings.devServer?.finalize === 'function') {
        tip(
            'found devServer.finalize in reskript.config.js, this can be affected by the official release',
            'see: https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md'
        );
    }

    if (settings.play?.wrapper) {
        warn(
            'play.wrapper in reskript.config.js is deprecated and replaced by defaultGlobalSetup',
            'see: https://reskript.vercel.app/docs/migration/v2#play相关'
        );
    }

    if (settings.play?.injectResources) {
        warn(
            'play.injectResources in reskript.config.js is deprecated and replaced by defaultGlobalSetup',
            'see: https://reskript.vercel.app/docs/migration/v2#play相关'
        );
    }
};
