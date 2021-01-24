import {eslint, stylelint} from './rules';

export const getScriptLintConfig = (): {[key: string]: any} => ({...eslint});

export const getStyleLintConfig = (): {[key: string]: any} => ({...stylelint});
