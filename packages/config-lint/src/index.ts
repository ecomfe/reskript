import path from 'path';
import fs from 'fs';
import {eslint, stylelint} from './rules';

export const getScriptLintConfig = (): Record<string, any> => ({...eslint});

export const getStyleLintConfig = (): Record<string, any> => ({...stylelint});

interface BaseConfigOptions {
    cwd: string;
}

const CUSTOM_SCRIPT_LINT_CONFIG_FILES = [
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.mjs',
    '.eslintrc.json',
];

const hasCustomScriptLintConfig = (cwd: string) => {
    const exists = (file: string) => fs.existsSync(path.join(cwd, file));
    return CUSTOM_SCRIPT_LINT_CONFIG_FILES.some(exists);
};

export const getScriptLintBaseConfig = ({cwd}: BaseConfigOptions): Record<string, any> | undefined => {
    return hasCustomScriptLintConfig(cwd) ? undefined : getScriptLintConfig();
};

const CUSTOM_STYLE_LINT_CONFIG_FILE = 'stylelint.config.js';

const hasCustomStyleLintConfig = (cwd: string) => fs.existsSync(path.join(cwd, CUSTOM_STYLE_LINT_CONFIG_FILE));

interface BaseConfigOptions {
    cwd: string;
}

export const getStyleLintBaseConfig = ({cwd}: BaseConfigOptions): Record<string, any> | undefined => {
    return hasCustomStyleLintConfig(cwd) ? undefined : getStyleLintConfig();
};
