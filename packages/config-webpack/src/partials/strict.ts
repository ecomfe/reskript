import {Configuration} from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import {StrictOptions} from '../interface';

export default (options: StrictOptions = {}): Configuration => {
    const {
        disableRequireExtension = false,
        caseSensitiveModuleSource = false,
    } = options;

    return {
        module: {
            parser: {
                javascript: {
                    requireContext: disableRequireExtension,
                    requireEnsure: disableRequireExtension,
                    requireInclude: disableRequireExtension,
                },
            },
        },
        plugins: caseSensitiveModuleSource ? [new CaseSensitivePathsPlugin() as any] : [],
    };
};
