import {UserOptions} from '../interface';
import copy from './copy';
import install from './install';
import husky from './husky';

export default async (cwd: string, options: UserOptions) => {
    await copy(cwd, options);
    await install(cwd, options);
    await husky(cwd);
};
