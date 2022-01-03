import dependency from './dependency';

export const run = async (cwd: string) => {
    await dependency(cwd);
};
