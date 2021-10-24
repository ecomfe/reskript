import path from 'path';
import {existsSync} from 'fs';
import {warn, tip} from './logger';

export default async (cwd: string) => {
    const settingsLocation = path.join(cwd, 'reskript.config.js');

    if (!existsSync(settingsLocation)) {
        return;
    }

    const {default: settings} = await import(settingsLocation);

    if (settings.build?.hasOwnProperty('defaultImportOptimization')) {
        warn(
            'build.defaultImportOptimization in reskript.config.js is deprecated',
            'see: https://ecomfe.github.io/reskript/docs/migration/v2#build相关'
        );
    }

    if (typeof settings.devServer?.hot === 'string') {
        warn(
            'devServer.hot in reskript.config.js has changed to boolean',
            'see: https://ecomfe.github.io/reskript/docs/migration/v2#devServer相关'
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
            'see: https://ecomfe.github.io/reskript/docs/migration/v2#play相关'
        );
    }

    if (settings.play?.injectResources) {
        warn(
            'play.injectResources in reskript.config.js is deprecated and replaced by defaultGlobalSetup',
            'see: https://ecomfe.github.io/reskript/docs/migration/v2#play相关'
        );
    }
};
