import childProcess from 'child_process';
import os from 'os';
import {promisify} from 'util';

const exec = promisify(childProcess.exec);

export const currentUserName = async (cwd?: string): Promise<string> => {
    try {
        const output = await exec('git config --get user.name', {cwd, encoding: 'utf-8'});
        const gitUserName = output.stdout.trim();
        return gitUserName || os.userInfo().username;
    }
    catch {
        return os.userInfo().username;
    }
};
