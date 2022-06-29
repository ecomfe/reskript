// 这个要给低版本Node用，不能写`node:url`
import {fileURLToPath} from 'url';
import resolveCore from 'resolve';
import caller from 'caller';

export const resolveSync = (id: string) => {
    const callerUrl = caller();
    const callerPath = callerUrl.startsWith('file://') ? fileURLToPath(callerUrl) : callerUrl;
    return resolveCore.sync(id, {basedir: callerPath});
};
