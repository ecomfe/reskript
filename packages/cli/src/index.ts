import path from 'path';
import fs from 'fs';
import {Cli, Builtins} from 'clipanion';
import {logger} from '@reskript/core';
import BabelCommand from './BabelCommand';
import BuildCommand from './BuildCommand';
import DevCommand from './DevCommand';
import LintCommand from './LintCommand';
import PlayCommand from './PlayCommand';
import TestCommand from './TestCommand';

const {version} = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));

const cli = new Cli({binaryLabel: 'reSKRipt', binaryName: 'skr', binaryVersion: version});

cli.register(BabelCommand);
cli.register(BuildCommand);
cli.register(DevCommand);
cli.register(LintCommand);
cli.register(PlayCommand);
cli.register(TestCommand);
cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);

export const run = async () => {
    process.on(
        'unhandledRejection',
        (e: any) => {
            logger.error(e.toString());
            process.exit(99);
        }
    );

    try {
        await cli.runExit(process.argv.slice(2), Cli.defaultContext);
    }
    catch (ex) {
        console.error(ex);
    }
};
