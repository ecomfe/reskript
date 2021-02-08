import {eslint, stylelint} from './rules';

export const getScriptLintConfig = (): Record<string, any> => ({...eslint});

export const getStyleLintConfig = (): Record<string, any> => ({...stylelint});
