import babelJest from 'babel-jest';
import {BabelConfigOptions, getTransformBabelConfig} from '@reskript/config-babel';

const getBabelJestTransformer = () => {
    if (!babelJest.createTransformer) {
        throw new Error('Invalid babel jest without createTransformer function');
    }

    const babelConfigOptions: BabelConfigOptions = {
        mode: 'development',
        polyfill: true,
        hot: false,
        hostType: 'library',
        modules: 'commonjs',
    };

    return babelJest.createTransformer(getTransformBabelConfig(babelConfigOptions));
};

// jest transformer doesn't support object yet: https://github.com/facebook/jest/issues/7015
// and need to be file string https://github.com/facebook/jest/blob/master/packages/jest-config/src/normalize.ts#L147
// fixed process.cwd as babel config
export = getBabelJestTransformer();
