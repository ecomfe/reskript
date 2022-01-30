import {fileURLToPath} from 'node:url';
import resolveCore from 'resolve';
// @ts-expect-error
import caller from 'caller';

export const resolveSync = (id: string) => {
    const callerUrl = caller();
    const callerPath = callerUrl.startsWith('file://') ? fileURLToPath(callerUrl) : callerUrl;
    return resolveCore.sync(id, {basedir: callerPath});
};
