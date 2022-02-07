import dependency from './dependency.js';
import config from './config.js';

export const run = async (cwd: string) => {
    await dependency(cwd);
    await config(cwd);
};
