import path from 'path';
import {existsSync} from 'fs';
import {Configuration} from 'webpack';
import {compact} from '@reskript/core';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {StrictOptions} from '../interface.js';

export default (options: StrictOptions = {}, cwd: string): Configuration => {
    const {
        disableRequireExtension = false,
        caseSensitiveModuleSource = false,
        typeCheck = false,
    } = options;

    const plugins = [
        caseSensitiveModuleSource && new CaseSensitivePathsPlugin() as any,
        typeCheck && existsSync(path.join(cwd, 'tsconfig.json')) && new ForkTsCheckerWebpackPlugin(),
    ];

    return {
        module: {
            parser: {
                javascript: {
                    requireContext: !disableRequireExtension,
                    requireEnsure: !disableRequireExtension,
                    requireInclude: !disableRequireExtension,
                },
            },
        },
        plugins: compact(plugins),
    };
};
