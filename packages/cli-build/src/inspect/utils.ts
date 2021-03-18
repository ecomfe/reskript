import chalk from 'chalk';
import {RuleConfig, Severity} from '@reskript/settings';

const SEVERITY_PREFIX: Record<Severity, string> = {
    'off': '   ',
    'print': chalk.bgWhite.black(' I '),
    'warn': chalk.bgYellow.white(' W '),
    'error': chalk.bgRed.white(' E '),
};

export const createPrint = (severity: Severity) => (message: string) => {
    console.log(`${SEVERITY_PREFIX[severity]} ${message}`);
};

export const normalizeRuleConfig = <T>(config: RuleConfig<T>, defaultConfigValue: T): [Severity, T] => {
    if (typeof config === 'string') {
        return [config, defaultConfigValue];
    }

    return config;
};

export interface CheckHelper {
    notice: (message: string) => void;
    report: (message: string) => void;
}

export type Check<T> = (configValue: T, helpers: CheckHelper) => boolean;

export interface RuleProcessor<T> {
    config: RuleConfig<T>;
    defaultConfigValue: T;
    check: Check<T>;
}

export const run = (processors: Array<RuleProcessor<any>>): void => {
    const results = processors.reduce(
        (results, processor) => {
            const [severity, configValue] = normalizeRuleConfig(processor.config, processor.defaultConfigValue);

            if (severity === 'off') {
                return results;
            }

            const helpers = {
                report: createPrint(severity),
                notice: createPrint('print'),
            };
            const result = processor.check(configValue, helpers);

            if (!result) {
                results.add(severity);
            }

            return results;
        },
        new Set<Severity>()
    );

    if (results.has('error')) {
        process.exit(23);
    }
};
