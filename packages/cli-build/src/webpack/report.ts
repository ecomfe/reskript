import {Stats} from 'webpack';
import {logger} from '@reskript/core';
import {drawAssetReport, Asset} from '../utils.js';
import {WebpackCompileAsset} from './interface.js';

const extractBuildInfo = (stats: Stats) => {
    const {children = []} = stats.toJson('normal');
    const entrypoints = children.flatMap(child => Object.values(child?.entrypoints ?? {}));
    const initialChunks = entrypoints.flatMap(entry => entry.chunks);
    const assets = children.map(child => child.assets ?? []).flatMap(v => v) as WebpackCompileAsset[];
    return {initialChunks, assets};
};

export const drawBuildReport = (stats: Stats[]): void => {
    const info = stats.flatMap(extractBuildInfo);
    const initialChunks = new Set(info.flatMap(v => v.initialChunks));
    const toAsset = (value: WebpackCompileAsset): Asset => {
        return {
            name: value.name,
            size: value.size,
            initial: initialChunks.has(value.name),
        };
    };
    const assets = info.flatMap(v => v.assets.map(toAsset));
    drawAssetReport(assets);
};

export interface WebpackResult {
    moduleIdentifier: string;
    moduleName: string;
    message: string;
    moduleId: number;
    stack: string;
}

export const printWebpackResult = (type: 'error' | 'warn', result: WebpackResult): void => {
    const print = type === 'error' ? logger.error : logger.warn;

    logger.lineBreak();
    print(`Module build failed for ${result.moduleName}`);
    print(result.message);
};
