import fs from 'node:fs';
import path from 'node:path';

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

const PLAY_CONFIG_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

export const resolveLocalConfigurationPath = (componentModulePath: string): string | undefined => {
    const directory = path.dirname(componentModulePath);
    const filename = resolveComponentFileName(componentModulePath);
    const files = PLAY_CONFIG_EXTENSIONS.map(v => path.join(directory, '__repl__', `${filename}.play${v}`));
    return files.find(fs.existsSync);
};
