import {Command} from 'clipanion';
import {CommandDefinition, logger} from '@reskript/core';

export default abstract class DynamicImportCommand<A> extends Command {
    protected readonly packageName: string = '';

    async execute() {
        if (!this.packageName) {
            logger.error('No command package defined');
            process.exit(11);
        }

        const {run} = await import(this.packageName) as CommandDefinition<A>;
        const args = this.buildCommandLineArgs();
        const rest = this.resolveRestArgs();
        await run(args, rest);
    }

    protected resolveRestArgs(): string | string[] | undefined {
        return undefined;
    }

    protected abstract buildCommandLineArgs(): A;
}
