import {reject, isNil} from 'ramda';
import webpack, {Configuration, Stats} from 'webpack';
import {logger, pMap} from '@reskript/core';
import {createWebpackConfig, BuildContext, EntryConfig} from '@reskript/config-webpack';
import {BuildCommandLineArgs, WebpackProjectSettings} from '@reskript/settings';
import {BuildRunOptions} from '../interface.js';
import * as partials from './partial.js';
import {drawBuildReport, printWebpackResult, WebpackResult} from './report.js';
import inspect from './inspect/index.js';

const runBuild = (configuration: Configuration[]): Promise<Stats> => {
    const executor = (resolve: (value: Stats) => void) => webpack(
        configuration as Configuration, // https://github.com/Microsoft/TypeScript/issues/14107
        (err?: Error, stats?: Stats) => {
            if (err) {
                logger.error(err.toString());
                process.exit(22);
            }

            if (!stats) {
                logger.error('Unknown error: webpack does not return its build stats');
                process.exit(22);
            }

            const toJsonOptions = {all: false, errors: true, warnings: true, assets: true};
            // webpack的`toJson`的定义是错的
            const {errors, warnings} = stats.toJson(toJsonOptions);
            for (const error of reject(isNil, errors ?? [])) {
                printWebpackResult('error', error as unknown as WebpackResult);
            }
            for (const warning of reject(isNil, warnings ?? [])) {
                printWebpackResult('warn', warning as unknown as WebpackResult);
            }

            if (stats.hasErrors()) {
                process.exit(22);
            }

            resolve(stats);
        }
    );

    return new Promise(executor);
};

const toConfiguration = async (cmd: BuildCommandLineArgs, buildContext: BuildContext) => {
    const extras = [
        cmd.analyze && partials.analyze(buildContext),
        cmd.profile && partials.profile(),
        !cmd.sourceMaps && partials.noSourceMaps(),
    ];
    return createWebpackConfig(
        buildContext,
        {
            strict: {
                disableRequireExtension: cmd.strict,
                caseSensitiveModuleSource: cmd.strict,
                typeCheck: cmd.strict,
            },
            extras: reject((v: false | Configuration): v is false => !v, extras),
        }
    );
};

export const build = async (options: BuildRunOptions<EntryConfig, WebpackProjectSettings>): Promise<void> => {
    const {cmd, projectSettings, buildContextList} = options;
    const [initial, ...configurations] = await pMap(buildContextList, v => toConfiguration(cmd, v));
    // 由于webpack 5.x有很强的缓存能力，所以先构建一次做好缓存，后面几个再并行构建速度反而会变快
    const initialStats = await runBuild([initial]);
    const stats = await runBuild(configurations);
    drawBuildReport(stats ? [initialStats, stats] : [initialStats]);
    logger.lineBreak();
    await inspect(initialStats, projectSettings.build.inspect, {cwd: cmd.cwd, exitOnError: !cmd.analyze});
};
