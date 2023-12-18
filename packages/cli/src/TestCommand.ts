import {Option} from 'clipanion';
import {isEnum} from 'typanion';
import {TestCommandLineArgs} from '@reskript/settings';
import DynamicImportCommand from './DynamicImportCommand.js';

export default class LintCommand extends DynamicImportCommand<TestCommandLineArgs> {
    static paths = [['test']];

    static usage = {
        description: 'Test with jest',
    };

    packageName = '@reskript/cli-test';

    cwd = Option.String('--cwd', process.cwd(), {description: 'override current working directory'});

    configFile = Option.String(
        '--config',
        {description: 'specify a custom configuration file, default to "reskript.config.{ts|mjs}"'}
    );

    envFiles = Option.Array(
        '--env-file',
        {description: 'Expand custom .env files to override built-in ones'}
    );

    target = Option.String<TestCommandLineArgs['target']>(
        '--target',
        'node',
        {
            validator: isEnum(['node', 'react']),
            description: 'specify test environment of the project is "react" or "node", default to "node"',
        }
    );

    jestArgs = Option.Rest();

    buildCommandLineArgs() {
        return {
            cwd: this.cwd,
            configFile: this.configFile,
            envFiles: this.envFiles,
            target: this.target,
            jestArgs: this.jestArgs,
        };
    }
}
