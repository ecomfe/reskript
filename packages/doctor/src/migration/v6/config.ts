import {warn} from '../logger.js';
import {importClientSettings} from '../utils.js';

// eslint-disable-next-line @typescript-eslint/ban-types
const finalizeUsesPublicPath = (finalize: Function | undefined) => {
    const content = finalize?.toString() ?? '';
    return content.includes('publicPath') && content.includes('/assets');
};

// eslint-disable-next-line complexity
export default async (cwd: string) => {
    const settings = await importClientSettings(cwd);

    if (!settings) {
        return;
    }

    if (settings.build?.publicPath?.endsWith('/assets') || finalizeUsesPublicPath(settings.build?.finalize)) {
        warn(
            'your publicPath no longer needs to end with "/assets", please remove it from config',
            'see: https://reskript.dev/docs/migration/v6#Webpack产出结构升级'
        );
    }
};
