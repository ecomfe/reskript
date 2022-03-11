import {readPackageConfig} from '@reskript/core';
import {checkInstalledReskriptVersion} from '../utils.js';

export default async (cwd: string) => {
    const packageInfo = await readPackageConfig(cwd);
    const dependencies = {...packageInfo.dependencies, ...packageInfo.devDependencies};

    checkInstalledReskriptVersion(dependencies, 5);
};
