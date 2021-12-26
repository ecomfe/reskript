// @ts-expect-error
import {Option} from 'clipanion';
// @ts-expect-error
import {isEnum} from 'typanion';
import {WorkMode} from '@reskript/core';
import {BabelCommandLineArgs} from '@reskript/cli-babel';
import DynamicImportCommand from './DynamicImportCommand.js';

export default class BabelCommand extends DynamicImportCommand<BabelCommandLineArgs> {
    static paths = [['babel']];

    static usage = {
        description: 'Transform files with babel',
    };

    packageName = '@reskript/cli-babel';

    mode = Option.String<WorkMode>(
        '--mode',
        'development',
        {
            validator: isEnum(['development', 'production']),
            description: 'set build mode, default to "development"',
        }
    );

    polyfill = Option.Boolean('--polyfill', true, {description: 'transform without inserting core-js imports'});

    outDirectory = Option.String('--out-dir', {description: 'specify output to directory'});

    clean = Option.Boolean('--clean', false, {description: 'remove dist directory before build'});

    copy = Option.Boolean('--copy', false, {description: 'copy non-script file to output directory'});

    file = Option.String();

    buildCommandLineArgs() {
        return {
            mode: this.mode,
            polyfill: this.polyfill,
            outDirectory: this.outDirectory,
            clean: this.clean,
            copy: this.copy,
        };
    }

    resolveRestArgs() {
        return this.file;
    }
}
