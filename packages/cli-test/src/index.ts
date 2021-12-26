import path from 'path';
import fs from 'fs';
import {mergeDeepRight} from 'ramda';
import {run as runJest} from 'jest-cli';
import {logger} from '@reskript/core';
import {JestConfigOptions, getJestConfig} from '@reskript/config-jest';
import {readProjectSettings, strictCheckRequiredDependency} from '@reskript/settings';
import {TestCommandLineArgs} from './interface.js';

export {TestCommandLineArgs};

const resolveJestConfig = async (jestConfigOptions: JestConfigOptions): Promise<string> => {
    const {cwd} = jestConfigOptions;
    // find out jest.config
    const jestConfigFile = path.resolve(cwd, 'jest.config.js');

    // if no jest config ,return getJestConfig
    if (!fs.existsSync(jestConfigFile)) {
        return JSON.stringify(getJestConfig(jestConfigOptions));
    }

    // 用`import`拿一个CommonJS的模块，拿到的东西要是里面的`default`
    try {
        // NOTE: 这里没用`importUserModule`是因为反正Jest就不支持ESM，真干了也没用
        const {default: jestConfig} = await import(jestConfigFile);

        if ('preset' in jestConfig) {
            // 如果用户的配置里有`preset`，那它应该已经声明了基于`@reskript/config-jest`来配置，直接返回就行
            return JSON.stringify(jestConfig);
        }
        else {
            // 如果没有`preset`，那我们认为用户自己声明的是一个“扩展”的配置，需要我们把默认配置合并进去
            const skrConfig = getJestConfig(jestConfigOptions);
            // 用户的覆盖skr的
            return JSON.stringify(mergeDeepRight(skrConfig, jestConfig));
        }
    }
    catch {
        logger.warn('Failed to parse your custom jest.config.js, fallback to default configuration');
        return JSON.stringify(getJestConfig(jestConfigOptions));
    }
};

export const run = async (cmd: TestCommandLineArgs): Promise<void> => {
    const {cwd, target, jestArgs} = cmd;
    const projectSettings = await readProjectSettings(cmd, 'test');
    await strictCheckRequiredDependency(projectSettings, cmd.cwd);
    // TODO: `featureMatrix`目前以dev为默认目标，以后可以传入`--test-target`？
    const jestConfigOptions: JestConfigOptions = {cwd, target, features: projectSettings.featureMatrix.dev};
    const config = await resolveJestConfig(jestConfigOptions);
    const argv = ['--config', config, ...jestArgs];
    runJest(argv);
};
