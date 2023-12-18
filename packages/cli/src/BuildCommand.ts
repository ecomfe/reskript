import {Option} from 'clipanion';
import {isEnum} from 'typanion';
import {WorkMode} from '@reskript/core';
import {BuildCommandLineArgs} from '@reskript/settings';
import DynamicImportCommand from './DynamicImportCommand.js';

export default class BuildCommand extends DynamicImportCommand<BuildCommandLineArgs> {
    static paths = [['build']];

    static usage = {
        description: 'Build application using webpack',
    };

    packageName = '@reskript/cli-build';

    cwd = Option.String('--cwd', process.cwd(), {description: 'override current working directory'});

    mode = Option.String<WorkMode>(
        '--mode',
        'production',
        {
            validator: isEnum(['development', 'production']),
            description: 'set build mode, default to "production"',
        }
    );

    configFile = Option.String(
        '--config',
        {description: 'specify a custom configuration file, default to "reskript.config.{ts|mjs}"'}
    );

    envFiles = Option.Array(
        '--env-file',
        {description: 'Expand custom .env files to override built-in ones'}
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

    buildTarget = Option.String('--build-target', {description: 'set build target, default to "dev"'});

    featureOnly = Option.String('--feature-only', {description: 'build named feature only, ignore other features'});

    entriesOnly = Option.Array(
        '--entries-only',
        {description: 'specify one or more entries to build, excludes other entries from build'}
    );

    strict = Option.Boolean(
        '--strict',
        false,
        {description: 'enable strict build mode to get more source code and dependency checks'}
    );

    analyze = Option.Boolean('--analyze', false, {description: 'enable bundle analytics'});

    profile = Option.Boolean('--profile', false, {description: 'enable react profiling mode'});

    sourceMaps = Option.Boolean('--source-maps', true, {description: 'enable or disable generation of source maps'});

    clean = Option.Boolean('--clean', false, {description: 'remove dist directory before build'});

    cacheDirectory = Option.String('--cache-dir', {description: 'specify the directory to store build cache'});

    watch = Option.Boolean('--watch', false, {description: 'watch for changes and rebuild, require --build-target'});

    buildCommandLineArgs() {
        return {
            cwd: this.cwd,
            mode: this.mode,
            configFile: this.configFile,
            envFiles: this.envFiles,
            srcDirectory: this.srcDirectory,
            entriesDirectory: this.entriesDirectory,
            buildTarget: this.buildTarget,
            featureOnly: this.featureOnly,
            entriesOnly: this.entriesOnly,
            strict: this.strict,
            analyze: this.analyze,
            profile: this.profile,
            sourceMaps: this.sourceMaps,
            clean: this.clean,
            cacheDirectory: this.cacheDirectory,
            watch: this.watch,
        };
    }
}
