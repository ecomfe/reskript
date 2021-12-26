// @ts-expect-error
import {Option} from 'clipanion';
// @ts-expect-error
import {isEnum} from 'typanion';
import {WorkMode} from '@reskript/core';
import {DevCommandLineArgs} from '@reskript/cli-dev';
import DynamicImportCommand from './DynamicImportCommand.js';

export default class DevCommand extends DynamicImportCommand<DevCommandLineArgs> {
    static paths = [['dev']];

    static usage = {
        description: 'Start dev server for debugging',
    };

    packageName = '@reskript/cli-dev';

    cwd = Option.String('--cwd', process.cwd(), {description: 'override current working directory'});

    mode = Option.String<WorkMode>(
        '--mode',
        'development',
        {
            validator: isEnum(['development', 'production']),
            description: 'set build mode, default to "development"',
        }
    );

    srcDirectory = Option.String(
        '--src-dir',
        'src',
        {description: 'specify the directory containing source files relative to cwd'}
    );

    entriesDirectory = Option.String(
        '--entries-dir',
        'entries',
        {description: 'specify the directory containing entry files'}
    );

    buildTarget = Option.String('--build-target', 'dev', {description: 'set build target, default to "dev"'});

    proxyDomain = Option.String(
        '--proxy-domain',
        {description: 'set api proxy domain, only domain part (www.example.com) is required'}
    );

    host = Option.String<DevCommandLineArgs['host']>(
        '--host',
        {description: 'default server host, "localhost" or "loopback" or "ip" or custom host string'}
    );

    entry = Option.String('--entry', 'index', {description: 'specify an entry as the default page'});

    strict = Option.Boolean(
        '--strict',
        false,
        {description: 'enable strict build mode to get more source code and dependency checks'}
    );

    open = Option.Boolean(
        '--open',
        true,
        {description: 'auto open page in browser, use --no-open to disable'}
    );

    buildCommandLineArgs() {
        return {
            cwd: this.cwd,
            mode: this.mode,
            srcDirectory: this.srcDirectory,
            entriesDirectory: this.entriesDirectory,
            buildTarget: this.buildTarget,
            proxyDomain: this.proxyDomain,
            host: this.host,
            entry: this.entry,
            strict: this.strict,
            open: this.open,
        };
    }
}
