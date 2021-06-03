import path from 'path';
import {Configuration} from 'webpack';
import {omitBy} from 'lodash';
import {sync as findUp} from 'find-up';
import {ConfigurationFactory} from '../interface';

const factory: ConfigurationFactory = entry => {
    const {cwd} = entry;
    const nodeModule = (...segments: string[]): string => {
        const name = path.join('node_modules', ...segments);
        return findUp(name, {cwd}) ?? '';
    };
    const alias = {
        react$: nodeModule('react', 'umd', 'react.production.min.js'),
        'react-dom$': nodeModule('react-dom', 'umd', 'react-dom.production.min.js'),
        'react-redux$': nodeModule('react-redux', 'dist', 'react-redux.min.js'),
        redux$: nodeModule('redux', 'dist', 'redux.min.js'),
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
