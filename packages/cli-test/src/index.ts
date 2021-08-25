import path from 'path';
import fs from 'fs';
import {merge} from 'lodash';
import {run as runJest} from 'jest-cli';
import {JestConfigOptions, getJestConfig} from '@reskript/config-jest';
import {readProjectSettings, strictCheckRequiredDependency} from '@reskript/settings';
import {TestCommandLineArgs} from './interface';

export {TestCommandLineArgs};

const resolveJestConfig = async (jestConfigOptions: JestConfigOptions): Promise<string> => {
    const {cwd} = jestConfigOptions;
    // find out jest.config
    const jestConfigFile = path.resolve(cwd, 'jest.config.js');

    // if no jest config ,return getJestConfig
    if (!fs.existsSync(jestConfigFile)) {
        return JSON.stringify(getJestConfig(jestConfigOptions));
    }

    const jestConfig = await import(jestConfigFile);

    if ('preset' in jestConfig) {
        // if jest config has preset, return jest config
        return JSON.stringify(jestConfig);
    }
    else {
        // if jest config has no preset, return merged
        const skrConfig = getJestConfig(jestConfigOptions);
        // 用户的覆盖skr的
        return JSON.stringify(merge(skrConfig, jestConfig));
    }
};

export const run = async (cmd: TestCommandLineArgs): Promise<void> => {
    const {cwd, target, jestArgs} = cmd;
    const projectSettings = await readProjectSettings(cmd, 'test');
    await strictCheckRequiredDependency(projectSettings, cmd.cwd);
    // featureMatrix 目前以dev为默认目标，以后可以传入--test-target？
    const jestConfigOptions: JestConfigOptions = {cwd, target, features: projectSettings.featureMatrix.dev};
    const config = await resolveJestConfig(jestConfigOptions);
    const argv = ['--config', config, ...jestArgs];
    runJest(argv);
};
