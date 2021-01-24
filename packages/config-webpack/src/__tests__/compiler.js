import path from 'path';
import webpack from 'webpack';
import {fillProjectSettings} from '@reskript/settings';
import {createWebpackConfig} from '../index';

export default (entry, projectSettings) => {
    const context = {
        cwd: path.resolve(__dirname, 'fixtures'),
        mode: 'development',
        cache: false,
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
    context.projectSettings.build.reportLintErrors = false;
    const config = createWebpackConfig(context);
    config.entry = path.join(__dirname, 'fixtures', entry);
    config.output = {
        path: path.join(__dirname, 'output'),
        filename: 'bundle.js',
    };
    const compiler = webpack(config);

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
            }

            if (stats.hasErrors()) {
                reject(new Error(stats.toJson().errors));
            }

            const output = stats.toJson();
            const result = {
                code: output.modules[0].source,
                entryModule: output.modules[0],
                assets: output.assets,
            };
            resolve(result);
        });
    });
};
