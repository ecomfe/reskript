#! /usr/bin/env node
import {logger, isMonorepoRoot, resolveMonorepoPackageDirectories} from '@reskript/core';
import check from './check';

(async () => {
    const cwd = process.cwd();

    if (isMonorepoRoot(cwd)) {
        const packageDirectories = await resolveMonorepoPackageDirectories(cwd);
        for (const directory of packageDirectories) {
            await check(directory);
        }
    }
    else {
        logger.log(cwd);
        check(cwd);
    }
})();
