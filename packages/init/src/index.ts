#! /usr/bin/env node
import {logger} from '@reskript/core';
import preCheckCurrentWorkingDirectory from './check.js';
import askForOptions from './ask.js';
import run from './run/index.js';

(async () => {
    const cwd = process.argv[2] || process.cwd();
    await preCheckCurrentWorkingDirectory(cwd);

    const options = await askForOptions();
    await run(cwd, options);

    logger.log('Project initialization complete');
    logger.log('You can run "npm start" to start a dev server');
    logger.log('Follow todo list in browser to complete last steps');
})();
