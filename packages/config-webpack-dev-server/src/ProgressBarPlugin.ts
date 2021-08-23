import {ProgressPlugin, Compiler} from 'webpack';
import {SingleBar} from 'cli-progress';
import chalk from 'chalk';

const PROGRESS_BAR_OPTIONS = {
    format: `${chalk.greenBright('● @reskript/dev')} {bar} building ({percentage}%)`,
    formatBar: (progress: number) => {
        const total = 40;
        const active = Math.round(total * progress);
        const remaining = total - active;
        return chalk.bgGreenBright(' '.repeat(active)) + chalk.bgWhite(' '.repeat(remaining));
    },
};

export default class ProgressBarPlugin extends ProgressPlugin {
    private readonly progressBar = new SingleBar(PROGRESS_BAR_OPTIONS);

    private working = false;

    apply(compiler: Compiler) {
        this.handler = (percent: number) => {
            if (this.working) {
                this.progressBar.update(percent);
            }
        };
        compiler.hooks.beforeCompile.tap(
            'progress-bar-plugin',
            () => {
                this.working = true;
                this.progressBar.start(1, 0);
            }
        );
        compiler.hooks.afterEmit.tap(
            'progress-bar-plugin',
            () => {
                this.progressBar.update(1);
                this.progressBar.stop();
                this.working = false;
            }
        );
        process.on('SIGINT', () => (this.working = false));
        super.apply(compiler);
    }
}
