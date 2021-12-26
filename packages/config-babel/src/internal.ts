import type {TransformOptions} from '@babel/core';
import type {BabelConfigOptions} from './interface.js';
import getParseOnlyBabelConfigFilled from './parseOnly.js';
import getTransformBabelConfigFilled from './transformMinimal.js';
import {fillBabelConfigOptions} from './utils.js';

export type {BabelConfigOptions};

export const getParseOnlyBabelConfig = (options?: BabelConfigOptions): TransformOptions => {
    return getParseOnlyBabelConfigFilled(fillBabelConfigOptions(options));
};

export const getTransformBabelConfig = (input?: BabelConfigOptions): TransformOptions => {
    return getTransformBabelConfigFilled(fillBabelConfigOptions(input));
};

