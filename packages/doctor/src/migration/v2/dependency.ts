import {satisfies, minVersion} from 'semver';
import {readPackageConfig} from '@reskript/core';
import {tip, warn} from './logger';

const checkInstalledVersion = (dependencies: Record<string, string>) => {
    const entries = Object.entries(dependencies);
    for (const [name, range] of entries.filter(([name]) => name.startsWith('@reskript/'))) {
        const minInstalledVersion = minVersion(range);
        if (!minInstalledVersion || !satisfies(minInstalledVersion, '2.x', {includePrerelease: true})) {
            warn(`${name}@1.x still installed, upgrade it to a fixed version of latest 2.x release`);
        }
    }
};

export default async (cwd: string) => {
    const packageInfo = await readPackageConfig(cwd);
    const dependencies = {...packageInfo.dependencies, ...packageInfo.devDependencies};

    checkInstalledVersion(dependencies);

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

    if (!satisfies(process.versions.node, '>=14.14.0')) {
        warn(
            'node version does\'t satisfy the least requirement, install a node >= 14.14.0',
            'see: https://reskript.vercel.app/docs/migration/v2#NodeJS版本'
        );
    }
};
