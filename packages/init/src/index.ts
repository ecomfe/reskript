#! /usr/bin/env node
import chalk from 'chalk';
import preCheckCurrentWorkingDirectory from './check';
import askForOptions from './ask';
import run from './run';

(async () => {
    const cwd = process.argv[2] || process.cwd();
    await preCheckCurrentWorkingDirectory(cwd);

    const options = await askForOptions();
    await run(cwd, options);

    console.log('Project initialization complete');
    console.log(`You can run ${chalk.bold('npm start')} to start a dev server`);
    console.log('Follow todo list in browser to complete last steps');
})();
