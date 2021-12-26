import path from 'path';
import fs from 'fs/promises';
import {reject, isNil, difference} from 'ramda';
import webpack, {Configuration, Stats} from 'webpack';
import {logger, pMap, prepareEnvironment, readPackageConfig} from '@reskript/core';
import {
    createWebpackConfig,
    collectEntries,
    createRuntimeBuildEnv,
    checkProjectSettings,
    BuildContext,
    EntryLocation,
} from '@reskript/config-webpack';
import {readProjectSettings, BuildEnv, ProjectSettings, strictCheckRequiredDependency} from '@reskript/settings';
import * as partials from './partial.js';
import {BuildCommandLineArgs} from './interface.js';
import {drawFeatureMatrix, drawBuildReport, printWebpackResult, WebpackResult} from './report.js';
import inspect from './inspect/index.js';

export {BuildCommandLineArgs};

const build = (configuration: Configuration | Configuration[]): Promise<Stats> => {
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

const createConfigurations = async (cmd: BuildCommandLineArgs, projectSettings: ProjectSettings) => {
    const featureNames = difference(Object.keys(projectSettings.featureMatrix), projectSettings.build.excludeFeatures);

    if (cmd.featureOnly && !featureNames.includes(cmd.featureOnly)) {
        logger.error(`Feature ${cmd.featureOnly} is not configured in reskript.config.js`);
        process.exit(21);
    }

    if (cmd.analyze && !cmd.buildTarget) {
        logger.error('--analyze must be used with --build-target to specify only one target');
        process.exit(21);
    }

    checkProjectSettings(projectSettings);
    drawFeatureMatrix(projectSettings, cmd.featureOnly);

    const {name: hostPackageName} = await readPackageConfig(cmd.cwd);
    const entryLocation: EntryLocation = {
        cwd: cmd.cwd,
        srcDirectory: cmd.srcDirectory,
        entryDirectory: cmd.entriesDirectory,
        only: cmd.entriesOnly,
    };
    const entries = await collectEntries(entryLocation);

    const featureNamesToUse = cmd.featureOnly ? [cmd.featureOnly] : featureNames;
    const toConfiguration = async (featureName: string): Promise<Configuration> => {
        const buildEnv: BuildEnv = {
            hostPackageName,
            projectSettings,
            usage: 'build',
            mode: cmd.mode,
            cwd: cmd.cwd,
            srcDirectory: cmd.srcDirectory,
            cacheDirectory: cmd.cacheDirectory,
        };
        const runtimeBuildEnv = await createRuntimeBuildEnv(buildEnv);
        const buildContext: BuildContext = {
            ...runtimeBuildEnv,
            entries,
            features: projectSettings.featureMatrix[featureName],
            buildTarget: featureName,
            isDefaultTarget: featureName === cmd.buildTarget || featureName === cmd.featureOnly,
        };
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

    return pMap(featureNamesToUse, toConfiguration);
};

export const run = async (cmd: BuildCommandLineArgs): Promise<void> => {
    process.env.NODE_ENV = cmd.mode;
    await prepareEnvironment(cmd.cwd, cmd.mode);

    if (cmd.clean) {
        await fs.rm(path.join(cmd.cwd, 'dist'), {recursive: true, force: true});
    }

    const projectSettings = await readProjectSettings(cmd, 'build');
    await strictCheckRequiredDependency(projectSettings, cmd.cwd);
    const [initial, ...configurations] = await createConfigurations(cmd, projectSettings);

    if (!initial) {
        const error = 'No build configuration created, you are possibly providing a feature matrix with dev only';
        logger.error(error);
        process.exit(21);
    }

    // 由于webpack 5.x有很强的缓存能力，所以先构建一次做好缓存，后面几个再并行构建速度反而会变快
    const initialStats = await build([initial]);
    const stats = !!configurations.length && await build(configurations);
    drawBuildReport(stats ? [initialStats, stats] : [initialStats]);
    logger.lineBreak();
    await inspect(initialStats, projectSettings.build.inspect, {cwd: cmd.cwd, exitOnError: !cmd.analyze});
};
