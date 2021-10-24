import path from 'path';
import ConsoleTable, {Column} from 'tty-table';
import chalk, {ForegroundColor} from 'chalk';
import {Stats} from 'webpack';
import {isEmpty, difference, flatMap, uniqBy, sortBy, max} from 'lodash';
import {logger} from '@reskript/core';
import {ProjectSettings} from '@reskript/settings';
import {WebpackCompileAsset} from './interface';

const printableValue = (value: any): string => {
    if (typeof value === 'boolean') {
        return value ? chalk.green('✓') : chalk.red('✕');
    }

    return value.toString();
};

export const drawFeatureMatrix = (projectSettings: ProjectSettings, only?: string): void => {
    const buildTargets = only
        ? [only]
        : difference(Object.keys(projectSettings.featureMatrix), projectSettings.build.excludeFeatures);
    const headers: Column[] = [
        {value: '', align: 'left'},
        ...buildTargets.map(target => ({value: target})),
    ];
    const featureNames = Object.keys(Object.values(projectSettings.featureMatrix)[0]);

    if (isEmpty(featureNames)) {
        return;
    }

    const nameToValues = (name: string): string[] => [
        name,
        ...buildTargets.map(target => projectSettings.featureMatrix[target][name]).map(printableValue),
    ];
    const rows = featureNames.map(nameToValues);
    const table = new ConsoleTable(headers, rows);

    logger.log(table.render());
};


// eslint-disable-next-line complexity
const getExtensionConfig = (extension: string): {order: number, color: typeof ForegroundColor} => {
    switch (extension) {
        case '.htm':
        case '.html':
            return {order: 0, color: 'green'};
        case '.js':
        case '.jsx':
        case '.es':
        case '.mjs':
            return {order: 1, color: 'green'};
        case '.map':
            return {order: 3, color: 'gray'};
        default:
            return {order: 2, color: 'white'};
    }
};

const extractBuildInfo = (stats: Stats) => {
    const {children = []} = stats.toJson('normal');
    const entrypoints = flatMap(children, child => Object.values(child?.entrypoints ?? {}));
    const initialChunks = flatMap(entrypoints, entry => entry.chunks);
    const assets = flatMap(children.map(child => child.assets ?? [])) as WebpackCompileAsset[];
    return {initialChunks, assets};
};

export const drawBuildReport = (stats: Stats[]): void => {
    const info = flatMap(stats, extractBuildInfo);
    const initialChunks = new Set(flatMap(info, info => info.initialChunks));
    const assets = uniqBy(flatMap(info, info => info.assets), a => a.name);
    const toTemplateData = (asset: WebpackCompileAsset) => {
        const config = getExtensionConfig(path.extname(asset.name));
        return {
            name: asset.name,
            color: config.color,
            typeOrder: config.order,
            size: (asset.size / 1024).toFixed(2) + 'KB',
            sizeInBytes: asset.size,
            indicator: asset.chunks.some(chunk => initialChunks.has(chunk)) ? 'initial' : '',
        };
    };
    const templateSegments = sortBy(
        assets.map(toTemplateData),
        [
            data => data.typeOrder,
            data => (data.indicator === 'initial' ? 0 : 1),
            asset => asset.name,
        ]
    );
    const maxNameLength = max(templateSegments.map(segment => segment.name.length)) ?? 0;
    const maxSizeLength = max(templateSegments.map(segment => segment.size.length)) ?? 0;
    for (const {color, name, size, indicator} of templateSegments) {
        logger.log(chalk[color](`${name.padStart(maxNameLength)} ${size.padEnd(maxSizeLength)} ${indicator}`));
    }
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
