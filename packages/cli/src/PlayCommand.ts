// @ts-expect-error
import {isNumber} from 'typanion';
// @ts-expect-error
import {Option} from 'clipanion';
import {PlayCommandLineArgs} from '@reskript/cli-play';
import DynamicImportCommand from './DynamicImportCommand.js';

export default class LintCommand extends DynamicImportCommand<PlayCommandLineArgs> {
    static paths = [['play']];

    static usage = {
        description: 'Start a playground to debug a certain component',
    };

    packageName = '@reskript/cli-play';

    cwd = Option.String('--cwd', process.cwd(), {description: 'override current working directory'});

    buildTarget = Option.String('--build-target', 'dev', {description: 'set build target, default to "dev"'});

    port = Option.String(
        '--port',
        '9999',
        {
            validator: isNumber(),
            description: 'listen on specified port, default to 9999',
        }
    );

    host = Option.String<PlayCommandLineArgs['host']>(
        '--host',
        'localhost',
        {description: 'default server host, "localhost" or "loopback" or "ip" or custom host string'}
    );

    setup = Option.String('--setup', {description: 'Import specified module as global setup entry'});

    concurrentMode = Option.Boolean('--concurrent-mode', {description: 'Enable react concurrent mode'});

    file = Option.String();

    buildCommandLineArgs() {
        return {
            cwd: this.cwd,
            buildTarget: this.buildTarget,
            port: this.port,
            host: this.host,
            concurrentMode: this.concurrentMode,
            setup: this.setup,
        };
    }

    resolveRestArgs() {
        return this.file;
    }
}
