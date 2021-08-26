#! /usr/bin/env node
import path from 'path';
import {existsSync} from 'fs';
import {logger, isMonorepoRoot} from '@reskript/core';

const resolveChecker = (routeName: string) => {
    switch (routeName) {
        case 'migrate-v2':
            return './migration/v2';
        default:
            return './default';
    }
};

(async () => {
    const cwd = process.cwd();

    if (!existsSync(path.join(cwd, 'package.json'))) {
        logger.error('Unable to find package.json in current working directory.');
        process.exit(24);
    }

    if (isMonorepoRoot(cwd)) {
        logger.error('Currently we are unable to provide dianostics in a monorepo root.');
        logger.error('You may switch to a package\' directory and run doctor again.');
        process.exit(24);
    }

    const routeName = process.argv[2];
    const checker = resolveChecker(routeName);
    const {run} = await import(checker);
    run(cwd);
})();
