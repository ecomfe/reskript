import {getJestPresetConfig} from './preset';
import {JestConfigOptions} from './interface';

export * from './interface';

export const getJestConfig = (options: JestConfigOptions) => {
    const {cwd, target} = options;
    // 默认配置根据当前目录作为basePath
    const presetConfig = getJestPresetConfig(target, __dirname, options);

    const config = {
        ...presetConfig,
        rootDir: cwd,
        collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
        coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
    };

    return config;
};

export {getJestPresetConfig} from './preset';
