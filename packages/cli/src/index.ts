import path from 'path';
import fs from 'fs';
// @ts-expect-error
import {Cli, Builtins} from 'clipanion';
import {logger, dirFromImportMeta} from '@reskript/core';
import BabelCommand from './BabelCommand.js';
import BuildCommand from './BuildCommand.js';
import DevCommand from './DevCommand.js';
import LintCommand from './LintCommand.js';
import PlayCommand from './PlayCommand.js';
import TestCommand from './TestCommand.js';

const packageJsonContent = fs.readFileSync(
    path.join(dirFromImportMeta(import.meta.url), '..', 'package.json'),
    'utf-8'
);
const {version} = JSON.parse(packageJsonContent);

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
