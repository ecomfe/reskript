import path from 'node:path';
import fs from 'node:fs/promises';
import {warn, tip} from '../logger.js';
import {importClientSettings} from '../utils.js';

// eslint-disable-next-line complexity
export default async (cwd: string) => {
    const settings = await importClientSettings(cwd);

    if (!settings) {
        return;
    }

    warn(
        'reskript config has been changed to .ts (recommended) or .mjs and is written in ESM',
        'see: https://reskript.dev/docs/migration/v4#项目配置文件'
    );

    if (settings.build?.finalize?.length === 3) {
        warn(
            'all functions in internals argument of build.finalize has been changed to async',
            'see: https://reskript.dev/docs/migration/v4#finalize函数异步化'
        );
    }

    const settingsContent = await fs.readFile(path.join(cwd, 'reskript.config.js'), 'utf-8');

    if (settingsContent.includes('postCSS') || settingsContent.includes('postCSSModules')) {
        warn(
            'loader postCSS and postCSSModules has been renamed to postcss',
            'see: https://reskript.dev/docs/migration/v4#loader命名修改'
        );
    }

    if (settingsContent.includes('from \'@reskript/config-webpack\'')) {
        warn(
            '@reskript/config-webpack no longer exports loaders and rules, use child modules instead',
            'see: https://reskript.dev/docs/migration/v4#config-webpack导出变更'
        );
    }

    if (settingsContent.includes('require(')) {
        warn(
            'found require() call in you reskript.config.js, which is not allowed by ESM',
            'see: https://reskript.dev/docs/migration/v4#项目配置文件'
        );
    }

    if (settingsContent.includes('__dirname' || settingsContent.includes('__filename'))) {
        warn(
            'found __dirname or __filename in you reskript.config.js, which is not allowed by ESM',
            'see: https://reskript.dev/docs/migration/v4#项目配置文件'
        );
    }

    if (settingsContent.includes('require.resolve(')) {
        warn(
            'found require.resolve() call in you reskript.config.js, which is not allowed by ESM',
            'see: https://reskript.dev/docs/migration/v4#项目配置文件'
        );
    }

    if (typeof settings.build?.finalize === 'function') {
        tip(
            'build.finalize in reskript.config.js can be async now',
            'see: https://reskript.dev/docs/migration/v4#finalize函数异步化'
        );
    }

    if (typeof settings.devServer?.finalize === 'function') {
        tip(
            'devServer.finalize in reskript.config.js can be async now',
            'see: https://reskript.dev/docs/migration/v4#finalize函数异步化'
        );
    }

    if (typeof settings.build?.script?.finalize === 'function') {
        tip(
            'build.script.finalize in reskript.config.js can be async now',
            'see: https://reskript.dev/docs/migration/v4#finalize函数异步化'
        );
    }
};
