import {UserOptions} from '../interface';
import copy from './copy';
import install from './install';

export default async (cwd: string, options: UserOptions) => {
    await copy(cwd, options);
    await install(cwd, options);
};
