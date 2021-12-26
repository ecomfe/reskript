import {logger} from '@reskript/core';
import * as semver from 'semver';
import {run as v2} from './v2/index.js';
import {run as v3} from './v3/index.js';
import {readAllDependencies} from './utils.js';

const resolveCurrentVersion = async (cwd: string) => {
    const dependencies = await readAllDependencies(cwd);
    const entries = Object.entries(dependencies);
    const maxVersion = entries.filter(([name]) => name.startsWith('@reskript/')).reduce(
        (maxVersion, entry) => {
            const versionRange = entry[1];
            return Math.max(semver.minVersion(versionRange)?.major ?? 0, maxVersion);
        },
        0
    );
    return maxVersion;
};

export const run = async (cwd: string) => {
    const currentVersion = await resolveCurrentVersion(cwd);

    switch (currentVersion) {
        case 0:
            logger.error('Unable to find any @reskript/* packages in current working directory.');
            process.exit(13);
            break;
        case 1:
            await v2(cwd);
            break;
        case 2:
            await v3(cwd);
            break;
        case 3:
            logger.log('You have already installed the latest verion');
            break;
        default:
            logger.log(`We don't have a policy to migrate current installed version ${currentVersion}`);
            break;
    }
};
