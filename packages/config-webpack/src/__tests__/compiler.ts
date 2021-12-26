import path from 'path';
import webpack, {StatsModule, StatsAsset} from 'webpack';
import {dirFromImportMeta} from '@reskript/core';
import {fillProjectSettings, PartialProjectSettings} from '@reskript/settings';
import {createWebpackConfig} from '../index';
import {BuildContext} from '../interface';

const currentDirectory = dirFromImportMeta(import.meta.url);

interface CompileResult {
    code: string;
    entryModule?: StatsModule;
    assets?: StatsAsset[];
}

export default async (entry: string, partialProjectSettings?: PartialProjectSettings) => {
    const projectSettings = fillProjectSettings(partialProjectSettings);
    const context: BuildContext = {
        cwd: path.resolve(currentDirectory, 'fixtures'),
        mode: 'development',
        cache: 'off',
        usage: 'build',
        srcDirectory: 'src',
        hostPackageName: 'test-fixture',
        buildVersion: '000000',
        buildTime: (new Date()).toISOString(),
        features: {},
        buildTarget: 'stable',
        isDefaultTarget: false,
        entries: [],
        projectSettings: {
            ...projectSettings,
            build: {
                ...projectSettings.build,
                script: {
                    ...projectSettings.build.script,
                    polyfill: false,
                },
            },
        },
    };
    Object.assign(context.projectSettings.build, {reportLintErrors: false});
    const config = await createWebpackConfig(context);
    config.entry = path.join(currentDirectory, 'fixtures', entry);
    config.output = {
        path: path.join(currentDirectory, 'output'),
        filename: 'bundle.js',
    };
    const compiler = webpack(config);

    return new Promise<CompileResult>((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
                return;
            }

            if (!stats) {
                reject(new Error('No stats'));
                return;
            }

            if (stats.hasErrors()) {
                reject(new Error(stats.toJson().errors?.[0].message ?? 'Unkonwn error'));
            }

            const output = stats.toJson();
            const result = {
                code: (output.modules?.[0].source ?? '').toString(),
                entryModule: output.modules?.[0],
                assets: output.assets,
            };
            resolve(result);
        });
    });
};
