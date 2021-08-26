import dependency from './dependency';
import config from './config';
import script from './script';
import entry from './entry';
import svg from './svg';

export const run = async (cwd: string) => {
    await dependency(cwd);
    await config(cwd);
    await script(cwd);
    await entry(cwd);
    await svg(cwd);
};
