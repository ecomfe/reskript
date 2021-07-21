import childProcess from 'child_process';
import os from 'os';

export const currentUserName = (cwd?: string) => {
    try {
        const gitUserName = childProcess.execSync('git config --get user.name', {cwd, encoding: 'utf-8'}).trim();
        return gitUserName || os.userInfo().username;
    }
    catch {
        return os.userInfo().username;
    }
};
