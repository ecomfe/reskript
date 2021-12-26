import {readPackageConfig} from '@reskript/core';
import {warn} from '../logger.js';
import {checkInstalledReskriptVersion, isInstalledVersionSatisfies, nodeVersionSatisfies} from '../utils.js';

export default async (cwd: string) => {
    const packageInfo = await readPackageConfig(cwd);
    const dependencies = {...packageInfo.dependencies, ...packageInfo.devDependencies};

    checkInstalledReskriptVersion(dependencies, 3);

    if (!isInstalledVersionSatisfies(dependencies, 'eslint', '8.x')) {
        warn(
            'ESLint 8.x is required, please upgrade it',
            'see: https://reskript.vercel.app/docs/migration/v3#更新ESLint'
        );
    }

    if (!isInstalledVersionSatisfies(dependencies, 'stylelint', '14.x')) {
        warn(
            'StyleLint 14.x is required, please upgrade it',
            'see: https://reskript.vercel.app/docs/migration/v3#更新StyleLint'
        );
    }

    if (!nodeVersionSatisfies('>=14.18.0')) {
        warn(
            'node version does\'t satisfy the least requirement, install a node >= 14.18.0',
            'see: https://reskript.vercel.app/docs/migration/v3#NodeJS版本'
        );
    }
};
