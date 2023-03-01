import config from './config.js';
import dependency from './dependency.js';
import entry from './entry.js';

export const run = async (cwd: string) => {
    await dependency(cwd);
    await config(cwd);
    await entry(cwd);
};
