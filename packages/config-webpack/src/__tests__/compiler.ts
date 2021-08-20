import path from 'path';
import webpack, {StatsModule, StatsAsset} from 'webpack';
import {fillProjectSettings, PartialProjectSettings} from '@reskript/settings';
import {createWebpackConfig} from '../index';
import {BuildContext} from '../interface';

interface CompileResult {
    code: string;
    entryModule?: StatsModule;
    assets?: StatsAsset[];
}

export default async (entry: string, projectSettings?: PartialProjectSettings) => {
    const context: BuildContext = {
        cwd: path.resolve(__dirname, 'fixtures'),
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
        projectSettings: fillProjectSettings(projectSettings),
    };
    Object.assign(context.projectSettings.build, {reportLintErrors: false});
    const config = await createWebpackConfig(context);
    config.entry = path.join(__dirname, 'fixtures', entry);
    config.output = {
        path: path.join(__dirname, 'output'),
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
