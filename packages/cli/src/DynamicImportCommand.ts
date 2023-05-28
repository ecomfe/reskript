import path from 'node:path';
import {existsSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {packageDirectory} from 'pkg-dir';
import enquirer from 'enquirer';
import {installPackage} from '@antfu/install-pkg';
import {Command} from 'clipanion';
import {CommandDefinition, findGitRoot, logger, readPackageConfig, resolveFrom} from '@reskript/core';

const isErrorWithCode = (error: any): error is NodeJS.ErrnoException => {
    return 'message' in error && 'code' in error;
};

type PackageManager = 'npm' | 'yarn' | 'pnpm';

type InstallResult = 'installed' | 'canceled' | 'noPackageManager' | 'failed';

export default abstract class DynamicImportCommand<A> extends Command {
    protected readonly packageName: string = '';

    async execute() {
        if (!this.packageName) {
            logger.error('No command package defined');
            process.exit(11);
        }

        try {
            const run = await this.importCommandPackage();
            const args = this.buildCommandLineArgs();
            const rest = this.resolveRestArgs();
            await run(args, rest);
        }
        catch (ex) {
            logger.error('Command failed, you may submit a issue to https://github.com/ecomfe/reskript/issues/new');
            logger.debug(ex);
            process.exit(99);
        }
    }

    protected resolveRestArgs(): string | string[] | undefined {
        return undefined;
    }

    private async importCommandPackage() {
        const resolve = resolveFrom(process.cwd());

        const dynamicImport = async () => {
            // 这个不能放到外面去，`resolve`本身就是找不到模块会报错的，所以自动安装后要重找一下
            const packageEntry = await resolve(this.packageName);
            const {run} = await import(pathToFileURL(packageEntry).toString()) as CommandDefinition<A>;
            return run;
        };

        try {
            const run = await dynamicImport();
            return run;
        }
        catch (ex) {
            if (!isErrorWithCode(ex) || ex.code !== 'MODULE_NOT_FOUND') {
                logger.error(`Failed to run command: ${ex instanceof Error ? ex.message : ex}`);
                process.exit(99);
            }

            const canAutoInstall = await this.canAutoInstall();

            if (!canAutoInstall) {
                const message = `
                    You don't have ${this.packageName} installed or it is broken.
                    Unfotunately we're unable to install it automatically for you.
                    To auto install command packages, you're required to satisfy these conditions:
                        1. Install @reskript/cli to a exact version.
                        2. Have git enabled in this project.
                        3. Keep a lock file (either npm, yarn or pnpm) in your git root directory.
                    You may install ${this.packageName} your self and try to run command again.
                `;
                logger.error(message);
                process.exit(11);
            }

            const installResult = await this.installCommandPackage();

            if (installResult === 'installed') {
                return dynamicImport();
            }

            switch (installResult) {
                case 'canceled':
                    logger.log(`You may install ${this.packageName} manually and try to run command again.`);
                    break;
                case 'failed':
                    logger.error(`Failed to install ${this.packageName}, you may install it manually`);
                    break;
                case 'noPackageManager':
                    logger.error('We can\'t detect a suitable package manager to automatic install');
                    break;
            }

            process.exit(11);
        }
    }

    private async canAutoInstall() {
        const packageRoot = await packageDirectory();

        if (!packageRoot) {
            return false;
        }

        const packageConfig = await readPackageConfig(packageRoot);
        const dependencies = {...packageConfig.dependencies, ...packageConfig.devDependencies};

        return dependencies['@reskript/cli'] === this.cli.binaryVersion;
    }

    private async detectPackageManager(): Promise<PackageManager | null> {
        const gitRoot = await findGitRoot();

        if (!gitRoot) {
            return null;
        }

        if (existsSync(path.join(gitRoot, 'package-lock.json'))) {
            return 'npm';
        }
        if (existsSync(path.join(gitRoot, 'yarn.lock'))) {
            return 'yarn';
        }
        if (existsSync(path.join(gitRoot, 'pnpm-lock.yaml'))) {
            return 'pnpm';
        }

        return null;
    }

    private async installCommandPackage(): Promise<InstallResult> {
        const question = {
            type: 'confirm',
            name: 'ok',
            message: `We're going to install ${this.packageName} for you, continue?`,
        };
        const answer = await enquirer.prompt<{ok: boolean}>(question);

        if (!answer.ok) {
            return 'canceled';
        }

        const packageManager = await this.detectPackageManager();

        if (!packageManager) {
            return 'noPackageManager';
        }

        logger.log(`Installing ${this.packageName} using ${packageManager}`);

        try {
            await installPackage(
                `${this.packageName}@${this.cli.binaryVersion}`,
                {silent: true, additionalArgs: ['-E']}
            );
            return 'installed';
        }
        catch {
            return 'failed';
        }
    }

    protected abstract buildCommandLineArgs(): A;
}
