import {tip, warn} from '../logger.js';
import {checkInstalledReskriptVersion, nodeVersionSatisfies, readAllDependencies} from '../utils.js';

export default async (cwd: string) => {
    const dependencies = await readAllDependencies(cwd);

    checkInstalledReskriptVersion(dependencies, 2);

    if (!dependencies['core-js']) {
        warn(
            'can\'t find core-js installed, please install it',
            'see: https://reskript.vercel.app/docs/migration/v2#安装core-js'
        );
    }

    if (!/^\d+\.\d+\.\d+(-.+)*$/.test(dependencies['@reskript/cli'])) {
        tip(
            '@reskript/* is installed with a version range, better to install a fixed version',
            'see: https://reskript.vercel.app/docs/migration/v2#推荐固定版本'
        );
    }

    if (!nodeVersionSatisfies('>=14.14.0')) {
        warn(
            'node version does\'t satisfy the least requirement, install a node >= 14.14.0',
            'see: https://reskript.vercel.app/docs/migration/v2#NodeJS版本'
        );
    }
};
