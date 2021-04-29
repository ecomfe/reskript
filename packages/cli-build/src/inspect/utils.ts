import chalk from 'chalk';
import pReduce from 'p-reduce';
import {RuleConfig, OptionalRuleConfig, Severity} from '@reskript/settings';

const SEVERITY_PREFIX: Record<Severity, string> = {
    'off': '   ',
    'print': chalk.bgWhite.black(' I '),
    'warn': chalk.bgYellow.white(' W '),
    'error': chalk.bgRed.white(' E '),
};

export const createPrint = (severity: Severity) => (message: string) => {
    console.log(`${SEVERITY_PREFIX[severity]} ${message}`);
};

type UniversalRuleConfig<T> = RuleConfig<T> | OptionalRuleConfig<T>;

export const normalizeRuleConfig = <T>(config: UniversalRuleConfig<T>, defaultConfigValue: T): [Severity, T] => {
    if (typeof config === 'string') {
        return [config, defaultConfigValue];
    }

    return config;
};

export interface CheckHelper {
    notice: (message: string) => void;
    report: (message: string) => void;
}

export type Check<T> = (configValue: T, helpers: CheckHelper) => Promise<boolean>;

export interface RuleProcessor<T> {
    config: UniversalRuleConfig<T>;
    defaultConfigValue: T;
    check: Check<T>;
}

export interface InspectOptions {
    exitOnError: boolean;
}

export const run = async (processors: Array<RuleProcessor<any>>, options: InspectOptions): Promise<void> => {
    const results = await pReduce(
        processors,
        async (results, processor) => {
            const [severity, configValue] = normalizeRuleConfig(processor.config, processor.defaultConfigValue);

            if (severity === 'off') {
                return results;
            }

            const helpers = {
                report: createPrint(severity),
                notice: createPrint('print'),
            };
            const result = await processor.check(configValue, helpers);

            if (!result) {
                results.add(severity);
            }

            return results;
        },
        new Set<Severity>()
    );

    if (results.has('error') && options.exitOnError) {
        process.exit(23);
    }
};
