import dependency from './dependency.js';
import config from './config.js';
import script from './script.js';
import entry from './entry.js';
import svg from './svg.js';

export const run = async (cwd: string) => {
    await dependency(cwd);
    await config(cwd);
    await script(cwd);
    await entry(cwd);
    await svg(cwd);
};
