#! /usr/bin/env node
import program from 'commander';
import semver from 'semver';
import chalk from 'chalk';
import {CommandConfig} from '@reskript/core';

const buildCommand = async ({command, description, args, run}: CommandConfig<any>): Promise<void> => {
    const commandConfig = program.command(command);
    commandConfig.description(description);
    args.forEach(option => commandConfig.option(option[0], option[1], option[2]));
    commandConfig.action(run);
};

const main = async (): Promise<void> => {
    if (semver.lt(process.version, '8.9.0')) {
        console.error(chalk.yellow('Require node >= v8.9.0 to be installed'));
        process.exit(10);
    }

    process.on(
        'unhandledRejection',
        e => {
            console.error(e);
            process.exit(99);
        }
    );

    const route = process.argv[2];

    if (!route) {
        console.log('No command is given, you can install any @reskript/cli-* package to install a command');
        process.exit(12);
    }

    try {
        const entry = process.env.DEV === 'true' ? `../../cli-${route}/dist` : `@reskript/cli-${route}`;
        const {default: command} = await import(entry);

        if (!command) {
            console.error(chalk.red(`@reskript/cli-${route} is not a CLI package`));
            process.exit(11);
        }

        buildCommand(command);
        program.parse(process.argv);
    }
    catch {
        console.error(chalk.red(`${route} command not available, you may install @reskript/cli-${route}`));
        process.exit(11);
    }
};

main();
