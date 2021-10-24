import path from 'path';

export const resolveComponentFileName = (componentModulePath: string): string => {
    const file = path.basename(componentModulePath, path.extname(componentModulePath));
    return file;
};

export const resolveComponentName = (componentModulePath: string): string => {
    const filename = resolveComponentFileName(componentModulePath);

    if (/[A-Z]/.test(filename)) {
        return filename;
    }

    return path.basename(path.dirname(componentModulePath));
};

export const resolveCasePath = (componentModulePath: string): string => {
    const directory = path.dirname(componentModulePath);
    const filename = resolveComponentFileName(componentModulePath);
    const caseFileName = path.join(directory, '__repl__', `${filename}.case.md`);
    return caseFileName;
};

export const resolveLocalConfigurationPath = (componentModulePath: string): string => {
    const directory = path.dirname(componentModulePath);
    const filename = resolveComponentFileName(componentModulePath);
    return path.join(directory, '__repl__', `${filename}.play.js`);
};
