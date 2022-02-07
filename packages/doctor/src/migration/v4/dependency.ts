import {readPackageConfig} from '@reskript/core';
import {warn} from '../logger.js';
import {checkInstalledReskriptVersion, nodeVersionSatisfies} from '../utils.js';

export default async (cwd: string) => {
    const packageInfo = await readPackageConfig(cwd);
    const dependencies = {...packageInfo.dependencies, ...packageInfo.devDependencies};

    checkInstalledReskriptVersion(dependencies, 4);

    if (!dependencies['@reskript/settings']) {
        warn(
            '@reskript/settings need to be installed with the same version of other @reskript packages',
            'see: https://reskript.vercel.app/docs/migration/v4#安装settings包'
        );
    }

    if (!nodeVersionSatisfies('>=14.18.0')) {
        warn(
            'node version does\'t satisfy the least requirement, install a node ^14.18.0 || >= 16.0.0',
            'see: https://reskript.vercel.app/docs/migration/v4#NodeJS版本'
        );
    }
};
