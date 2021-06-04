import path from 'path';
import fs from 'fs';
import {merge} from 'lodash';
import {run} from 'jest-cli';
import {JestConfigOptions, getJestConfig} from '@reskript/config-jest';
import {readProjectSettings} from '@reskript/settings';
import {TestCommandLineArgs} from './interface';

const resolveJestConfig = (jestConfigOptions: JestConfigOptions): string => {
    const {cwd} = jestConfigOptions;
    // find out jest.config
    const jestConfigFile = path.resolve(cwd, 'jest.config.js');

    // if no jest config ,return getJestConfig
    if (!fs.existsSync(jestConfigFile)) {
        return JSON.stringify(getJestConfig(jestConfigOptions));
    }

    // eslint-disable-next-line global-require
    const jestConfig = require(jestConfigFile);

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

export default async (cmd: TestCommandLineArgs): Promise<void> => {
    const {coverage, watch, cwd, src, target, changedSince} = cmd;
    const argv: string[] = [];

    if (coverage) {
        argv.push('--coverage');
    }
    if (watch) {
        argv.push('--watch');
    }
    if (changedSince) {
        argv.push('--changedSince', changedSince);
    }

    const {featureMatrix: {dev: features}} = readProjectSettings(cmd, 'test');
    // featureMatrix 目前以dev为默认目标，以后可以传入--test-target？
    const jestConfigOptions: JestConfigOptions = {cwd, src, target, features};
    const config = resolveJestConfig(jestConfigOptions);
    argv.push('--config', config);
    run(argv);
};
