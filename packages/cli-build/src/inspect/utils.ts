// @ts-expect-error
import * as kolorist from 'kolorist';
import {isMatch} from 'matcher';
import {logger, pReduce} from '@reskript/core';
import {RuleConfig, OptionalRuleConfig, Severity} from '@reskript/settings';

const SEVERITY_PREFIX: Record<Severity, string> = {
    'off': '   ',
    'print': kolorist.bgWhite(kolorist.black(' I ')),
    'warn': kolorist.bgYellow(kolorist.white(' W ')),
    'error': kolorist.bgRed(kolorist.white(' E ')),
};

export const createPrint = (severity: Severity) => (message: string) => {
    logger.log(`${SEVERITY_PREFIX[severity]} ${message}`);
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

export interface InspectOptions {
    cwd: string;
    exitOnError: boolean;
}

export type Check<T> = (configValue: T, helpers: CheckHelper, options: InspectOptions) => Promise<boolean>;

export interface RuleProcessor<T> {
    config: UniversalRuleConfig<T>;
    defaultConfigValue: T;
    check: Check<T>;
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
            const result = await processor.check(configValue, helpers, options);

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


const hasMatchInArray = (value: string, array: string[]) => {
    return array.some(pattern => isMatch(value, pattern));
};

// 以`includes`为优先
export const isIncluded = (name: string, includes?: string[], excludes?: string[]): boolean => {
    if (includes) {
        return hasMatchInArray(name, includes);
    }

    if (excludes && hasMatchInArray(name, excludes)) {
        return false;
    }

    return true;
};
