#! /usr/bin/env node
import {isMonorepoRoot, resolveMonorepoPackageDirectories} from '@reskript/core';
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
        console.log(cwd);
        check(cwd);
    }
})();
