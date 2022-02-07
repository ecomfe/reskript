import webpack, {Compiler} from 'webpack';
import {SingleBar, Options} from 'cli-progress';
// @ts-expect-error 这里修复后，下面的`eslint-disable`也删掉
import * as kolorist from 'kolorist';

const PROGRESS_BAR_OPTIONS: Options = {
    format: (options, params, payload) => {
        const bar = options.formatBar!(params.progress, options);
        const percentage = Math.round((params.progress * 100));
        const detail = percentage >= 99 ? '' : kolorist.white(`- ${payload.message}`);
        return `${kolorist.lightGreen('● @reskript/dev')} ${bar} building (${percentage}%) ${detail}`;
    },
    formatBar: (progress: number) => {
        const total = 40;
        const active = Math.round(total * progress);
        const remaining = total - active;
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return kolorist.bgLightGreen(' '.repeat(active)) + kolorist.bgWhite(' '.repeat(remaining));
    },
};

export default class ProgressBarPlugin extends webpack.ProgressPlugin {
    private readonly progressBar = new SingleBar(PROGRESS_BAR_OPTIONS);

    private working = false;

    private lastPercentage = 0;

    apply(compiler: Compiler) {
        this.handler = (percentage: number, stage, message) => {
            this.lastPercentage = percentage;
            if (this.working) {
                this.progressBar.update(Math.max(percentage, this.lastPercentage), {stage, message});
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
