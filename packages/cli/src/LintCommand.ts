// @ts-expect-error
import {Option} from 'clipanion';
import {LintCommandLineArgs} from '@reskript/cli-lint';
import DynamicImportCommand from './DynamicImportCommand.js';

export default class LintCommand extends DynamicImportCommand<LintCommandLineArgs> {
    static paths = [['lint']];

    static usage = {
        description: 'Lint files, by default .[j|t]s(x) files under src are linted',
    };

    packageName = '@reskript/cli-lint';

    changed = Option.Boolean('--changed', false, {description: 'lint only changed files in git workspace'});

    staged = Option.Boolean(
        '--staged',
        false,
        {description: 'lint only staged (both partially and fully) files in git workspace'}
    );

    allowUnsafeReactMethod = Option.Boolean(
        '--allow-unsafe-react-method',
        false,
        {description: 'allow UNSAFE_* methods in react component'}
    );

    strict = Option.Boolean(
        '--strict',
        false,
        {description: 'in strict mode, warnings make lint fail with a none-zero exit code'}
    );

    fix = Option.Boolean(
        '--fix',
        false,
        {description: 'fix possible lint errors'}
    );

    autoStage = Option.Boolean(
        '--auto-stage',
        false,
        {description: 'auto git add files that staged and not modified'}
    );

    files = Option.Rest();

    buildCommandLineArgs() {
        return {
            changed: this.changed,
            staged: this.staged,
            allowUnsafeReactMethod: this.allowUnsafeReactMethod,
            fix: this.fix,
            strict: this.strict,
            autoStage: this.autoStage,
        };
    }

    resolveRestArgs() {
        return this.files;
    }
}
