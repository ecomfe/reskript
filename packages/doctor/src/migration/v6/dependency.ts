import {readPackageConfig} from '@reskript/core';
import {warn} from '../logger.js';
import {checkInstalledReskriptVersion, isInstalledVersionSatisfies, nodeVersionSatisfies} from '../utils.js';

export default async (cwd: string) => {
    const packageInfo = await readPackageConfig(cwd);
    const dependencies = {...packageInfo.dependencies, ...packageInfo.devDependencies};

    checkInstalledReskriptVersion(dependencies, 6);

    if (!nodeVersionSatisfies('>=16.10.0')) {
        warn(
            'node version does\'t satisfy the least requirement, install a node >= 16.10.0',
            'see: https://reskript.dev/docs/migration/v6#NodeJS版本'
        );
    }

    if (dependencies.antd && isInstalledVersionSatisfies(dependencies, 'antd', '4.x')) {
        warn(
            'antd 4.x support is removed by default, please add "antd@4" to build.uses in config',
            'see: https://reskript.dev/docs/migration/v6#Antd支持变更'
        );
    }

    if (dependencies.vite && !isInstalledVersionSatisfies(dependencies, 'vite', '4.x')) {
        warn(
            'vite 4.x is required, please upgrade it',
            'see: https://reskript.dev/docs/migration/v6#工具版本更新'
        );
    }
};
