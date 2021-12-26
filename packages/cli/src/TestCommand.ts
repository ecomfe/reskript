// @ts-expect-error
import {Option} from 'clipanion';
// @ts-expect-error
import {isEnum} from 'typanion';
import {TestCommandLineArgs} from '@reskript/cli-test';
import DynamicImportCommand from './DynamicImportCommand.js';

export default class LintCommand extends DynamicImportCommand<TestCommandLineArgs> {
    static paths = [['test']];

    static usage = {
        description: 'Test with jest',
    };

    packageName = '@reskript/cli-test';

    cwd = Option.String('--cwd', process.cwd(), {description: 'override current working directory'});

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
            target: this.target,
            jestArgs: this.jestArgs,
        };
    }
}
