import {UserOptions} from '../interface.js';
import copy from './copy.js';
import install from './install.js';
import husky from './husky.js';

export default async (cwd: string, options: UserOptions) => {
    await copy(cwd, options);
    await install(cwd, options);
    await husky(cwd, options);
};
