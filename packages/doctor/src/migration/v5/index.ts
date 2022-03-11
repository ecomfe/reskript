import dependency from './dependency.js';
import config from './config.js';
import entry from './entry.js';
import source from './source.js';

export const run = async (cwd: string) => {
    await dependency(cwd);
    await config(cwd);
    await entry(cwd);
    await source(cwd);
};
