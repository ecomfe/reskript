import path from 'path';
import {Configuration} from 'webpack';
import {omitBy} from 'lodash';
import findUp from 'find-up';
import {ConfigurationFactory} from '../interface';

const factory: ConfigurationFactory = async entry => {
    const {cwd} = entry;
    const nodeModule = async (...segments: string[]): Promise<string> => {
        const name = path.join('node_modules', ...segments);
        const module = await findUp(name, {cwd}) ?? '';
        return module;
    };
    const alias = {
        react$: await nodeModule('react', 'umd', 'react.production.min.js'),
        'react-dom$': await nodeModule('react-dom', 'umd', 'react-dom.production.min.js'),
        'react-redux$': await nodeModule('react-redux', 'dist', 'react-redux.min.js'),
        redux$: await nodeModule('redux', 'dist', 'redux.min.js'),
    };

    const config: Configuration = {
        devtool: 'source-map',
        resolve: {
            alias: omitBy(alias, v => !v),
        },
        performance: {
            maxEntrypointSize: Infinity,
            // 最大允许1.5MB的产出，在GZip后大致是250-400KB，在内网下还能接受
            maxAssetSize: 1.5 * 1024 * 1024,
        },
        optimization: {
            removeEmptyChunks: true,
            sideEffects: true,
        },
    };
    return config;
};

export default factory;
