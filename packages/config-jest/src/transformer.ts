import {createTransformer} from 'babel-jest';
import {BabelConfigOptions, getTransformBabelConfig} from '@reskript/config-babel';

const getBabelJestTransformer = () => {
    const babelConfigOptions: BabelConfigOptions = {
        mode: 'development',
        polyfill: true,
        hot: 'none',
        hostType: 'library',
        modules: 'commonjs',
    };

    return createTransformer(getTransformBabelConfig(babelConfigOptions));
};
// jest transformer doesn't support object yet: https://github.com/facebook/jest/issues/7015
// and need to be file string https://github.com/facebook/jest/blob/master/packages/jest-config/src/normalize.ts#L147
// fixed process.cwd as babel config
export = getBabelJestTransformer();
