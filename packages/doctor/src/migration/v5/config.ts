import {warn} from '../logger.js';
import {importClientSettings} from '../utils.js';

// eslint-disable-next-line complexity
export default async (cwd: string) => {
    const settings = await importClientSettings(cwd);

    if (!settings) {
        return;
    }

    if (settings.build?.finalize?.length === 3) {
        warn(
            'some loaders provided via internals argument of build.finalize are deprecated',
            'see: https://reskript.dev/docs/migration/v5#配置变更'
        );
    }
};
