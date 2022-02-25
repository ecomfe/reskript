import {OutputAsset, OutputChunk, RollupOutput} from 'rollup';
import {Asset, drawAssetReport} from '../utils.js';

export const drawBuildReport = (outputs: RollupOutput[]) => {
    const toAsset = (value: OutputAsset | OutputChunk): Asset => {
        return {
            name: value.fileName,
            size: Buffer.byteLength(value.type === 'asset' ? value.source : value.code),
            initial: value.type === 'chunk' && value.isEntry,
        };
    };
    const assets = outputs.flatMap(v => v.output.map(toAsset));
    drawAssetReport(assets);
};
