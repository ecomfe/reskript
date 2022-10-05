import path from 'node:path';
import {uniqBy, sortWith, ascend, isEmpty, difference} from 'ramda';
import * as kolorist from 'kolorist';
import {readPackageConfig, logger} from '@reskript/core';
import {BuildCommandLineArgs, BuildEnv, ProjectSettings} from '@reskript/settings';
import {AppEntry, BuildContext, createRuntimeBuildEnv} from '@reskript/build-utils';
import ConsoleTable, {Column} from 'tty-table';

const printableValue = (value: any): string => {
    if (typeof value === 'boolean') {
        return value ? kolorist.green('✓') : kolorist.red('✕');
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

export const validateFeatureNames = (featureNames: string[], only?: string) => {
    if (!featureNames.length) {
        logger.error('No available build target, you are possibly providing a feature matrix with dev only');
        process.exit(21);
    }
    if (only && !featureNames.includes(only)) {
        logger.error(`Feature ${only} is not configured in reskript config`);
        process.exit(21);
    }
};

interface BuildContextOptions<C, S extends ProjectSettings> {
    cmd: BuildCommandLineArgs;
    projectSettings: S;
    entries: Array<AppEntry<C>>;
}

export const createBuildContextWith = async <C, S extends ProjectSettings>(options: BuildContextOptions<C, S>) => {
    const {cmd, projectSettings, entries} = options;
    const {name: hostPackageName} = await readPackageConfig(cmd.cwd);

    if (!entries.length) {
        logger.error('You have no entry to build.');
        process.exit(21);
    }

    const buildEnv: BuildEnv<S> = {
        hostPackageName,
        projectSettings,
        usage: 'build',
        mode: cmd.mode,
        cwd: cmd.cwd,
        srcDirectory: cmd.srcDirectory,
        cacheDirectory: cmd.cacheDirectory,
    };
    const runtimeBuildEnv = await createRuntimeBuildEnv(buildEnv);

    return (featureName: string) => {
        const buildContext: BuildContext<C, S> = {
            ...runtimeBuildEnv,
            entries,
            features: projectSettings.featureMatrix[featureName],
            buildTarget: featureName,
            isDefaultTarget: featureName === cmd.buildTarget || featureName === cmd.featureOnly,
        };
        return buildContext;
    };
};

type Color = 'green' | 'gray' | 'white';

// eslint-disable-next-line complexity
const getExtensionConfig = (extension: string): {order: number, color: Color} => {
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

export interface Asset {
    name: string;
    size: number;
    initial: boolean;
}

export const drawAssetReport = (assets: Asset[]) => {
    const toTemplateData = (asset: Asset) => {
        const config = getExtensionConfig(path.extname(asset.name));
        return {
            name: asset.name,
            color: config.color,
            typeOrder: config.order,
            size: (asset.size / 1024).toFixed(2) + 'KB',
            sizeInBytes: asset.size,
            indicator: asset.initial ? 'initial' : '',
        };
    };
    const templateSegments = sortWith(
        [
            ascend(data => data.typeOrder),
            ascend(data => (data.indicator === 'initial' ? 0 : 1)),
            ascend(asset => asset.name),
        ],
        uniqBy(v => v.name, assets).map(toTemplateData)
    );
    const maxNameLength = templateSegments.map(segment => segment.name.length).reduce((x, y) => Math.max(x, y), 0);
    const maxSizeLength = templateSegments.map(segment => segment.size.length).reduce((x, y) => Math.max(x, y), 0);
    for (const {color, name, size, indicator} of templateSegments) {
        logger.log(kolorist[color](`${name.padStart(maxNameLength)} ${size.padEnd(maxSizeLength)} ${indicator}`));
    }
};
