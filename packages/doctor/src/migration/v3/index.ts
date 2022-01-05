import dependency from './dependency';
import config from './config';

export const run = async (cwd: string) => {
    await dependency(cwd);
    await config(cwd);
};
