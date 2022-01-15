import path from 'path';
import {Configuration} from 'webpack';
import {findUp} from 'find-up';
import {filter} from 'ramda';
import {ConfigurationFactory} from '../interface.js';

const factory: ConfigurationFactory = async entry => {
    const {cwd} = entry;
    const nodeModule = async (...segments: string[]): Promise<string> => {
        const name = path.join('node_modules', ...segments);
        const module = await findUp(name, {cwd}) ?? '';
        return module;
    };
    const resolvingModules = [
        nodeModule('react', 'umd', 'react.production.min.js'),
        nodeModule('react-dom', 'umd', 'react-dom.production.min.js'),
        nodeModule('react-redux', 'dist', 'react-redux.min.js'),
        nodeModule('redux', 'dist', 'redux.min.js'),
    ] as const;
    const [react, reactDOM, reactRedux, redux] = await Promise.all(resolvingModules);
    const alias = {
        react$: react,
        'react-dom$': reactDOM,
        'react-redux$': reactRedux,
        redux$: redux,
    };

    const config: Configuration = {
        devtool: 'source-map',
        resolve: {
            alias: filter(v => !!v, alias),
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
